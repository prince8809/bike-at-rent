package services

import (
	"context"
	"errors"
	"fmt"
	"regexp"
	"strings"

	"bike-at-rent/config"
	"bike-at-rent/models"
	"bike-at-rent/repository"
	"bike-at-rent/utils"

	"github.com/google/uuid"
)

type AuthService struct {
	userRepo *repository.UserRepository
}

func NewAuthService(userRepo *repository.UserRepository) *AuthService {
	return &AuthService{
		userRepo: userRepo,
	}
}

// SendOTP sends OTP to phone number
func (s *AuthService) SendOTP(ctx context.Context, phone string) error {
	// Validate phone format (E.164)
	if !isValidE164Phone(phone) {
		return errors.New("invalid phone format, use E.164 format (e.g., +919876543210)")
	}

	// TODO: Implement actual SMS gateway integration
	// For now, we'll just log it
	// In production: call SMS API to send OTP

	return nil
}

// VerifyOTP verifies OTP and creates/logs in user
func (s *AuthService) VerifyOTP(ctx context.Context, phone, otp string) (string, string, bool, error) {
	// Validate OTP
	if !isValidOTP(otp) {
		return "", "", false, errors.New("invalid OTP format")
	}

	// Check master OTP for testing
	if config.AppConfig.EnableMasterOTP && (otp == config.AppConfig.MasterOTP || otp == "123456") {
		// Master OTP accepted
	} else {
		// TODO: Verify OTP from cache/database
		// For now, accept any 6-digit OTP in development
		if len(otp) != 6 {
			return "", "", false, errors.New("invalid OTP")
		}
	}

	// Check if user exists
	user, err := s.userRepo.GetUserByPhone(ctx, phone)
	if err != nil {
		return "", "", false, fmt.Errorf("failed to check user: %w", err)
	}

	isNewUser := user == nil

	if isNewUser {
		// Create new user
		user, err = s.createPhoneUser(ctx, phone)
		if err != nil {
			return "", "", false, fmt.Errorf("failed to create user: %w", err)
		}
	}

	// Get user roles
	roles, err := s.userRepo.GetUserRoles(ctx, user.ID)
	if err != nil {
		return "", "", false, fmt.Errorf("failed to get user roles: %w", err)
	}

	// Get profile
	profile, err := s.userRepo.GetProfileByUserID(ctx, user.ID)
	if err != nil {
		return "", "", false, fmt.Errorf("failed to get profile: %w", err)
	}

	phoneStr := ""
	if profile != nil {
		phoneStr = profile.Phone
	}

	// Generate tokens
	accessToken, err := utils.GenerateToken(user.ID, user.Email, phoneStr, roles)
	if err != nil {
		return "", "", false, fmt.Errorf("failed to generate access token: %w", err)
	}

	refreshToken, err := utils.GenerateRefreshToken(user.ID)
	if err != nil {
		return "", "", false, fmt.Errorf("failed to generate refresh token: %w", err)
	}

	return accessToken, refreshToken, isNewUser, nil
}

// Login authenticates admin/operator with email and password
func (s *AuthService) Login(ctx context.Context, email, password string) (string, string, []models.AppRole, error) {
	// Get user by email
	user, err := s.userRepo.GetUserByEmail(ctx, email)
	if err != nil {
		return "", "", nil, fmt.Errorf("failed to get user: %w", err)
	}

	if user == nil {
		return "", "", nil, errors.New("invalid credentials")
	}

	// Verify password
	if !utils.VerifyPassword(user.PasswordHash, password) {
		return "", "", nil, errors.New("invalid credentials")
	}

	// Get user roles
	roles, err := s.userRepo.GetUserRoles(ctx, user.ID)
	if err != nil {
		return "", "", nil, fmt.Errorf("failed to get user roles: %w", err)
	}

	// Check if user has admin or operator role
	if !hasAdminRole(roles) {
		return "", "", nil, errors.New("access denied: no admin or operator role")
	}

	// Get profile for phone
	profile, err := s.userRepo.GetProfileByUserID(ctx, user.ID)
	if err != nil {
		return "", "", nil, fmt.Errorf("failed to get profile: %w", err)
	}

	phoneStr := ""
	if profile != nil {
		phoneStr = profile.Phone
	}

	// Generate tokens
	accessToken, err := utils.GenerateToken(user.ID, user.Email, phoneStr, roles)
	if err != nil {
		return "", "", nil, fmt.Errorf("failed to generate access token: %w", err)
	}

	refreshToken, err := utils.GenerateRefreshToken(user.ID)
	if err != nil {
		return "", "", nil, fmt.Errorf("failed to generate refresh token: %w", err)
	}

	return accessToken, refreshToken, roles, nil
}

// RefreshToken generates new access token from refresh token
func (s *AuthService) RefreshToken(ctx context.Context, refreshToken string) (string, error) {
	// Validate refresh token
	claims, err := utils.ValidateToken(refreshToken)
	if err != nil {
		return "", errors.New("invalid refresh token")
	}

	// Get user
	user, err := s.userRepo.GetUserByID(ctx, claims.UserID)
	if err != nil {
		return "", fmt.Errorf("failed to get user: %w", err)
	}

	if user == nil {
		return "", errors.New("user not found")
	}

	// Get roles
	roles, err := s.userRepo.GetUserRoles(ctx, user.ID)
	if err != nil {
		return "", fmt.Errorf("failed to get user roles: %w", err)
	}

	// Get profile
	profile, err := s.userRepo.GetProfileByUserID(ctx, user.ID)
	if err != nil {
		return "", fmt.Errorf("failed to get profile: %w", err)
	}

	phoneStr := ""
	if profile != nil {
		phoneStr = profile.Phone
	}

	// Generate new access token
	accessToken, err := utils.GenerateToken(user.ID, user.Email, phoneStr, roles)
	if err != nil {
		return "", fmt.Errorf("failed to generate access token: %w", err)
	}

	return accessToken, nil
}

