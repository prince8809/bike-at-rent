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

	// -------------------- Repositories --------------------
	userRepo := repository.NewUserRepository(database.DB)
	bikeRepo := repository.NewBikeRepository(database.DB)
	locationRepo := repository.NewLocationRepository(database.DB)
	pickupLocationRepo := repository.NewLocationRepository(database.DB)
	bookingRepo := repository.NewBookingRepository(database.DB)

	// -------------------- Services --------------------
	authService := services.NewAuthService(userRepo)

	// -------------------- Handlers --------------------
	healthHandler := handlers.NewHealthHandler()
	authHandler := handlers.NewAuthHandler(authService)
	userHandler := handlers.NewUserHandler(userRepo)
	bikeHandler := handlers.NewBikeHandler(bikeRepo)
	locationHandler := handlers.NewLocationHandler(locationRepo)
	pickupLocationHandler := handlers.NewLocationHandler(pickupLocationRepo)
	bookingHandler := handlers.NewBookingHandler(bookingRepo)

	// -------------------- Middleware --------------------
	router.Use(middleware.CORSMiddleware())
	router.Use(middleware.LoggerMiddleware())
	router.Use(gin.Recovery())

	// -------------------- Root --------------------
	router.GET("/", healthHandler.Welcome)

	// -------------------- API v1 --------------------
	v1 := router.Group("/api/v1")

	// ---------- Health ----------
	v1.GET("/health", healthHandler.HealthCheck)
	v1.GET("/health/db", healthHandler.DBStats)

	// ---------- Auth ----------
	auth := v1.Group("/auth")
	{
		auth.POST("/otp/send", authHandler.SendOTP)
		auth.POST("/otp/verify", authHandler.VerifyOTP)
		auth.POST("/login", authHandler.Login)
		auth.POST("/refresh", authHandler.RefreshToken)
		auth.POST("/logout", authHandler.Logout)

		auth.GET("/me",
			middleware.JWTAuthMiddleware(),
			authHandler.GetCurrentUser,
		)
	}

	// ---------- Operator ----------
	operator := v1.Group("/operator")
	operator.Use(middleware.JWTAuthMiddleware(), middleware.AdminMiddleware())
	{
		operator.POST("/customers", authHandler.CreateOfflineCustomer)
	}

	// ---------- Users ----------
	users := v1.Group("/users")
	{
		users.POST("", userHandler.Create)
		users.GET("", userHandler.List)
		users.GET("/:id",
			middleware.JWTAuthMiddleware(),
			userHandler.GetByID,
		)
	}

	// ---------- Bikes ----------
	bikes := v1.Group("/bikes")
	{
		bikes.GET("", bikeHandler.List)
		bikes.POST("", bikeHandler.Create)
		bikes.GET("/search-by-date", bikeHandler.SearchAvailableByDateRange)
	}

	// ---------- Locations ----------
	locations := v1.Group("/locations")
	{
		locations.GET("", locationHandler.List)
		locations.POST("", locationHandler.Create)
		locations.GET("/:id", locationHandler.GetByID)
	}

	// ---------- Pickup Locations ----------
	pickupLocations := v1.Group("/pickup-locations")
	{
		pickupLocations.POST("", pickupLocationHandler.Create)
		pickupLocations.GET("", pickupLocationHandler.List)
		pickupLocations.GET("/:id", pickupLocationHandler.GetByID)
	}

	// ---------- Bookings ----------
	bookings := v1.Group("/bookings")
	bookings.Use(middleware.JWTAuthMiddleware())
	{
		bookings.POST("", bookingHandler.Create)
		bookings.GET("", bookingHandler.List)
		bookings.GET("/:id", bookingHandler.GetByID)
	}
}
