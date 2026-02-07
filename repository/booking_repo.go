package repository

import (
	"context"
	"errors"
	"fmt"

	"bike-at-rent/models"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

// BookingRepository handles booking database operations
type BookingRepository struct {
	db *pgxpool.Pool
}

// NewBookingRepository creates a new BookingRepository
func NewBookingRepository(db *pgxpool.Pool) *BookingRepository {
	return &BookingRepository{db: db}
}

// CreateBooking inserts a new booking into the database
func (r *BookingRepository) CreateBooking(ctx context.Context, booking *models.Booking) (*models.Booking, error) {
	booking.ID = uuid.New()

	query := `
		INSERT INTO bookings (id, user_id, bike_id, pickup_location_id, drop_location_id, 
			pickup_datetime, drop_datetime, bike_rental_price, security_deposit, total_amount, 
			advance_paid, due_at_pickup, status, payment_status, created_at, updated_at)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, NOW(), NOW())
		RETURNING id, booking_number, user_id, bike_id, pickup_location_id, drop_location_id, 
			pickup_datetime, drop_datetime, bike_rental_price, security_deposit, total_amount, 
			advance_paid, due_at_pickup, status, payment_status, created_at, updated_at
	`

	err := r.db.QueryRow(ctx, query, booking.ID, booking.UserID, booking.BikeID, booking.PickupLocationID,
		booking.DropLocationID, booking.PickupDatetime, booking.DropDatetime, booking.BikeRentalPrice,
		booking.SecurityDeposit, booking.TotalAmount, booking.AdvancePaid, booking.DueAtPickup,
		booking.Status, booking.PaymentStatus).
		Scan(&booking.ID, &booking.BookingNumber, &booking.UserID, &booking.BikeID, &booking.PickupLocationID,
			&booking.DropLocationID, &booking.PickupDatetime, &booking.DropDatetime, &booking.BikeRentalPrice,
			&booking.SecurityDeposit, &booking.TotalAmount, &booking.AdvancePaid, &booking.DueAtPickup,
			&booking.Status, &booking.PaymentStatus, &booking.CreatedAt, &booking.UpdatedAt)

	if err != nil {
		return nil, fmt.Errorf("failed to create booking: %w", err)
	}

	return booking, nil
}

// ListBookings returns paginated list of bookings with optional user filter
func (r *BookingRepository) ListBookings(ctx context.Context, userID *uuid.UUID, offset, limit int) ([]models.Booking, int, error) {
	bookings := []models.Booking{}
	where := ""
	args := []interface{}{}

	if userID != nil {
		args = append(args, *userID)
		where = fmt.Sprintf(" WHERE user_id = $%d", len(args))
	}

	// Count total
	countQuery := "SELECT COUNT(1) FROM bookings" + where
	var total int
	if err := r.db.QueryRow(ctx, countQuery, args...).Scan(&total); err != nil {
		return nil, 0, fmt.Errorf("failed to count bookings: %w", err)
	}

	// Add ordering, limit, offset
	args = append(args, limit, offset)
	query := `SELECT id, booking_number, user_id, bike_id, pickup_location_id, drop_location_id,
		pickup_datetime, drop_datetime, bike_rental_price, security_deposit, total_amount,
		advance_paid, due_at_pickup, status, payment_status, created_at, updated_at
		FROM bookings` + where + fmt.Sprintf(` ORDER BY created_at DESC LIMIT $%d OFFSET $%d`, len(args)-1, len(args))

	rows, err := r.db.Query(ctx, query, args...)
	if err != nil {
		return nil, 0, fmt.Errorf("failed to query bookings: %w", err)
	}
	defer rows.Close()

	for rows.Next() {
		var b models.Booking
		if err := rows.Scan(&b.ID, &b.BookingNumber, &b.UserID, &b.BikeID, &b.PickupLocationID, &b.DropLocationID,
			&b.PickupDatetime, &b.DropDatetime, &b.BikeRentalPrice, &b.SecurityDeposit, &b.TotalAmount,
			&b.AdvancePaid, &b.DueAtPickup, &b.Status, &b.PaymentStatus, &b.CreatedAt, &b.UpdatedAt); err != nil {
			return nil, 0, fmt.Errorf("failed to scan booking: %w", err)
		}
		bookings = append(bookings, b)
	}

	return bookings, total, nil
}

// GetBookingByID retrieves a booking by ID
func (r *BookingRepository) GetBookingByID(ctx context.Context, bookingID uuid.UUID) (*models.Booking, error) {
	booking := &models.Booking{}

	query := `SELECT id, booking_number, user_id, bike_id, pickup_location_id, drop_location_id,
		pickup_datetime, drop_datetime, bike_rental_price, security_deposit, total_amount,
		advance_paid, due_at_pickup, status, payment_status, created_at, updated_at
		FROM bookings WHERE id = $1`

	err := r.db.QueryRow(ctx, query, bookingID).
		Scan(&booking.ID, &booking.BookingNumber, &booking.UserID, &booking.BikeID, &booking.PickupLocationID, &booking.DropLocationID,
			&booking.PickupDatetime, &booking.DropDatetime, &booking.BikeRentalPrice, &booking.SecurityDeposit, &booking.TotalAmount,
			&booking.AdvancePaid, &booking.DueAtPickup, &booking.Status, &booking.PaymentStatus, &booking.CreatedAt, &booking.UpdatedAt)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, nil
		}
		return nil, fmt.Errorf("failed to get booking: %w", err)
	}

	return booking, nil
}
