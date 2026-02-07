package repository

import (
	"context"
	"fmt"

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
func (r *BikeRepository) ListBikes(ctx context.Context, category *string, status *models.BikeStatus, offset, limit int) ([]models.Bike, int, error) {
	bikes := []models.Bike{}

	// Build base query
	query := `SELECT id, name, category, daily_price, hourly_price, security_deposit, image_url, description, features, status, created_at, updated_at FROM bikes`
	args := []interface{}{}
	where := ""

	if category != nil {
		args = append(args, *category)
		where += fmt.Sprintf(" WHERE category = $%d", len(args))
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
	countQuery := "SELECT COUNT(1) FROM bikes" + where
	var total int
	if err := r.db.QueryRow(ctx, countQuery, args...).Scan(&total); err != nil {
		return nil, 0, fmt.Errorf("failed to count bikes: %w", err)
	}

	// Add ordering, limit, offset
	args = append(args, limit, offset)
	finalQuery := query + where + fmt.Sprintf(" ORDER BY created_at DESC LIMIT $%d OFFSET $%d", len(args)-1, len(args))

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
