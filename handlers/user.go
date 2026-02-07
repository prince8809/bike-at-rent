package handlers

import (
	"context"
	"net/http"
	"strconv"

	"bike-at-rent/repository"
	"bike-at-rent/utils"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// UserHandler handles user-related endpoints
type UserHandler struct {
	userRepo *repository.UserRepository
}

// NewUserHandler creates a new UserHandler
func NewUserHandler(userRepo *repository.UserRepository) *UserHandler {
	return &UserHandler{userRepo: userRepo}
}

// CreateUserRequest represents the request body for creating a user
type CreateUserRequest struct {
	Email    string  `json:"email" binding:"required,email"`
	Password string  `json:"password" binding:"required,min=8"`
	Phone    *string `json:"phone,omitempty"`
	Name     string  `json:"name" binding:"required"`
	Address  *string `json:"address,omitempty"`
}

// Create handles POST request to create a new user
func (h *UserHandler) Create(c *gin.Context) {
	ctx := context.Background()

	var req CreateUserRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.ValidationErrorResponse(c, err.Error())
		return
	}

	// Check if user already exists
	existingUser, err := h.userRepo.GetUserByEmail(ctx, req.Email)
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "failed to check user", err)
		return
	}
	if existingUser != nil {
		utils.ErrorResponse(c, http.StatusConflict, "user with this email already exists", nil)
		return
	}

	// Hash password
	passwordHash, err := utils.HashPassword(req.Password)
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "failed to hash password", err)
		return
	}

	// Create user
	user, err := h.userRepo.CreateUser(ctx, req.Email, passwordHash, req.Phone)
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "failed to create user", err)
		return
	}

	// Create profile (phone is required for profile)
	phone := ""
	if req.Phone != nil {
		phone = *req.Phone
	}
	profile, err := h.userRepo.CreateProfile(ctx, user.ID, req.Name, req.Email, phone)
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "failed to create profile", err)
		return
	}

	// Create KYC record
	err = h.userRepo.CreateKYCRecord(ctx, user.ID)
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "failed to create KYC record", err)
		return
	}

	// Return created user with profile
	data := map[string]interface{}{
		"user":    user,
		"profile": profile,
	}

	utils.SuccessResponse(c, http.StatusCreated, "user created successfully", data)
}

// GetByID returns a user by ID
func (h *UserHandler) GetByID(c *gin.Context) {
	ctx := context.Background()

	userIDStr := c.Param("id")
	userID, err := uuid.Parse(userIDStr)
	if err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "invalid user id", err)
		return
	}

	user, err := h.userRepo.GetUserByID(ctx, userID)
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "failed to get user", err)
		return
	}
	if user == nil {
		utils.NotFoundResponse(c, "user not found")
		return
	}

	profile, err := h.userRepo.GetProfileByUserID(ctx, userID)
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "failed to get profile", err)
		return
	}

	roles, err := h.userRepo.GetUserRoles(ctx, userID)
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "failed to get roles", err)
		return
	}

	kyc, err := h.userRepo.GetKYCByUserID(ctx, userID)
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "failed to get KYC", err)
		return
	}

	data := map[string]interface{}{
		"user":    user,
		"profile": profile,
		"roles":   roles,
		"kyc":     kyc,
	}

	utils.SuccessResponse(c, http.StatusOK, "user retrieved", data)
}

// List returns paginated list of users with optional name filter
func (h *UserHandler) List(c *gin.Context) {
	ctx := context.Background()

	// Query params
	name := c.Query("name")
	var namePtr *string
	if name != "" {
		namePtr = &name
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

	users, total, err := h.userRepo.ListUsers(ctx, namePtr, offset, limit)
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "failed to list users", err)
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
		"users":      users,
		"pagination": pagination,
	}

	utils.SuccessResponse(c, http.StatusOK, "users retrieved", data)
}
