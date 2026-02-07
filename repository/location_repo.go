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

// LocationRepository handles location database operations
type LocationRepository struct {
	db *pgxpool.Pool
}

// NewLocationRepository creates a new LocationRepository
func NewLocationRepository(db *pgxpool.Pool) *LocationRepository {
	return &LocationRepository{db: db}
}

// CreateLocation inserts a new location into the database
func (r *LocationRepository) CreateLocation(ctx context.Context, location *models.PickupLocation) (*models.PickupLocation, error) {
	location.ID = uuid.New()

	query := `
		INSERT INTO pickup_locations (id, name, address, city, location_code, is_active, created_at, updated_at)
		VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
		RETURNING id, name, address, city, location_code, is_active, created_at, updated_at
	`

	err := r.db.QueryRow(ctx, query, location.ID, location.Name, location.Address, location.City, location.LocationCode, location.IsActive).
		Scan(&location.ID, &location.Name, &location.Address, &location.City, &location.LocationCode, &location.IsActive, &location.CreatedAt, &location.UpdatedAt)

	if err != nil {
		return nil, fmt.Errorf("failed to create location: %w", err)
	}
	return location, nil
}

// ListLocations returns paginated list of locations with optional city filter
func (r *LocationRepository) ListLocations(ctx context.Context, city *string, offset, limit int) ([]models.PickupLocation, int, error) {
	locations := []models.PickupLocation{}
	where := ""
	args := []interface{}{}

	if city != nil {
		args = append(args, *city)
		where = fmt.Sprintf(" WHERE city = $%d", len(args))
	}

	// Count total
	countQuery := "SELECT COUNT(1) FROM pickup_locations" + where
	var total int
	if err := r.db.QueryRow(ctx, countQuery, args...).Scan(&total); err != nil {
		return nil, 0, fmt.Errorf("failed to count locations: %w", err)
	}

	// Add ordering, limit, offset
	args = append(args, limit, offset)
	query := `SELECT id, name, address, city, location_code, is_active, created_at, updated_at 
		FROM pickup_locations` + where + fmt.Sprintf(` ORDER BY created_at DESC LIMIT $%d OFFSET $%d`, len(args)-1, len(args))

	rows, err := r.db.Query(ctx, query, args...)
	if err != nil {
		return nil, 0, fmt.Errorf("failed to query locations: %w", err)
	}
	defer rows.Close()

	for rows.Next() {
		var loc models.PickupLocation
		if err := rows.Scan(&loc.ID, &loc.Name, &loc.Address, &loc.City, &loc.LocationCode, &loc.IsActive, &loc.CreatedAt, &loc.UpdatedAt); err != nil {
			return nil, 0, fmt.Errorf("failed to scan location: %w", err)
		}
		locations = append(locations, loc)
	}

	return locations, total, nil
}

// GetLocationByID retrieves a location by ID
func (r *LocationRepository) GetLocationByID(ctx context.Context, locationID uuid.UUID) (*models.PickupLocation, error) {
	location := &models.PickupLocation{}

	query := `SELECT id, name, address, city, location_code, is_active, created_at, updated_at 
		FROM pickup_locations WHERE id = $1`

	err := r.db.QueryRow(ctx, query, locationID).
		Scan(&location.ID, &location.Name, &location.Address, &location.City, &location.LocationCode, &location.IsActive, &location.CreatedAt, &location.UpdatedAt)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, nil
		}
		return nil, fmt.Errorf("failed to get location: %w", err)
	}

	return location, nil
}
