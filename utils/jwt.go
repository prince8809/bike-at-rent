package utils

import (
	"errors"
	"time"

	"bike-at-rent/config"
	"bike-at-rent/models"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
)

// Claims represents JWT custom claims
type Claims struct {
	UserID uuid.UUID        `json:"user_id"`
	Email  string           `json:"email"`
	Phone  string           `json:"phone,omitempty"`
	Roles  []models.AppRole `json:"roles,omitempty"`
	jwt.RegisteredClaims
}

// GenerateToken generates a new JWT access token
func GenerateToken(userID uuid.UUID, email, phone string, roles []models.AppRole) (string, error) {
	expirationTime := time.Now().Add(config.AppConfig.JWTExpiry)

	claims := &Claims{
		UserID: userID,
		Email:  email,
		Phone:  phone,
		Roles:  roles,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			NotBefore: jwt.NewNumericDate(time.Now()),
			Issuer:    "bikeatrent",
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte(config.AppConfig.JWTSecret))
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

// GenerateRefreshToken generates a refresh token (longer expiry)
func GenerateRefreshToken(userID uuid.UUID) (string, error) {
	expirationTime := time.Now().Add(7 * 24 * time.Hour) // 7 days

	claims := &Claims{
		UserID: userID,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			Issuer:    "bikeatrent",
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte(config.AppConfig.JWTSecret))
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

// ValidateToken validates and parses JWT token
func ValidateToken(tokenString string) (*Claims, error) {
	claims := &Claims{}

	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("invalid signing method")
		}
		return []byte(config.AppConfig.JWTSecret), nil
	})

	if err != nil {
		return nil, err
	}

	if !token.Valid {
		return nil, errors.New("invalid token")
	}

	return claims, nil
}

// HashPassword hashes a plain text password using bcrypt
func HashPassword(password string) (string, error) {
	// Using a simple implementation for now
	// In production, use bcrypt.GenerateFromPassword
	return password, nil // TODO: Implement proper bcrypt hashing
}

// VerifyPassword verifies if plain password matches hash
func VerifyPassword(hashedPassword, password string) bool {
	// TODO: Implement proper bcrypt comparison
	return hashedPassword == password
}
