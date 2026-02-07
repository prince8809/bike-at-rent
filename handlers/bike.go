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

// BikeHandler handles bike related endpoints
type BikeHandler struct {
	repo *repository.BikeRepository
}

// NewBikeHandler creates a new BikeHandler
func NewBikeHandler(repo *repository.BikeRepository) *BikeHandler {
	return &BikeHandler{repo: repo}
}

// List returns paginated list of bikes
func (h *BikeHandler) List(c *gin.Context) {
	ctx := context.Background()

	// Query params
	category := c.Query("category")
	var categoryPtr *string
	if category != "" {
		categoryPtr = &category
	}

	statusStr := c.Query("status")
	var statusPtr *models.BikeStatus
	if statusStr != "" {
		s := models.BikeStatus(statusStr)
		statusPtr = &s
	}

	locationIDStr := c.Query("location_id")
	var locationIDPtr *uuid.UUID
	if locationIDStr != "" {
		locationID, err := uuid.Parse(locationIDStr)
		if err != nil {
			utils.ErrorResponse(c, http.StatusBadRequest, "invalid location_id", err)
			return
		}
		locationIDPtr = &locationID
	}

	pageStr := c.DefaultQuery("page", "1")
	limitStr := c.DefaultQuery("limit", "20")

	page, err := strconv.Atoi(pageStr)
	if err != nil || page < 1 {
		page = 1
	}
	limit, err := strconv.Atoi(limitStr)
	if err != nil || limit < 1 {
		limit = 20
	}

	offset := (page - 1) * limit

	bikes, total, err := h.repo.ListBikes(ctx, categoryPtr, statusPtr, locationIDPtr, offset, limit)
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "failed to list bikes", err)
		return
	}

	totalPages := 0
	if total > 0 {
		totalPages = (total + limit - 1) / limit
	}

	pagination := models.Pagination{
		Page:       page,
		Limit:      limit,
		Total:      total,
		TotalPages: totalPages,
		HasNext:    page < totalPages,
		HasPrev:    page > 1,
	}

	data := map[string]interface{}{
		"bikes":      bikes,
		"pagination": pagination,
	}

	utils.SuccessResponse(c, http.StatusOK, "bikes retrieved", data)
}

// GetAvailability returns bike availability (total or at location)
func (h *BikeHandler) GetAvailability(c *gin.Context) {
	ctx := context.Background()

	bikeIDStr := c.Query("bike_id")
	if bikeIDStr == "" {
		utils.ErrorResponse(c, http.StatusBadRequest, "bike_id is required", nil)
		return
	}

	bikeID, err := uuid.Parse(bikeIDStr)
	if err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "invalid bike_id", err)
		return
	}

	locationIDStr := c.Query("location_id")
	if locationIDStr != "" {
		locationID, err := uuid.Parse(locationIDStr)
		if err != nil {
			utils.ErrorResponse(c, http.StatusBadRequest, "invalid location_id", err)
			return
		}
		avail, err := h.repo.GetAvailabilityAtLocation(ctx, bikeID, locationID)
		if err != nil {
			utils.ErrorResponse(c, http.StatusInternalServerError, "failed to get availability", err)
			return
		}
		utils.SuccessResponse(c, http.StatusOK, "availability retrieved", map[string]interface{}{"available": avail})
		return
	}

	avail, err := h.repo.GetAvailability(ctx, bikeID)
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "failed to get availability", err)
		return
	}

	utils.SuccessResponse(c, http.StatusOK, "availability retrieved", map[string]interface{}{"available": avail})
}

// CreateBikeRequest represents the request body for creating a bike
type CreateBikeRequest struct {
	Name            string   `json:"name" binding:"required"`
	Category        string   `json:"category" binding:"required"`
	DailyPrice      float64  `json:"daily_price" binding:"required,gt=0"`
	HourlyPrice     *float64 `json:"hourly_price,omitempty"`
	SecurityDeposit float64  `json:"security_deposit" binding:"required,gt=0"`
	ImageURL        *string  `json:"image_url,omitempty"`
	Description     *string  `json:"description,omitempty"`
	Features        []string `json:"features,omitempty"`
	Status          string   `json:"status,omitempty"` // defaults to 'active'
}

// Create handles POST request to create a new bike
func (h *BikeHandler) Create(c *gin.Context) {
	ctx := context.Background()

	var req CreateBikeRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.ValidationErrorResponse(c, err.Error())
		return
	}

	// Set default status
	status := models.BikeActive
	if req.Status != "" {
		status = models.BikeStatus(req.Status)
	}

	bike := &models.Bike{
		Name:            req.Name,
		Category:        req.Category,
		DailyPrice:      req.DailyPrice,
		HourlyPrice:     req.HourlyPrice,
		SecurityDeposit: req.SecurityDeposit,
		ImageURL:        req.ImageURL,
		Description:     req.Description,
		Features:        req.Features,
		Status:          status,
	}

	createdBike, err := h.repo.CreateBike(ctx, bike)
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "failed to create bike", err)
		return
	}

	utils.SuccessResponse(c, http.StatusCreated, "bike created successfully", createdBike)
}
