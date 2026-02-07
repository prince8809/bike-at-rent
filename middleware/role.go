package middleware

import (
	"bike-at-rent/models"
	"bike-at-rent/utils"

	"github.com/gin-gonic/gin"
)

// RoleMiddleware checks if user has required role
func RoleMiddleware(allowedRoles ...models.AppRole) gin.HandlerFunc {
	return func(c *gin.Context) {
		// Get roles from context (set by JWTAuthMiddleware)
		rolesInterface, exists := c.Get("roles")
		if !exists {
			utils.ForbiddenResponse(c, "No roles found")
			c.Abort()
			return
		}

		userRoles, ok := rolesInterface.([]models.AppRole)
		if !ok {
			utils.ForbiddenResponse(c, "Invalid roles format")
			c.Abort()
			return
		}

		// Check if user has any of the allowed roles
		hasRole := false
		for _, userRole := range userRoles {
			for _, allowedRole := range allowedRoles {
				if userRole == allowedRole {
					hasRole = true
					break
				}
			}
			if hasRole {
				break
			}
		}

		if !hasRole {
			utils.ForbiddenResponse(c, "Insufficient permissions")
			c.Abort()
			return
		}

		c.Next()
	}
}

// AdminMiddleware is a shorthand for requiring admin roles
func AdminMiddleware() gin.HandlerFunc {
	return RoleMiddleware(models.RoleSuperAdmin, models.RoleOperationsAdmin)
}

// SuperAdminMiddleware requires super admin role only
func SuperAdminMiddleware() gin.HandlerFunc {
	return RoleMiddleware(models.RoleSuperAdmin)
}
