-- Rollback initial schema migration

-- Drop triggers
DROP TRIGGER IF EXISTS update_pickup_locations_updated_at ON pickup_locations;
DROP TRIGGER IF EXISTS update_coupons_updated_at ON coupons;
DROP TRIGGER IF EXISTS update_bookings_updated_at ON bookings;
DROP TRIGGER IF EXISTS update_bikes_updated_at ON bikes;
DROP TRIGGER IF EXISTS update_kyc_records_updated_at ON kyc_records;
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
DROP TRIGGER IF EXISTS generate_booking_number_trigger ON bookings;

-- Drop functions
DROP FUNCTION IF EXISTS update_updated_at_column();
DROP FUNCTION IF EXISTS generate_booking_number();

-- Drop tables (in reverse order of dependencies)
DROP TABLE IF EXISTS admin_logs;
DROP TABLE IF EXISTS coupon_usage;
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS bike_inventory;
DROP TABLE IF EXISTS accessories;
DROP TABLE IF EXISTS coupons;
DROP TABLE IF EXISTS bikes;
DROP TABLE IF EXISTS pickup_locations;
DROP TABLE IF EXISTS kyc_records;
DROP TABLE IF EXISTS user_roles;
DROP TABLE IF EXISTS profiles;
DROP TABLE IF EXISTS users;

-- Drop sequences
DROP SEQUENCE IF EXISTS booking_number_seq;

-- Drop ENUM types
DROP TYPE IF EXISTS app_role;
DROP TYPE IF EXISTS booking_status;
DROP TYPE IF EXISTS bike_status;
DROP TYPE IF EXISTS kyc_status;