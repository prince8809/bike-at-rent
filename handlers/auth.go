package handlers

import (
	"net/http"

	"bikeatrent-backend/services"
	"bikeatrent-backend/utils"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type AuthHandler struct {
	authService *services.AuthService
}

func NewAuthHandler(authService *services.AuthService) *AuthHandler {
	return &AuthHandler{
		authService: authService,
	}
}

// SendOTPRequest represents the send OTP request body
type SendOTPRequest struct {
	Phone string `json:"phone" binding:"required"`
}

// VerifyOTPRequest represents the verify OTP request body
type VerifyOTPRequest struct {
	Phone string `json:"phone" binding:"required"`
	OTP   string `json:"otp" binding:"required"`
}

// LoginRequest represents the admin/operator login request
type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=8"`
}

// RefreshTokenRequest represents the refresh token request
type RefreshTokenRequest struct {
	RefreshToken string `json:"refresh_token" binding:"required"`
}

// SendOTP sends OTP to phone number
func (h *AuthHandler) SendOTP(c *gin.Context) {
	var req SendOTPRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.ValidationErrorResponse(c, err.Error())
		return
	}

	err := h.authService.SendOTP(c.Request.Context(), req.Phone)
	if err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Failed to send OTP", err)
		return
	}

	utils.SuccessResponse(c, http.StatusOK, "OTP sent successfully", gin.H{
		"expires_in": 300, // 5 minutes
	})
}

// VerifyOTP verifies OTP and returns auth tokens
func (h *AuthHandler) VerifyOTP(c *gin.Context) {
	var req VerifyOTPRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.ValidationErrorResponse(c, err.Error())
		return
	}

	accessToken, refreshToken, isNew, err := h.authService.VerifyOTP(c.Request.Context(), req.Phone, req.OTP)
	if err != nil {
		utils.ErrorResponse(c, http.StatusUnauthorized, "Invalid OTP", err)
		return
	}

	utils.SuccessResponse(c, http.StatusOK, "OTP verified successfully", gin.H{
		"access_token":  accessToken,
		"refresh_token": refreshToken,
		"expires_in":    3600, // 1 hour
		"user": gin.H{
			"phone":  req.Phone,
			"is_new": isNew,
		},
	})
}

// Login authenticates admin/operator with email and password
func (h *AuthHandler) Login(c *gin.Context) {
	var req LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.ValidationErrorResponse(c, err.Error())
		return
	}

	accessToken, refreshToken, roles, err := h.authService.Login(c.Request.Context(), req.Email, req.Password)
	if err != nil {
		utils.ErrorResponse(c, http.StatusUnauthorized, "Invalid credentials", err)
		return
	}

	utils.SuccessResponse(c, http.StatusOK, "Login successful", gin.H{
		"access_token":  accessToken,
		"refresh_token": refreshToken,
		"expires_in":    3600,
		"user": gin.H{
			"email": req.Email,
			"roles": roles,
		},
	})
}

// RefreshToken generates new access token
func (h *AuthHandler) RefreshToken(c *gin.Context) {
	var req RefreshTokenRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.ValidationErrorResponse(c, err.Error())
		return
	}

	accessToken, err := h.authService.RefreshToken(c.Request.Context(), req.RefreshToken)
	if err != nil {
		utils.ErrorResponse(c, http.StatusUnauthorized, "Invalid refresh token", err)
		return
	}

	utils.SuccessResponse(c, http.StatusOK, "Token refreshed successfully", gin.H{
		"access_token": accessToken,
		"expires_in":   3600,
	})
}

// Logout invalidates current session
func (h *AuthHandler) Logout(c *gin.Context) {
	// TODO: Implement token blacklisting in Redis
	// For now, just return success
	utils.SuccessResponse(c, http.StatusOK, "Logged out successfully", nil)
}

// GetCurrentUser returns current user info
func (h *AuthHandler) GetCurrentUser(c *gin.Context) {
	// Get user ID from context (set by JWT middleware)
	userIDStr, exists := c.Get("user_id")
	if !exists {
		utils.UnauthorizedResponse(c, "User not authenticated")
		return
	}

	userID, err := uuid.Parse(userIDStr.(string))
	if err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid user ID", err)
		return
	}

	userData, err := h.authService.GetCurrentUser(c.Request.Context(), userID)
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Failed to get user data", err)
		return
	}

	c.JSON(http.StatusOK, userData)
}

// CreateOfflineCustomerRequest represents the offline customer creation request
type CreateOfflineCustomerRequest struct {
	Phone string `json:"phone" binding:"required"`
	Name  string `json:"name" binding:"required"`
}

// CreateOfflineCustomer creates or finds customer for walk-in bookings
func (h *AuthHandler) CreateOfflineCustomer(c *gin.Context) {
	var req CreateOfflineCustomerRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.ValidationErrorResponse(c, err.Error())
		return
	}

	userID, isNew, err := h.authService.CreateOfflineCustomer(c.Request.Context(), req.Phone, req.Name)
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Failed to create offline customer", err)
		return
	}

	message := "Offline customer created successfully"
	if !isNew {
		message = "Customer found"
	}

	utils.SuccessResponse(c, http.StatusOK, message, gin.H{
		"user_id": userID,
		"is_new":  isNew,
		"profile": gin.H{
			"name":  req.Name,
			"phone": req.Phone,
		},
	})
}