// GetCurrentUser retrieves current user with profile, KYC, and roles
func (s *AuthService) GetCurrentUser(ctx context.Context, userID uuid.UUID) (map[string]interface{}, error) {
	// Get user
	user, err := s.userRepo.GetUserByID(ctx, userID)
	if err != nil {
		return nil, fmt.Errorf("failed to get user: %w", err)
	}

	if user == nil {
		return nil, errors.New("user not found")
	}

	// Get profile
	profile, err := s.userRepo.GetProfileByUserID(ctx, userID)
	if err != nil {
		return nil, fmt.Errorf("failed to get profile: %w", err)
	}

	// Get KYC
	kyc, err := s.userRepo.GetKYCByUserID(ctx, userID)
	if err != nil {
		return nil, fmt.Errorf("failed to get KYC: %w", err)
	}

	// Get roles
	roles, err := s.userRepo.GetUserRoles(ctx, userID)
	if err != nil {
		return nil, fmt.Errorf("failed to get roles: %w", err)
	}

	result := map[string]interface{}{
		"user": map[string]interface{}{
			"id":    user.ID,
			"email": user.Email,
		},
		"profile": profile,
		"roles":   roles,
	}

	if kyc != nil {
		result["kyc"] = map[string]interface{}{
			"dl_status":      kyc.DLStatus,
			"aadhaar_status": kyc.AadhaarStatus,
		}
	}

	return result, nil
}

// CreateOfflineCustomer creates or finds customer for walk-in bookings
func (s *AuthService) CreateOfflineCustomer(ctx context.Context, phone, name string) (uuid.UUID, bool, error) {
	// Check if profile exists with this phone
	profile, err := s.userRepo.GetProfileByPhone(ctx, phone)
	if err != nil {
		return uuid.Nil, false, fmt.Errorf("failed to check profile: %w", err)
	}

	if profile != nil {
		// User exists, update name if empty
		if profile.Name == "" && name != "" {
			err = s.userRepo.UpdateProfile(ctx, profile.UserID, name, profile.Email, profile.Address)
			if err != nil {
				return uuid.Nil, false, fmt.Errorf("failed to update profile: %w", err)
			}
		}
		return profile.UserID, false, nil
	}

	// Create new user
	user, err := s.createOfflineUser(ctx, phone, name)
	if err != nil {
		return uuid.Nil, false, fmt.Errorf("failed to create offline user: %w", err)
	}

	return user.ID, true, nil
}

// Helper functions

func (s *AuthService) createPhoneUser(ctx context.Context, phone string) (*models.User, error) {
	// Generate email from phone: last 10 digits + @phone.bikeatrent.in
	email := generateEmailFromPhone(phone)

	// Generate password: otp_verified_{phone}_secure_2024
	password := fmt.Sprintf("otp_verified_%s_secure_2024", strings.TrimPrefix(phone, "+"))
	passwordHash, _ := utils.HashPassword(password)

	// Create user
	user, err := s.userRepo.CreateUser(ctx, email, passwordHash, &phone)
	if err != nil {
		return nil, err
	}

	// Create profile
	_, err = s.userRepo.CreateProfile(ctx, user.ID, "", email, phone)
	if err != nil {
		return nil, err
	}

	// Create KYC record
	err = s.userRepo.CreateKYCRecord(ctx, user.ID)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (s *AuthService) createOfflineUser(ctx context.Context, phone, name string) (*models.User, error) {
	// Generate email: offline_{phone}@bikeatrent.local
	email := fmt.Sprintf("offline_%s@bikeatrent.local", strings.TrimPrefix(phone, "+"))

	// Generate random password
	password := fmt.Sprintf("offline_%s_%d", phone, uuid.New().ID())
	passwordHash, _ := utils.HashPassword(password)

	// Create user
	user, err := s.userRepo.CreateUser(ctx, email, passwordHash, &phone)
	if err != nil {
		return nil, err
	}

	// Create profile
	_, err = s.userRepo.CreateProfile(ctx, user.ID, name, email, phone)
	if err != nil {
		return nil, err
	}

	// Create KYC record
	err = s.userRepo.CreateKYCRecord(ctx, user.ID)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func generateEmailFromPhone(phone string) string {
	// Remove + and take last 10 digits
	digits := regexp.MustCompile(`\d+`).FindString(phone)
	if len(digits) > 10 {
		digits = digits[len(digits)-10:]
	}
	return fmt.Sprintf("%s@phone.bikeatrent.in", digits)
}

func isValidE164Phone(phone string) bool {
	// Basic E.164 validation: starts with +, followed by 1-15 digits
	matched, _ := regexp.MatchString(`^\+[1-9]\d{1,14}$`, phone)
	return matched
}

func isValidOTP(otp string) bool {
	// OTP should be 6 digits
	matched, _ := regexp.MatchString(`^\d{6}$`, otp)
	return matched
}

func hasAdminRole(roles []models.AppRole) bool {
	for _, role := range roles {
		if role == models.RoleSuperAdmin || role == models.RoleOperationsAdmin {
			return true
		}
	}
	return false
}
