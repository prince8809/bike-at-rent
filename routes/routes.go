package routes

import (
	"bike-at-rent/database"
	"bike-at-rent/handlers"
	"bike-at-rent/middleware"
	"bike-at-rent/repository"
	"bike-at-rent/services"

	"github.com/gin-gonic/gin"
)

// SetupRoutes configures all application routes
func SetupRoutes(router *gin.Engine) {
	// Initialize repositories
	userRepo := repository.NewUserRepository(database.DB)

	// Initialize services
	authService := services.NewAuthService(userRepo)

	// Initialize handlers
	healthHandler := handlers.NewHealthHandler()
	authHandler := handlers.NewAuthHandler(authService)

	// Apply global middleware
	router.Use(middleware.CORSMiddleware())
	router.Use(middleware.LoggerMiddleware())
	router.Use(gin.Recovery()) // Panic recovery

	// Root route
	router.GET("/", healthHandler.Welcome)

	// API v1 routes
	v1 := router.Group("/api/v1")
	{
		// Health check endpoints
		v1.GET("/health", healthHandler.HealthCheck)
		v1.GET("/health/db", healthHandler.DBStats)

		// Authentication routes (public)
		auth := v1.Group("/auth")
		{
			auth.POST("/otp/send", authHandler.SendOTP)
			auth.POST("/otp/verify", authHandler.VerifyOTP)
			auth.POST("/login", authHandler.Login)
			auth.POST("/refresh", authHandler.RefreshToken)
			auth.POST("/logout", authHandler.Logout)

			// Protected auth routes
			auth.GET("/me", middleware.JWTAuthMiddleware(), authHandler.GetCurrentUser)
		}

		// Operator routes
		operator := v1.Group("/operator")
		operator.Use(middleware.JWTAuthMiddleware())
		operator.Use(middleware.AdminMiddleware())
		{
			operator.POST("/customers", authHandler.CreateOfflineCustomer)
		}

		// Bike routes (to be implemented)
		// bikes := v1.Group("/bikes")
		// {
		// 	bikes.GET("", bikeHandler.List)
		// 	bikes.GET("/availability", bikeHandler.GetAvailability)
		// }

		// Locations routes (to be implemented)
		// locations := v1.Group("/locations")
		// {
		// 	locations.GET("", locationHandler.List)
		// }

		// Booking routes (to be implemented)
		// bookings := v1.Group("/bookings")
		// bookings.Use(middleware.JWTAuthMiddleware())
		// {
		// 	bookings.POST("/calculate", bookingHandler.CalculatePricing)
		// 	bookings.POST("", bookingHandler.Create)
		// 	bookings.GET("", bookingHandler.ListUserBookings)
		// 	bookings.GET("/:id", bookingHandler.GetByID)
		// }

		// Admin routes (to be implemented)
		// admin := v1.Group("/admin")
		// admin.Use(middleware.JWTAuthMiddleware())
		// admin.Use(middleware.AdminMiddleware())
		// {
		// 	admin.GET("/bookings", adminBookingHandler.List)
		// 	admin.PUT("/bookings/:id/status", adminBookingHandler.UpdateStatus)
		// }
	}
}
