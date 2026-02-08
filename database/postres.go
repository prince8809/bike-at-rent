package database

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"os"
	"time"

	"bike-at-rent/config"
	"bike-at-rent/models"

	"github.com/jackc/pgx/v5/pgxpool"
)

var DB *pgxpool.Pool

func Connect() error {
	cfg, err := pgxpool.ParseConfig(config.AppConfig.DatabaseURL)
	if err != nil {
		return err
	}

	cfg.MaxConns = int32(config.AppConfig.DatabasePoolSize)
	cfg.MinConns = int32(config.AppConfig.DatabaseMaxIdleConns)
	cfg.MaxConnLifetime = config.AppConfig.DatabaseConnMaxLife

	DB, err = pgxpool.NewWithConfig(context.Background(), cfg)
	if err != nil {
		return err
	}

	// Ping DB
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	err = DB.Ping(ctx)
	if err != nil {
		return err
	}

	// Seed bikes into database
	if err := SeedBikes(ctx); err != nil {
		log.Println("Warning: Failed to seed bikes:", err)
	}

	return nil
}

// SeedBikes inserts bikes from JSON file into the database
func SeedBikes(ctx context.Context) error {
	file, err := os.Open("cmd/seed/bikes.json")
	if err != nil {
		return fmt.Errorf("failed to open bikes.json: %w", err)
	}
	defer func() {
		_ = file.Close()
	}()

	bytes, err := io.ReadAll(file)
	if err != nil {
		return fmt.Errorf("failed to read bikes.json: %w", err)
	}

	var bikes []models.Bike
	if err := json.Unmarshal(bytes, &bikes); err != nil {
		return fmt.Errorf("failed to unmarshal bikes.json: %w", err)
	}

	// Insert bikes into database
	query := `
		INSERT INTO bikes (id, name, category, daily_price, hourly_price, security_deposit, status, created_at, updated_at)
		VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
		ON CONFLICT (id) DO NOTHING
	`

	for _, bike := range bikes {
		_, err := DB.Exec(ctx, query,
			bike.ID,
			bike.Name,
			bike.Category,
			bike.DailyPrice,
			bike.HourlyPrice,
			bike.SecurityDeposit,
			bike.Status,
		)
		if err != nil {
			log.Printf("Failed to insert bike %s: %v", bike.Name, err)
			continue
		}
		log.Printf("✓ Seeded bike: %s", bike.Name)
	}

	return nil
}

func Close() {
	if DB != nil {
		DB.Close()
	}
}
