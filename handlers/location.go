package handlers

import (
	"context"
	"net/http"
	"strconv"

	"bike-at-rent/models"
	"bike-at-rent/repository"
	"bike-at-rent/utils"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// LocationHandler handles location-related endpoints
type LocationHandler struct {
	repo *repository.LocationRepository
}

// NewLocationHandler creates a new LocationHandler
func NewLocationHandler(repo *repository.LocationRepository) *LocationHandler {
	return &LocationHandler{repo: repo}
}

// CreateLocationRequest represents the request body for creating a location
type CreateLocationRequest struct {
	Name         string  `json:"name" binding:"required"`
	Address      string  `json:"address" binding:"required"`
	City         string  `json:"city" binding:"required"`
	LocationCode *string `json:"location_code,omitempty"`
	IsActive     bool    `json:"is_active"`
}

// Create handles POST request to create a new location
func (h *LocationHandler) Create(c *gin.Context) {
	ctx := context.Background()
	var req CreateLocationRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.ValidationErrorResponse(c, err.Error())
		return
	}

	location := &models.PickupLocation{
		Name:         req.Name,
		Address:      req.Address,
		City:         req.City,
		LocationCode: req.LocationCode,
		IsActive:     req.IsActive,
	}

	created, err := h.repo.CreateLocation(ctx, location)
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "failed to create location", err)
		return
	}
	utils.SuccessResponse(c, http.StatusCreated, "location created successfully", created)
}

// List returns paginated list of locations
func (h *LocationHandler) List(c *gin.Context) {
	ctx := context.Background()
	pageStr := c.DefaultQuery("page", "1")
	limitStr := c.DefaultQuery("limit", "20")
	city := c.Query("city")

	page, _ := strconv.Atoi(pageStr)
	limit, _ := strconv.Atoi(limitStr)
	if page < 1 {
		page = 1
	}
	if limit < 1 {
		limit = 20
	}

	offset := (page - 1) * limit
	var cityPtr *string
	if city != "" {
		cityPtr = &city
	}

	locations, total, err := h.repo.ListLocations(ctx, cityPtr, offset, limit)
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "failed to list locations", err)
		return
	}

	totalPages := 0
	if total > 0 {
		totalPages = (total + limit - 1) / limit
	}

	pagination := map[string]interface{}{
		"page":        page,
		"limit":       limit,
		"total":       total,
		"total_pages": totalPages,
		"has_next":    page < totalPages,
		"has_prev":    page > 1,
	}

	data := map[string]interface{}{
		"locations":  locations,
		"pagination": pagination,
	}

	utils.SuccessResponse(c, http.StatusOK, "locations retrieved successfully", data)
}

// GetByID returns a location by ID
func (h *LocationHandler) GetByID(c *gin.Context) {
	ctx := context.Background()

	locationIDStr := c.Param("id")
	locationID, err := uuid.Parse(locationIDStr)
	if err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "invalid location id", err)
		return
	}

	location, err := h.repo.GetLocationByID(ctx, locationID)
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "failed to get location", err)
		return
	}
	if location == nil {
		utils.NotFoundResponse(c, "location not found")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, "location retrieved successfully", location)
}
