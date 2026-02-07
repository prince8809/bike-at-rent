package repository

import (
	"context"
	"errors"
	"fmt"

	"bike-at-rent/models"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type UserRepository struct {
	db *pgxpool.Pool
}

func NewUserRepository(db *pgxpool.Pool) *UserRepository {
	return &UserRepository{db: db}
}

// CreateUser creates a new auth user
func (r *UserRepository) CreateUser(ctx context.Context, email, passwordHash string, phone *string) (*models.User, error) {
	user := &models.User{
		ID:           uuid.New(),
		Email:        email,
		PasswordHash: passwordHash,
		Phone:        phone,
	}

	query := `
		INSERT INTO users (id, email, password_hash, phone, created_at, updated_at)
		VALUES ($1, $2, $3, $4, NOW(), NOW())
		RETURNING created_at, updated_at
	`

	err := r.db.QueryRow(ctx, query, user.ID, user.Email, user.PasswordHash, user.Phone).
		Scan(&user.CreatedAt, &user.UpdatedAt)

	if err != nil {
		return nil, fmt.Errorf("failed to create user: %w", err)
	}

	return user, nil
}

// GetUserByEmail retrieves user by email
func (r *UserRepository) GetUserByEmail(ctx context.Context, email string) (*models.User, error) {
	user := &models.User{}

	query := `
		SELECT id, email, password_hash, phone, created_at, updated_at
		FROM users
		WHERE email = $1
	`

	err := r.db.QueryRow(ctx, query, email).Scan(
		&user.ID,
		&user.Email,
		&user.PasswordHash,
		&user.Phone,
		&user.CreatedAt,
		&user.UpdatedAt,
	)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, nil
		}
		return nil, fmt.Errorf("failed to get user by email: %w", err)
	}

	return user, nil
}

// GetUserByPhone retrieves user by phone
func (r *UserRepository) GetUserByPhone(ctx context.Context, phone string) (*models.User, error) {
	user := &models.User{}

	query := `
		SELECT id, email, password_hash, phone, created_at, updated_at
		FROM users
		WHERE phone = $1
	`

	err := r.db.QueryRow(ctx, query, phone).Scan(
		&user.ID,
		&user.Email,
		&user.PasswordHash,
		&user.Phone,
		&user.CreatedAt,
		&user.UpdatedAt,
	)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, nil
		}
		return nil, fmt.Errorf("failed to get user by phone: %w", err)
	}

	return user, nil
}

// GetUserByID retrieves user by ID
func (r *UserRepository) GetUserByID(ctx context.Context, userID uuid.UUID) (*models.User, error) {
	user := &models.User{}

	query := `
		SELECT id, email, password_hash, phone, created_at, updated_at
		FROM users
		WHERE id = $1
	`

	err := r.db.QueryRow(ctx, query, userID).Scan(
		&user.ID,
		&user.Email,
		&user.PasswordHash,
		&user.Phone,
		&user.CreatedAt,
		&user.UpdatedAt,
	)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, nil
		}
		return nil, fmt.Errorf("failed to get user by ID: %w", err)
	}

	return user, nil
}

// UpdateUserPassword updates user password
func (r *UserRepository) UpdateUserPassword(ctx context.Context, userID uuid.UUID, passwordHash string) error {
	query := `
		UPDATE users
		SET password_hash = $1, updated_at = NOW()
		WHERE id = $2
	`

	_, err := r.db.Exec(ctx, query, passwordHash, userID)
	if err != nil {
		return fmt.Errorf("failed to update password: %w", err)
	}

	return nil
}

// CreateProfile creates a new user profile
func (r *UserRepository) CreateProfile(ctx context.Context, userID uuid.UUID, name, email, phone string) (*models.Profile, error) {
	profile := &models.Profile{
		ID:     uuid.New(),
		UserID: userID,
		Name:   name,
		Email:  email,
		Phone:  phone,
	}

	query := `
		INSERT INTO profiles (id, user_id, name, email, phone, created_at, updated_at)
		VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
		RETURNING created_at, updated_at
	`

	err := r.db.QueryRow(ctx, query, profile.ID, profile.UserID, profile.Name, profile.Email, profile.Phone).
		Scan(&profile.CreatedAt, &profile.UpdatedAt)

	if err != nil {
		return nil, fmt.Errorf("failed to create profile: %w", err)
	}

	return profile, nil
}

// GetProfileByUserID retrieves profile by user ID
func (r *UserRepository) GetProfileByUserID(ctx context.Context, userID uuid.UUID) (*models.Profile, error) {
	profile := &models.Profile{}

	query := `
		SELECT id, user_id, name, email, phone, address, avatar_url, created_at, updated_at
		FROM profiles
		WHERE user_id = $1
	`

	err := r.db.QueryRow(ctx, query, userID).Scan(
		&profile.ID,
		&profile.UserID,
		&profile.Name,
		&profile.Email,
		&profile.Phone,
		&profile.Address,
		&profile.AvatarURL,
		&profile.CreatedAt,
		&profile.UpdatedAt,
	)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, nil
		}
		return nil, fmt.Errorf("failed to get profile: %w", err)
	}

	return profile, nil
}

