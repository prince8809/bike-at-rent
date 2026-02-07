package models

import (
	"time"

	"github.com/google/uuid"
)

// AppRole represents user role types
type AppRole string

const (
	RoleSuperAdmin      AppRole = "super_admin"
	RoleOperationsAdmin AppRole = "operations_admin"
	RoleReadonly        AppRole = "readonly"
)

// KYCStatus represents document verification status
type KYCStatus string

const (
	KYCNotSubmitted KYCStatus = "not_submitted"
	KYCUnderReview  KYCStatus = "under_review"
	KYCVerified     KYCStatus = "verified"
	KYCRejected     KYCStatus = "rejected"
)

// BikeStatus represents bike availability status
type BikeStatus string

const (
	BikeActive      BikeStatus = "active"
	BikeInactive    BikeStatus = "inactive"
	BikeMaintenance BikeStatus = "maintenance"
)

// BookingStatus represents booking lifecycle status
type BookingStatus string

const (
	BookingPending   BookingStatus = "pending"
	BookingConfirmed BookingStatus = "confirmed"
	BookingCompleted BookingStatus = "completed"
	BookingCancelled BookingStatus = "cancelled"
)

// Profile - Customer/User profile
type Profile struct {
	ID        uuid.UUID `json:"id" db:"id"`
	UserID    uuid.UUID `json:"user_id" db:"user_id"`
	Name      string    `json:"name" db:"name"`
	Email     string    `json:"email" db:"email"`
	Phone     string    `json:"phone" db:"phone"`
	Address   *string   `json:"address,omitempty" db:"address"`
	AvatarURL *string   `json:"avatar_url,omitempty" db:"avatar_url"`
	CreatedAt time.Time `json:"created_at" db:"created_at"`
	UpdatedAt time.Time `json:"updated_at" db:"updated_at"`
}

// UserRole - Role-based access control
type UserRole struct {
	ID        uuid.UUID `json:"id" db:"id"`
	UserID    uuid.UUID `json:"user_id" db:"user_id"`
	Role      AppRole   `json:"role" db:"role"`
	CreatedAt time.Time `json:"created_at" db:"created_at"`
}

// User - Auth user representation
type User struct {
	ID           uuid.UUID `json:"id" db:"id"`
	Email        string    `json:"email" db:"email"`
	PasswordHash string    `json:"-" db:"password_hash"`
	Phone        *string   `json:"phone,omitempty" db:"phone"`
	CreatedAt    time.Time `json:"created_at" db:"created_at"`
	UpdatedAt    time.Time `json:"updated_at" db:"updated_at"`
}

// KYCRecord - Document verification status
type KYCRecord struct {
	ID                     uuid.UUID  `json:"id" db:"id"`
	UserID                 uuid.UUID  `json:"user_id" db:"user_id"`
	DLStatus               KYCStatus  `json:"dl_status" db:"dl_status"`
	DLNumber               *string    `json:"dl_number,omitempty" db:"dl_number"`
	DLFrontImageURL        *string    `json:"dl_front_image_url,omitempty" db:"dl_front_image_url"`
	DLBackImageURL         *string    `json:"dl_back_image_url,omitempty" db:"dl_back_image_url"`
	DLVerifiedAt           *time.Time `json:"dl_verified_at,omitempty" db:"dl_verified_at"`
	DLRejectionReason      *string    `json:"dl_rejection_reason,omitempty" db:"dl_rejection_reason"`
	IDType                 *string    `json:"id_type,omitempty" db:"id_type"`
	IDNumber               *string    `json:"id_number,omitempty" db:"id_number"`
	IDFrontImageURL        *string    `json:"id_front_image_url,omitempty" db:"id_front_image_url"`
	IDBackImageURL         *string    `json:"id_back_image_url,omitempty" db:"id_back_image_url"`
	AadhaarStatus          KYCStatus  `json:"aadhaar_status" db:"aadhaar_status"`
	AadhaarVerifiedAt      *time.Time `json:"aadhaar_verified_at,omitempty" db:"aadhaar_verified_at"`
	AadhaarRejectionReason *string    `json:"aadhaar_rejection_reason,omitempty" db:"aadhaar_rejection_reason"`
	PassportPhotoURL       *string    `json:"passport_photo_url,omitempty" db:"passport_photo_url"`
	CreatedAt              time.Time  `json:"created_at" db:"created_at"`
	UpdatedAt              time.Time  `json:"updated_at" db:"updated_at"`
}

