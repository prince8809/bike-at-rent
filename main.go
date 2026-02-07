package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"bike-at-rent/config"
	"bike-at-rent/database"
	"bike-at-rent/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	// Load configuration
	log.Println("Loading configuration...")
	if err := config.Load(); err != nil {
		log.Fatalf("Failed to load configuration: %v", err)
	}
	log.Println("✓ Configuration loaded successfully")

	// Set Gin mode
	gin.SetMode(config.AppConfig.GinMode)

	// Connect to database
	log.Println("Connecting to database...")
	if err := database.Connect(); err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer database.Close()

	// Initialize Gin router
	router := gin.New()

	// Setup routes
	log.Println("Setting up routes...")
	routes.SetupRoutes(router)
	log.Println("✓ Routes configured successfully")

	// Create HTTP server
	server := &http.Server{
		Addr:           ":" + config.AppConfig.Port,
		Handler:        router,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20, // 1 MB
	}

	// Start server in a goroutine
	go func() {
		log.Printf("🚀 Server starting on port %s", config.AppConfig.Port)
		log.Printf("🌐 Application URL: %s", config.AppConfig.AppURL)
		log.Printf("📊 Environment: %s", config.AppConfig.GinMode)
		log.Println("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")

		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Failed to start server: %v", err)
		}
	}()

	// Wait for interrupt signal to gracefully shut down the server
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Println("\n🛑 Shutting down server...")

	// Graceful shutdown with timeout
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := server.Shutdown(ctx); err != nil {
		log.Printf("Server forced to shutdown: %v", err)
	}

	log.Println("✓ Server exited successfully")
}
