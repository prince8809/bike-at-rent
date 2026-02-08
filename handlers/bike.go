package handlers

import (
	"context"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"os"
	"strconv"
	"time"

	"bike-at-rent/models"
	"bike-at-rent/repository"
	"bike-at-rent/utils"

	"github.com/gin-gonic/gin"
)

// BikeHandler handles bike related endpoints
type BikeHandler struct {
	repo *repository.BikeRepository
}

// NewBikeHandler creates a new BikeHandler
func NewBikeHandler(repo *repository.BikeRepository) *BikeHandler {
	return &BikeHandler{repo: repo}
}

// LoadBikesFromJSON loads bikes from data/bikes.json file
func LoadBikesFromJSON(filePath string) ([]models.Bike, error) {
	file, err := os.Open(filePath)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	bytes, err := ioutil.ReadAll(file)
	if err != nil {
		return nil, err
	}

	var data struct {
		Bikes []models.Bike `json:"bikes"`
	}

	if err := json.Unmarshal(bytes, &data); err != nil {
		return nil, err
	}

	return data.Bikes, nil
}

// List returns paginated list of bikes
func (h *BikeHandler) List(c *gin.Context) {
	// Query params
	category := c.Query("category")
	statusStr := c.Query("status")
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

	// Load bikes from JSON
	bikes, err := LoadBikesFromJSON("data/bikes.json")
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "failed to load bikes from JSON", err)
		return
	}

	// Apply filters
	filtered := bikes
	if category != "" {
		filtered = []models.Bike{}
		for _, b := range bikes {
			if b.Category == category {
				filtered = append(filtered, b)
			}
		}
	}

	if statusStr != "" {
		filtered2 := []models.Bike{}
		for _, b := range filtered {
			if string(b.Status) == statusStr {
				filtered2 = append(filtered2, b)
			}
		}
		filtered = filtered2
	}

	total := len(filtered)
	totalPages := 0
	if total > 0 {
		totalPages = (total + limit - 1) / limit
	}

	// Paginate
	var paged []models.Bike
	if offset < total {
		end := offset + limit
		if end > total {
			end = total
		}
		paged = filtered[offset:end]
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
		"bikes":      paged,
		"pagination": pagination,
	}

	utils.SuccessResponse(c, http.StatusOK, "bikes retrieved", data)
}

// SearchAvailableByDateRange returns bikes available for rent between pickup and drop dates
func (h *BikeHandler) SearchAvailableByDateRange(c *gin.Context) {
	pickupDateStr := c.Query("pickup_date")
	dropDateStr := c.Query("drop_date")
	locationID := c.Query("location_id")

	if pickupDateStr == "" || dropDateStr == "" {
		utils.ErrorResponse(c, http.StatusBadRequest, "pickup_date and drop_date are required (format: 2026-02-07T10:00:00Z)", nil)
		return
	}

	// Parse dates
	pickupDate, err := time.Parse(time.RFC3339, pickupDateStr)
	if err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "invalid pickup_date format", err)
		return
	}

	dropDate, err := time.Parse(time.RFC3339, dropDateStr)
	if err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "invalid drop_date format", err)
		return
	}

	if pickupDate.After(dropDate) {
		utils.ErrorResponse(c, http.StatusBadRequest, "pickup_date must be before drop_date", nil)
		return
	}

	// Query bookings to find conflicting bikes
	ctx := context.Background()
	conflictingBikes := make(map[string]bool)

	bookings, err := h.repo.GetBookingsByDateRange(ctx, pickupDate, dropDate, locationID)
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "failed to fetch bookings", err)
		return
	}

	// Mark booked bikes
	for _, booking := range bookings {
		conflictingBikes[booking.BikeID.String()] = true
	}

	// Load all bikes
	bikes, err := LoadBikesFromJSON("data/bikes.json")
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "failed to load bikes", err)
		return
	}

	// Filter available bikes
	var availableBikes []models.Bike
	for _, bike := range bikes {
		if !conflictingBikes[bike.ID.String()] && bike.Status == "active" {
			availableBikes = append(availableBikes, bike)
		}
	}

	utils.SuccessResponse(c, http.StatusOK, "available bikes retrieved for date range", map[string]interface{}{
		"pickup_date":     pickupDate,
		"drop_date":       dropDate,
		"location_id":     locationID,
		"available_bikes": availableBikes,
		"total_available": len(availableBikes),
	})
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
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"success": true,
		"data":    createdBike,
	})

	utils.SuccessResponse(c, http.StatusCreated, "bike created successfully", createdBike)
}