// Bike - Vehicle master data
type Bike struct {
	ID              uuid.UUID  `json:"id" db:"id"`
	Name            string     `json:"name" db:"name"`
	Category        string     `json:"category" db:"category"`
	DailyPrice      float64    `json:"daily_price" db:"daily_price"`
	HourlyPrice     *float64   `json:"hourly_price,omitempty" db:"hourly_price"`
	SecurityDeposit float64    `json:"security_deposit" db:"security_deposit"`
	ImageURL        *string    `json:"image_url,omitempty" db:"image_url"`
	Description     *string    `json:"description,omitempty" db:"description"`
	Features        []string   `json:"features" db:"features"`
	Status          BikeStatus `json:"status" db:"status"`
	CreatedAt       time.Time  `json:"created_at" db:"created_at"`
	UpdatedAt       time.Time  `json:"updated_at" db:"updated_at"`
}

// BikeInventory - Per-location availability
type BikeInventory struct {
	ID                uuid.UUID `json:"id" db:"id"`
	BikeID            uuid.UUID `json:"bike_id" db:"bike_id"`
	LocationID        uuid.UUID `json:"location_id" db:"location_id"`
	Quantity          int       `json:"quantity" db:"quantity"`
	AvailableQuantity int       `json:"available_quantity" db:"available_quantity"`
}

// PickupLocation - Rental branch/pickup point
type PickupLocation struct {
	ID           uuid.UUID `json:"id" db:"id"`
	Name         string    `json:"name" db:"name"`
	Address      string    `json:"address" db:"address"`
	City         string    `json:"city" db:"city"`
	LocationCode *string   `json:"location_code,omitempty" db:"location_code"`
	IsActive     bool      `json:"is_active" db:"is_active"`
	CreatedAt    time.Time `json:"created_at" db:"created_at"`
	UpdatedAt    time.Time `json:"updated_at" db:"updated_at"`
}

// Accessory - Add-on items for rental
type Accessory struct {
	ID        uuid.UUID `json:"id" db:"id"`
	Name      string    `json:"name" db:"name"`
	Price     float64   `json:"price" db:"price"`
	ImageURL  *string   `json:"image_url,omitempty" db:"image_url"`
	IsActive  bool      `json:"is_active" db:"is_active"`
	CreatedAt time.Time `json:"created_at" db:"created_at"`
}

// AccessorySelection - For booking JSON storage
type AccessorySelection struct {
	ID       string  `json:"id"`
	Name     string  `json:"name"`
	Price    float64 `json:"price"`
	Quantity int     `json:"quantity"`
}

// Booking - Rental transaction
type Booking struct {
	ID                   uuid.UUID            `json:"id" db:"id"`
	BookingNumber        *string              `json:"booking_number,omitempty" db:"booking_number"`
	UserID               uuid.UUID            `json:"user_id" db:"user_id"`
	BikeID               uuid.UUID            `json:"bike_id" db:"bike_id"`
	PickupLocationID     uuid.UUID            `json:"pickup_location_id" db:"pickup_location_id"`
	DropLocationID       uuid.UUID            `json:"drop_location_id" db:"drop_location_id"`
	PickupDatetime       time.Time            `json:"pickup_datetime" db:"pickup_datetime"`
	DropDatetime         time.Time            `json:"drop_datetime" db:"drop_datetime"`
	BikeRentalPrice      float64              `json:"bike_rental_price" db:"bike_rental_price"`
	AccessoriesPrice     *float64             `json:"accessories_price,omitempty" db:"accessories_price"`
	AccessoriesJSON      []AccessorySelection `json:"accessories_json,omitempty" db:"accessories_json"`
	ConvenienceCharges   *float64             `json:"convenience_charges,omitempty" db:"convenience_charges"`
	TripAssuranceEnabled bool                 `json:"trip_assurance_enabled" db:"trip_assurance_enabled"`
	TripAssurancePrice   *float64             `json:"trip_assurance_price,omitempty" db:"trip_assurance_price"`
	ExtraHoursCharge     *float64             `json:"extra_hours_charge,omitempty" db:"extra_hours_charge"`
	PickupDropEnabled    bool                 `json:"pickup_drop_enabled" db:"pickup_drop_enabled"`
	PickupEnabled        bool                 `json:"pickup_enabled" db:"pickup_enabled"`
	DropEnabled          bool                 `json:"drop_enabled" db:"drop_enabled"`
	PickupAddress        *string              `json:"pickup_address,omitempty" db:"pickup_address"`
	DropAddress          *string              `json:"drop_address,omitempty" db:"drop_address"`
	PickupDropCharges    *float64             `json:"pickup_drop_charges,omitempty" db:"pickup_drop_charges"`
	CouponID             *uuid.UUID           `json:"coupon_id,omitempty" db:"coupon_id"`
	CouponCode           *string              `json:"coupon_code,omitempty" db:"coupon_code"`
	CouponDiscount       *float64             `json:"coupon_discount,omitempty" db:"coupon_discount"`
	DiscountAmount       *float64             `json:"discount_amount,omitempty" db:"discount_amount"`
	SecurityDeposit      float64              `json:"security_deposit" db:"security_deposit"`
	TotalAmount          float64              `json:"total_amount" db:"total_amount"`
	AdvancePaid          float64              `json:"advance_paid" db:"advance_paid"`
	DueAtPickup          float64              `json:"due_at_pickup" db:"due_at_pickup"`
	Status               BookingStatus        `json:"status" db:"status"`
	PaymentStatus        *string              `json:"payment_status,omitempty" db:"payment_status"`
	PaymentGateway       *string              `json:"payment_gateway,omitempty" db:"payment_gateway"`
	PaymentID            *string              `json:"payment_id,omitempty" db:"payment_id"`
	NotServiceable       bool                 `json:"not_serviceable" db:"not_serviceable"`
	NotServiceableReason *string              `json:"not_serviceable_reason,omitempty" db:"not_serviceable_reason"`
	Notes                *string              `json:"notes,omitempty" db:"notes"`
	CreatedAt            time.Time            `json:"created_at" db:"created_at"`
	UpdatedAt            time.Time            `json:"updated_at" db:"updated_at"`
}

