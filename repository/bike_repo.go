package repository

import (
	"context"
	"fmt"
	"time"

	"bike-at-rent/models"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
)

// BikeRepository handles bike and inventory DB operations
type BikeRepository struct {
	db *pgxpool.Pool
}

// NewBikeRepository creates a new BikeRepository
func NewBikeRepository(db *pgxpool.Pool) *BikeRepository {
	return &BikeRepository{db: db}
}

// ListBikes returns paginated bikes with optional filters
func (r *BikeRepository) ListBikes(ctx context.Context, category *string, status *models.BikeStatus, locationID *uuid.UUID, offset, limit int) ([]models.Bike, int, error) {
	bikes := []models.Bike{}

	// Build base query - if location filter, join with bike_inventory
	var query string
	if locationID != nil {
		query = `SELECT DISTINCT b.id, b.name, b.category, b.daily_price, b.hourly_price, b.security_deposit, b.image_url, b.description, b.features, b.status, b.created_at, b.updated_at 
		FROM bikes b 
		JOIN bike_inventory bi ON b.id = bi.bike_id 
		WHERE bi.location_id = $1`
	} else {
		query = `SELECT b.id, b.name, b.category, b.daily_price, b.hourly_price, b.security_deposit, b.image_url, b.description, b.features, b.status, b.created_at, b.updated_at FROM bikes b`
	}

	args := []interface{}{}
	where := ""

	// Add location filter if provided
	if locationID != nil {
		args = append(args, *locationID)
		where = " AND " // Start with AND since location is in WHERE
	}

	if category != nil {
		args = append(args, *category)
		if where == "" {
			where += fmt.Sprintf(" WHERE category = $%d", len(args))
		} else {
			where += fmt.Sprintf("category = $%d", len(args))
		}
	}

	if status != nil {
		args = append(args, *status)
		if where == "" {
			where += fmt.Sprintf(" WHERE status = $%d", len(args))
		} else {
			where += fmt.Sprintf(" AND status = $%d", len(args))
		}
	}

	// Count total
	countQuery := "SELECT COUNT(DISTINCT b.id) FROM bikes b"
	if locationID != nil {
		countQuery += " JOIN bike_inventory bi ON b.id = bi.bike_id WHERE bi.location_id = $1"
	}
	countQuery += where

	countArgs := args
	var total int
	if err := r.db.QueryRow(ctx, countQuery, countArgs...).Scan(&total); err != nil {
		return nil, 0, fmt.Errorf("failed to count bikes: %w", err)
	}

	// Add ordering, limit, offset
	args = append(args, limit, offset)
	finalQuery := query + where + fmt.Sprintf(" ORDER BY b.created_at DESC LIMIT $%d OFFSET $%d", len(args)-1, len(args))

	rows, err := r.db.Query(ctx, finalQuery, args...)
	if err != nil {
		return nil, 0, fmt.Errorf("failed to query bikes: %w", err)
	}
	defer rows.Close()

	for rows.Next() {
		var b models.Bike
		if err := rows.Scan(&b.ID, &b.Name, &b.Category, &b.DailyPrice, &b.HourlyPrice, &b.SecurityDeposit, &b.ImageURL, &b.Description, &b.Features, &b.Status, &b.CreatedAt, &b.UpdatedAt); err != nil {
			return nil, 0, fmt.Errorf("failed to scan bike: %w", err)
		}
		bikes = append(bikes, b)
	}

	return bikes, total, nil
}

// GetAvailability returns aggregated availability for a bike across locations
func (r *BikeRepository) GetAvailability(ctx context.Context, bikeID uuid.UUID) (int, error) {
	query := `SELECT COALESCE(SUM(available_quantity),0) FROM bike_inventory WHERE bike_id = $1`
	var available int
	if err := r.db.QueryRow(ctx, query, bikeID).Scan(&available); err != nil {
		return 0, fmt.Errorf("failed to get availability: %w", err)
	}
	return available, nil
}

// GetAvailabilityAtLocation returns availability for a bike at a specific location
func (r *BikeRepository) GetAvailabilityAtLocation(ctx context.Context, bikeID, locationID uuid.UUID) (int, error) {
	query := `SELECT COALESCE(available_quantity,0) FROM bike_inventory WHERE bike_id = $1 AND location_id = $2 LIMIT 1`
	var available int
	if err := r.db.QueryRow(ctx, query, bikeID, locationID).Scan(&available); err != nil {
		// if no rows, return 0
		return 0, nil
	}
	return available, nil
}

// CreateBike inserts a new bike into the database
func (r *BikeRepository) CreateBike(ctx context.Context, bike *models.Bike) (*models.Bike, error) {
	bike.ID = uuid.New()

	query := `
		INSERT INTO bikes (id, name, category, daily_price, hourly_price, security_deposit, image_url, description, features, status, created_at, updated_at)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW())
		RETURNING id, name, category, daily_price, hourly_price, security_deposit, image_url, description, features, status, created_at, updated_at
	`

	err := r.db.QueryRow(ctx, query,
		bike.ID,
		bike.Name,
		bike.Category,
		bike.DailyPrice,
		bike.HourlyPrice,
		bike.SecurityDeposit,
		bike.ImageURL,
		bike.Description,
		bike.Features,
		bike.Status,
	).Scan(
		&bike.ID,
		&bike.Name,
		&bike.Category,
		&bike.DailyPrice,
		&bike.HourlyPrice,
		&bike.SecurityDeposit,
		&bike.ImageURL,
		&bike.Description,
		&bike.Features,
		&bike.Status,
		&bike.CreatedAt,
		&bike.UpdatedAt,
	)

	if err != nil {
		return nil, fmt.Errorf("failed to create bike: %w", err)
	}

	return bike, nil
}

// GetBookingsByDateRange returns bookings that conflict with a date range
// This helps find which bikes are already booked during the requested period
func (r *BikeRepository) GetBookingsByDateRange(ctx context.Context, pickupDate, dropDate time.Time, locationID string) ([]models.Booking, error) {
	bookings := []models.Booking{}

	// Find all confirmed/pending bookings that overlap with the requested date range
	query := `
		SELECT id, booking_number, user_id, bike_id, pickup_location_id, drop_location_id,
			pickup_datetime, drop_datetime, bike_rental_price, security_deposit, total_amount,
			advance_paid, due_at_pickup, status, payment_status, created_at, updated_at
		FROM bookings
		WHERE status IN ('pending', 'confirmed')
		AND pickup_datetime < $2
		AND drop_datetime > $1
	`

	// Add location filter if provided
	args := []interface{}{pickupDate, dropDate}
	if locationID != "" {
		query += " AND pickup_location_id = $3"
		args = append(args, locationID)
	}

	query += " ORDER BY pickup_datetime ASC"

	rows, err := r.db.Query(ctx, query, args...)
	if err != nil {
		return nil, fmt.Errorf("failed to query bookings by date range: %w", err)
	}
	defer rows.Close()

	for rows.Next() {
		var b models.Booking
		if err := rows.Scan(&b.ID, &b.BookingNumber, &b.UserID, &b.BikeID, &b.PickupLocationID, &b.DropLocationID,
			&b.PickupDatetime, &b.DropDatetime, &b.BikeRentalPrice, &b.SecurityDeposit, &b.TotalAmount,
			&b.AdvancePaid, &b.DueAtPickup, &b.Status, &b.PaymentStatus, &b.CreatedAt, &b.UpdatedAt); err != nil {
			return nil, fmt.Errorf("failed to scan booking: %w", err)
		}
		bookings = append(bookings, b)
	}

	return bookings, nil
}
