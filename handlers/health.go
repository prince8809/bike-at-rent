package handlers

import (
	"context"
	"net/http"
	"time"

	"bike-at-rent/database"
	"bike-at-rent/utils"

	"github.com/gin-gonic/gin"
)

type HealthHandler struct{}

func NewHealthHandler() *HealthHandler {
	return &HealthHandler{}
}

// HealthCheck returns the health status of the application
func (h *HealthHandler) HealthCheck(c *gin.Context) {
	ctx, cancel := context.WithTimeout(c.Request.Context(), 3*time.Second)
	defer cancel()

	// Check database connection
	dbStatus := "healthy"
	dbError := ""
	if err := database.HealthCheck(ctx); err != nil {
		dbStatus = "unhealthy"
		dbError = err.Error()
	}

	status := http.StatusOK
	if dbStatus == "unhealthy" {
		status = http.StatusServiceUnavailable
	}

	response := gin.H{
		"status":    "ok",
		"timestamp": time.Now().Format(time.RFC3339),
		"service":   "BikeAtRent API",
		"version":   "1.0.0",
		"database": gin.H{
			"status": dbStatus,
			"error":  dbError,
		},
	}

	c.JSON(status, response)
}

// DBStats returns database connection pool statistics
func (h *HealthHandler) DBStats(c *gin.Context) {
	stats := database.GetStats()
	utils.SuccessResponse(c, http.StatusOK, "Database statistics retrieved", stats)
}

// Welcome returns a welcome message
func (h *HealthHandler) Welcome(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "Welcome to BikeAtRent API",
		"version": "1.0.0",
		"docs":    "/api/health for health check",
	})
}