// Coupon - Discount codes with partner tracking
type Coupon struct {
	ID                       uuid.UUID  `json:"id" db:"id"`
	Code                     string     `json:"code" db:"code"`
	Description              *string    `json:"description,omitempty" db:"description"`
	DiscountType             string     `json:"discount_type" db:"discount_type"`
	DiscountValue            float64    `json:"discount_value" db:"discount_value"`
	MaxDiscount              *float64   `json:"max_discount,omitempty" db:"max_discount"`
	MinBookingAmount         *float64   `json:"min_booking_amount,omitempty" db:"min_booking_amount"`
	UsageLimit               *int       `json:"usage_limit,omitempty" db:"usage_limit"`
	UsageCount               int        `json:"usage_count" db:"usage_count"`
	PartnerName              *string    `json:"partner_name,omitempty" db:"partner_name"`
	PartnerCommissionPercent *float64   `json:"partner_commission_percent,omitempty" db:"partner_commission_percent"`
	IsActive                 bool       `json:"is_active" db:"is_active"`
	ValidFrom                *time.Time `json:"valid_from,omitempty" db:"valid_from"`
	ValidUntil               *time.Time `json:"valid_until,omitempty" db:"valid_until"`
	CreatedAt                time.Time  `json:"created_at" db:"created_at"`
	UpdatedAt                time.Time  `json:"updated_at" db:"updated_at"`
}

// CouponUsage - Track each coupon use
type CouponUsage struct {
	ID                uuid.UUID `json:"id" db:"id"`
	CouponID          uuid.UUID `json:"coupon_id" db:"coupon_id"`
	BookingID         uuid.UUID `json:"booking_id" db:"booking_id"`
	UserID            uuid.UUID `json:"user_id" db:"user_id"`
	DiscountApplied   float64   `json:"discount_applied" db:"discount_applied"`
	PartnerCommission *float64  `json:"partner_commission,omitempty" db:"partner_commission"`
	CommissionPaid    bool      `json:"commission_paid" db:"commission_paid"`
	CreatedAt         time.Time `json:"created_at" db:"created_at"`
}

// PricingConfig - Global pricing settings
type PricingConfig struct {
	ID                       uuid.UUID `json:"id" db:"id"`
	ConvenienceChargePercent float64   `json:"convenience_charge_percent" db:"convenience_charge_percent"`
	TripAssurancePrice       float64   `json:"trip_assurance_price" db:"trip_assurance_price"`
	MinAdvancePayment        float64   `json:"min_advance_payment" db:"min_advance_payment"`
	DefaultAdvancePayment    float64   `json:"default_advance_payment" db:"default_advance_payment"`
	MaxAdvancePayment        float64   `json:"max_advance_payment" db:"max_advance_payment"`
	UpdatedAt                time.Time `json:"updated_at" db:"updated_at"`
}

// Pagination represents pagination metadata
type Pagination struct {
	Page       int  `json:"page"`
	Limit      int  `json:"limit"`
	Total      int  `json:"total"`
	TotalPages int  `json:"total_pages"`
	HasNext    bool `json:"has_next"`
	HasPrev    bool `json:"has_prev"`
}
