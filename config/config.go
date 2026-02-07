package config

import (
	"log"
	"os"
	"strconv"
	"time"

	"github.com/joho/godotenv"
)

type Config struct {
	// Server
	Port    string
	GinMode string
	AppURL  string

	// Database
	DatabaseURL          string
	DatabasePoolSize     int
	DatabaseMaxIdleConns int
	DatabaseConnMaxLife  time.Duration

	// JWT
	JWTSecret string
	JWTExpiry time.Duration

	// SMS
	SMSAPIKey       string
	SMSSenderID     string
	SMSProvider     string
	MasterOTP       string
	EnableMasterOTP bool

	// Storage
	StorageBucket      string
	StorageRegion      string
	AWSAccessKeyID     string
	AWSSecretAccessKey string

	// CORS
	CORSAllowedOrigins string
}

var AppConfig *Config

// Load reads configuration from environment variables
func Load() error {
	// Load .env file if it exists (ignore error in production where env vars are set directly)
	_ = godotenv.Load()

	AppConfig = &Config{
		Port:    getEnv("PORT", "8080"),
		GinMode: getEnv("GIN_MODE", "debug"),
		AppURL:  getEnv("APP_URL", "http://localhost:8080"),

		DatabaseURL:          getEnv("DATABASE_URL", ""),
		DatabasePoolSize:     getEnvAsInt("DATABASE_POOL_SIZE", 20),
		DatabaseMaxIdleConns: getEnvAsInt("DATABASE_MAX_IDLE_CONNS", 10),
		DatabaseConnMaxLife:  getEnvAsDuration("DATABASE_CONN_MAX_LIFETIME", time.Hour),

		JWTSecret: getEnv("JWT_SECRET", ""),
		JWTExpiry: getEnvAsDuration("JWT_EXPIRY", 24*time.Hour),

		SMSAPIKey:       getEnv("SMS_API_KEY", ""),
		SMSSenderID:     getEnv("SMS_SENDER_ID", "BIKEAT"),
		SMSProvider:     getEnv("SMS_PROVIDER", "twilio"),
		MasterOTP:       getEnv("MASTER_OTP", "421742"),
		EnableMasterOTP: getEnvAsBool("ENABLE_MASTER_OTP", true),

		StorageBucket:      getEnv("STORAGE_BUCKET", "kyc-documents"),
		StorageRegion:      getEnv("STORAGE_REGION", "ap-south-1"),
		AWSAccessKeyID:     getEnv("AWS_ACCESS_KEY_ID", ""),
		AWSSecretAccessKey: getEnv("AWS_SECRET_ACCESS_KEY", ""),

		CORSAllowedOrigins: getEnv("CORS_ALLOWED_ORIGINS", "http://localhost:3000"),
	}

	// Validate required fields
	if AppConfig.DatabaseURL == "" {
		log.Fatal("DATABASE_URL is required")
	}
	if AppConfig.JWTSecret == "" {
		log.Fatal("JWT_SECRET is required")
	}

	return nil
}

// Helper functions
func getEnv(key, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
}

func getEnvAsInt(key string, defaultValue int) int {
	valueStr := os.Getenv(key)
	if valueStr == "" {
		return defaultValue
	}
	value, err := strconv.Atoi(valueStr)
	if err != nil {
		return defaultValue
	}
	return value
}

func getEnvAsBool(key string, defaultValue bool) bool {
	valueStr := os.Getenv(key)
	if valueStr == "" {
		return defaultValue
	}
	value, err := strconv.ParseBool(valueStr)
	if err != nil {
		return defaultValue
	}
	return value
}

func getEnvAsDuration(key string, defaultValue time.Duration) time.Duration {
	valueStr := os.Getenv(key)
	if valueStr == "" {
		return defaultValue
	}
	value, err := time.ParseDuration(valueStr)
	if err != nil {
		return defaultValue
	}
	return value
}
