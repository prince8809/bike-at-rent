package database

import (
	"context"
	"fmt"
	"log"
	"time"

	"bikeatrent-backend/config"

	"github.com/jackc/pgx/v5/pgxpool"
)

var DB *pgxpool.Pool

// Connect establishes a connection pool to PostgreSQL
func Connect() error {
	cfg := config.AppConfig

	// Parse connection string and configure pool
	poolConfig, err := pgxpool.ParseConfig(cfg.DatabaseURL)
	if err != nil {
		return fmt.Errorf("unable to parse DATABASE_URL: %w", err)
	}

	// Configure connection pool
	poolConfig.MaxConns = int32(cfg.DatabasePoolSize)
	poolConfig.MinConns = int32(cfg.DatabaseMaxIdleConns)
	poolConfig.MaxConnLifetime = cfg.DatabaseConnMaxLife
	poolConfig.MaxConnIdleTime = 30 * time.Minute
	poolConfig.HealthCheckPeriod = 1 * time.Minute

	// Connect with retry logic
	var pool *pgxpool.Pool
	maxRetries := 3
	for i := 0; i < maxRetries; i++ {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		pool, err = pgxpool.NewWithConfig(ctx, poolConfig)
		cancel()

		if err == nil {
			// Test the connection
			ctx, cancel = context.WithTimeout(context.Background(), 5*time.Second)
			err = pool.Ping(ctx)
			cancel()

			if err == nil {
				break
			}
		}

		if i < maxRetries-1 {
			waitTime := time.Duration(i+1) * 2 * time.Second
			log.Printf("Failed to connect to database (attempt %d/%d): %v. Retrying in %v...", i+1, maxRetries, err, waitTime)
			time.Sleep(waitTime)
		}
	}

	if err != nil {
		return fmt.Errorf("unable to connect to database after %d attempts: %w", maxRetries, err)
	}

	DB = pool
	log.Println("✓ Connected to PostgreSQL database")
	log.Printf("✓ Connection pool configured: max_conns=%d, min_conns=%d", cfg.DatabasePoolSize, cfg.DatabaseMaxIdleConns)

	return nil
}

// Close gracefully closes the database connection pool
func Close() {
	if DB != nil {
		DB.Close()
		log.Println("✓ Database connection pool closed")
	}
}

// HealthCheck verifies database connectivity
func HealthCheck(ctx context.Context) error {
	if DB == nil {
		return fmt.Errorf("database connection not initialized")
	}

	if err := DB.Ping(ctx); err != nil {
		return fmt.Errorf("database ping failed: %w", err)
	}

	return nil
}

// GetStats returns connection pool statistics
func GetStats() map[string]interface{} {
	if DB == nil {
		return map[string]interface{}{
			"status": "not connected",
		}
	}

	stat := DB.Stat()
	return map[string]interface{}{
		"total_conns":      stat.TotalConns(),
		"acquired_conns":   stat.AcquiredConns(),
		"idle_conns":       stat.IdleConns(),
		"max_conns":        stat.MaxConns(),
		"acquire_count":    stat.AcquireCount(),
		"acquire_duration": stat.AcquireDuration().String(),
	}
}
