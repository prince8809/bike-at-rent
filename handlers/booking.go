package handlers

import (
	"context"
	"net/http"
	"strconv"
	"time"

	"bike-at-rent/models"
	"bike-at-rent/repository"
	"bike-at-rent/utils"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// BookingHandler handles booking-related endpoints
type BookingHandler struct {
	repo *repository.BookingRepository
}

// NewBookingHandler creates a new BookingHandler
func NewBookingHandler(repo *repository.BookingRepository) *BookingHandler {
	return &BookingHandler{repo: repo}
}

// CreateBookingRequest represents the request body for creating a booking
type CreateBookingRequest struct {
	BikeID           uuid.UUID `json:"bike_id" binding:"required"`
	UserID           uuid.UUID `json:"user_id" binding:"required"`
	PickupLocationID uuid.UUID `json:"pickup_location_id" binding:"required"`
	DropLocationID   uuid.UUID `json:"drop_location_id" binding:"required"`
	PickupDatetime   time.Time `json:"pickup_datetime" binding:"required"`
	DropDatetime     time.Time `json:"drop_datetime" binding:"required"`
	BikeRentalPrice  float64   `json:"bike_rental_price" binding:"required,gt=0"`
	SecurityDeposit  float64   `json:"security_deposit" binding:"required,gt=0"`
	TotalAmount      float64   `json:"total_amount" binding:"required,gt=0"`
	AdvancePaid      float64   `json:"advance_paid" binding:"required,gte=0"`
}

// Create handles POST request to create a new booking
func (h *BookingHandler) Create(c *gin.Context) {
	ctx := context.Background()
	var req CreateBookingRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.ValidationErrorResponse(c, err.Error())
		return
	}

	booking := &models.Booking{
		BikeID:           req.BikeID,
		UserID:           req.UserID,
		PickupLocationID: req.PickupLocationID,
		DropLocationID:   req.DropLocationID,
		PickupDatetime:   req.PickupDatetime,
		DropDatetime:     req.DropDatetime,
		BikeRentalPrice:  req.BikeRentalPrice,
		SecurityDeposit:  req.SecurityDeposit,
		TotalAmount:      req.TotalAmount,
		AdvancePaid:      req.AdvancePaid,
		DueAtPickup:      req.TotalAmount - req.AdvancePaid,
		Status:           models.BookingPending,
	}

	ps := "pending"
	booking.PaymentStatus = &ps

	created, err := h.repo.CreateBooking(ctx, booking)
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "failed to create booking", err)
		return
	}
	utils.SuccessResponse(c, http.StatusCreated, "booking created successfully", created)
}

// List returns paginated list of bookings
func (h *BookingHandler) List(c *gin.Context) {
	ctx := context.Background()
	pageStr := c.DefaultQuery("page", "1")
	limitStr := c.DefaultQuery("limit", "20")
	userIDStr := c.Query("user_id")

	page, _ := strconv.Atoi(pageStr)
	limit, _ := strconv.Atoi(limitStr)
	if page < 1 {
		page = 1
	}
	if limit < 1 {
		limit = 20
	}

	offset := (page - 1) * limit
	var userID *uuid.UUID
	if userIDStr != "" {
		if id, err := uuid.Parse(userIDStr); err == nil {
			userID = &id
		}
	}

	bookings, total, err := h.repo.ListBookings(ctx, userID, offset, limit)
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "failed to list bookings", err)
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
		"bookings":   bookings,
		"pagination": pagination,
	}

	utils.SuccessResponse(c, http.StatusOK, "bookings retrieved successfully", data)
}

// GetByID returns a booking by ID
func (h *BookingHandler) GetByID(c *gin.Context) {
	ctx := context.Background()

	bookingIDStr := c.Param("id")
	bookingID, err := uuid.Parse(bookingIDStr)
	if err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "invalid booking id", err)
		return
	}

	booking, err := h.repo.GetBookingByID(ctx, bookingID)
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "failed to get booking", err)
		return
	}
	if booking == nil {
		utils.NotFoundResponse(c, "booking not found")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, "booking retrieved successfully", booking)
}
