package middleware

import (
	"strings"

	"bike-at-rent/utils"

	"github.com/gin-gonic/gin"
)

// JWTAuthMiddleware validates JWT token and sets user context
func JWTAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Get token from Authorization header
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			utils.UnauthorizedResponse(c, "Missing authorization header")
			c.Abort()
			return
		}

		// Check Bearer prefix
		parts := strings.SplitN(authHeader, " ", 2)
		if len(parts) != 2 || parts[0] != "Bearer" {
			utils.UnauthorizedResponse(c, "Invalid authorization header format")
			c.Abort()
			return
		}

		token := parts[1]

		// Validate token
		claims, err := utils.ValidateToken(token)
		if err != nil {
			utils.UnauthorizedResponse(c, "Invalid or expired token")
			c.Abort()
			return
		}

		// Set user context
		c.Set("user_id", claims.UserID.String())
		c.Set("email", claims.Email)
		c.Set("phone", claims.Phone)
		c.Set("roles", claims.Roles)

		c.Next()
	}
}
