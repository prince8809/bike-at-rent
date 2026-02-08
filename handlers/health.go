package handlers

import (
	"context"
	"net/http"
	"time"

	"bike-at-rent/database"

	"github.com/gin-gonic/gin"
)

type HealthHandler struct{}

func NewHealthHandler() *HealthHandler {
	return &HealthHandler{}
}

func (h *HealthHandler) Welcome(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "BikeAtRent API is running 🚴",
	})
}

func (h *HealthHandler) HealthCheck(c *gin.Context) {
	ctx, cancel := context.WithTimeout(c.Request.Context(), 2*time.Second)
	defer cancel()

	err := database.DB.Ping(ctx)

	status := "ok"
	if err != nil {
		status = "degraded"
	}

	c.JSON(http.StatusOK, gin.H{
		"status":  status,
		"service": "BikeAtRent API",
		"time":    time.Now(),
	})
}

func (h *HealthHandler) DBStats(c *gin.Context) {
	stats := database.DB.Stat()

	c.JSON(http.StatusOK, gin.H{
		"acquired_conns": stats.AcquiredConns(),
		"idle_conns":     stats.IdleConns(),
		"total_conns":    stats.TotalConns(),
	})
}