// GetProfileByPhone retrieves profile by phone number
func (r *UserRepository) GetProfileByPhone(ctx context.Context, phone string) (*models.Profile, error) {
	profile := &models.Profile{}

	query := `
		SELECT id, user_id, name, email, phone, address, avatar_url, created_at, updated_at
		FROM profiles
		WHERE phone = $1
	`

	err := r.db.QueryRow(ctx, query, phone).Scan(
		&profile.ID,
		&profile.UserID,
		&profile.Name,
		&profile.Email,
		&profile.Phone,
		&profile.Address,
		&profile.AvatarURL,
		&profile.CreatedAt,
		&profile.UpdatedAt,
	)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, nil
		}
		return nil, fmt.Errorf("failed to get profile by phone: %w", err)
	}

	return profile, nil
}

// UpdateProfile updates user profile
func (r *UserRepository) UpdateProfile(ctx context.Context, userID uuid.UUID, name, email string, address *string) error {
	query := `
		UPDATE profiles
		SET name = $1, email = $2, address = $3, updated_at = NOW()
		WHERE user_id = $4
	`

	_, err := r.db.Exec(ctx, query, name, email, address, userID)
	if err != nil {
		return fmt.Errorf("failed to update profile: %w", err)
	}

	return nil
}

// CreateKYCRecord creates a new KYC record for user
func (r *UserRepository) CreateKYCRecord(ctx context.Context, userID uuid.UUID) error {
	query := `
		INSERT INTO kyc_records (id, user_id, dl_status, aadhaar_status, created_at, updated_at)
		VALUES ($1, $2, $3, $4, NOW(), NOW())
	`

	_, err := r.db.Exec(ctx, query, uuid.New(), userID, models.KYCNotSubmitted, models.KYCNotSubmitted)
	if err != nil {
		return fmt.Errorf("failed to create KYC record: %w", err)
	}

	return nil
}

// GetUserRoles retrieves all roles for a user
func (r *UserRepository) GetUserRoles(ctx context.Context, userID uuid.UUID) ([]models.AppRole, error) {
	query := `
		SELECT role
		FROM user_roles
		WHERE user_id = $1
	`

	rows, err := r.db.Query(ctx, query, userID)
	if err != nil {
		return nil, fmt.Errorf("failed to get user roles: %w", err)
	}
	defer rows.Close()

	var roles []models.AppRole
	for rows.Next() {
		var role models.AppRole
		if err := rows.Scan(&role); err != nil {
			return nil, fmt.Errorf("failed to scan role: %w", err)
		}
		roles = append(roles, role)
	}

	return roles, nil
}

// AddUserRole adds a role to user
func (r *UserRepository) AddUserRole(ctx context.Context, userID uuid.UUID, role models.AppRole) error {
	query := `
		INSERT INTO user_roles (id, user_id, role, created_at)
		VALUES ($1, $2, $3, NOW())
		ON CONFLICT (user_id, role) DO NOTHING
	`

	_, err := r.db.Exec(ctx, query, uuid.New(), userID, role)
	if err != nil {
		return fmt.Errorf("failed to add user role: %w", err)
	}

	return nil
}

// IsAdmin checks if user has admin role
func (r *UserRepository) IsAdmin(ctx context.Context, userID uuid.UUID) (bool, error) {
	query := `
		SELECT EXISTS(
			SELECT 1 FROM user_roles
			WHERE user_id = $1
			AND role IN ('super_admin', 'operations_admin')
		)
	`

	var isAdmin bool
	err := r.db.QueryRow(ctx, query, userID).Scan(&isAdmin)
	if err != nil {
		return false, fmt.Errorf("failed to check admin status: %w", err)
	}

	return isAdmin, nil
}

// GetKYCByUserID retrieves KYC record by user ID
func (r *UserRepository) GetKYCByUserID(ctx context.Context, userID uuid.UUID) (*models.KYCRecord, error) {
	kyc := &models.KYCRecord{}

	query := `
		SELECT id, user_id, dl_status, dl_number, dl_front_image_url, dl_back_image_url,
		       dl_verified_at, dl_rejection_reason, id_type, id_number, id_front_image_url,
		       id_back_image_url, aadhaar_status, aadhaar_verified_at, aadhaar_rejection_reason,
		       passport_photo_url, created_at, updated_at
		FROM kyc_records
		WHERE user_id = $1
	`

	err := r.db.QueryRow(ctx, query, userID).Scan(
		&kyc.ID,
		&kyc.UserID,
		&kyc.DLStatus,
		&kyc.DLNumber,
		&kyc.DLFrontImageURL,
		&kyc.DLBackImageURL,
		&kyc.DLVerifiedAt,
		&kyc.DLRejectionReason,
		&kyc.IDType,
		&kyc.IDNumber,
		&kyc.IDFrontImageURL,
		&kyc.IDBackImageURL,
		&kyc.AadhaarStatus,
		&kyc.AadhaarVerifiedAt,
		&kyc.AadhaarRejectionReason,
		&kyc.PassportPhotoURL,
		&kyc.CreatedAt,
		&kyc.UpdatedAt,
	)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, nil
		}
		return nil, fmt.Errorf("failed to get KYC record: %w", err)
	}

	return kyc, nil
}
