-- Initial Schema Migration for BikeAtRent Platform

-- Create ENUM types
CREATE TYPE kyc_status AS ENUM ('not_submitted', 'under_review', 'verified', 'rejected');
CREATE TYPE bike_status AS ENUM ('active', 'inactive', 'maintenance');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');
CREATE TYPE app_role AS ENUM ('super_admin', 'operations_admin', 'readonly');

-- Create users table (auth)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    phone TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);

-- Create profiles table
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL DEFAULT '',
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_profiles_phone ON profiles(phone);

-- Create user_roles table
CREATE TABLE user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role app_role NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, role)
);

CREATE INDEX idx_user_roles_user_id ON user_roles(user_id);

-- Create kyc_records table
CREATE TABLE kyc_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    
    -- Driving License
    dl_status kyc_status NOT NULL DEFAULT 'not_submitted',
    dl_number TEXT,
    dl_front_image_url TEXT,
    dl_back_image_url TEXT,
    dl_verified_at TIMESTAMPTZ,
    dl_rejection_reason TEXT,
    
    -- Identity Document
    id_type TEXT,
    id_number TEXT,
    id_front_image_url TEXT,
    id_back_image_url TEXT,
    aadhaar_status kyc_status NOT NULL DEFAULT 'not_submitted',
    aadhaar_verified_at TIMESTAMPTZ,
    aadhaar_rejection_reason TEXT,
    
    -- Photo
    passport_photo_url TEXT,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_kyc_user_id ON kyc_records(user_id);

-- Create pickup_locations table
CREATE TABLE pickup_locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL DEFAULT 'Siliguri',
    location_code VARCHAR(10),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_locations_city ON pickup_locations(city);
CREATE INDEX idx_locations_is_active ON pickup_locations(is_active);

-- Create bikes table
CREATE TABLE bikes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    daily_price NUMERIC NOT NULL CHECK (daily_price > 0),
    hourly_price NUMERIC,
    security_deposit NUMERIC NOT NULL DEFAULT 3000,
    image_url TEXT,
    description TEXT,
    features TEXT[],
    status bike_status NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_bikes_status ON bikes(status);
CREATE INDEX idx_bikes_category ON bikes(category);

-- Create bike_inventory table
CREATE TABLE bike_inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bike_id UUID NOT NULL REFERENCES bikes(id) ON DELETE CASCADE,
    location_id UUID NOT NULL REFERENCES pickup_locations(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity >= 0),
    available_quantity INTEGER NOT NULL DEFAULT 1 CHECK (available_quantity >= 0),
    UNIQUE(bike_id, location_id)
);

CREATE INDEX idx_inventory_bike ON bike_inventory(bike_id);
CREATE INDEX idx_inventory_location ON bike_inventory(location_id);

-- Create accessories table
CREATE TABLE accessories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    price NUMERIC NOT NULL CHECK (price >= 0),
    image_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_accessories_is_active ON accessories(is_active);

-- Create coupons table
CREATE TABLE coupons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL UNIQUE,
    description TEXT,
    discount_type TEXT NOT NULL DEFAULT 'percentage',
    discount_value NUMERIC NOT NULL DEFAULT 0,
    max_discount NUMERIC,
    min_booking_amount NUMERIC DEFAULT 0,
    usage_limit INTEGER,
    usage_count INTEGER NOT NULL DEFAULT 0,
    partner_name TEXT,
    partner_commission_percent NUMERIC DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    valid_from TIMESTAMPTZ,
    valid_until TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_coupons_code ON coupons(code);
CREATE INDEX idx_coupons_is_active ON coupons(is_active);

-- Create booking_number_seq for auto-incrementing booking numbers
CREATE SEQUENCE booking_number_seq START 1;

-- Create bookings table
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_number TEXT,
    user_id UUID NOT NULL REFERENCES users(id),
    bike_id UUID NOT NULL REFERENCES bikes(id),
    pickup_location_id UUID NOT NULL REFERENCES pickup_locations(id),
    drop_location_id UUID NOT NULL REFERENCES pickup_locations(id),
    
    -- Timing
    pickup_datetime TIMESTAMPTZ NOT NULL,
    drop_datetime TIMESTAMPTZ NOT NULL,
    
    -- Pricing
    bike_rental_price NUMERIC NOT NULL,
    accessories_price NUMERIC DEFAULT 0,
    accessories_json JSONB,
    convenience_charges NUMERIC DEFAULT 84.75,
    trip_assurance_enabled BOOLEAN NOT NULL DEFAULT false,
    trip_assurance_price NUMERIC DEFAULT 0,
    extra_hours_charge NUMERIC DEFAULT 0,
    
    -- Pickup/Drop Service
    pickup_drop_enabled BOOLEAN NOT NULL DEFAULT false,
    pickup_enabled BOOLEAN NOT NULL DEFAULT false,
    drop_enabled BOOLEAN NOT NULL DEFAULT false,
    pickup_address TEXT,
    drop_address TEXT,
    pickup_drop_charges NUMERIC DEFAULT 0,
    
    -- Discounts
    coupon_id UUID REFERENCES coupons(id),
    coupon_code TEXT,
    coupon_discount NUMERIC DEFAULT 0,
    discount_amount NUMERIC DEFAULT 0,
    
    -- Totals
    security_deposit NUMERIC NOT NULL DEFAULT 3000,
    total_amount NUMERIC NOT NULL,
    advance_paid NUMERIC NOT NULL,
    due_at_pickup NUMERIC NOT NULL,
    
    -- Status
    status booking_status NOT NULL DEFAULT 'pending',
    payment_status TEXT DEFAULT 'pending',
    payment_gateway TEXT,
    payment_id TEXT,
    
    -- Admin flags
    not_serviceable BOOLEAN NOT NULL DEFAULT false,
    not_serviceable_reason TEXT,
    notes TEXT,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_pickup_datetime ON bookings(pickup_datetime);
CREATE INDEX idx_bookings_pickup_location ON bookings(pickup_location_id);
CREATE INDEX idx_bookings_dates ON bookings(pickup_datetime, drop_datetime);
CREATE INDEX idx_bookings_booking_number ON bookings(booking_number);

-- Create coupon_usage table
CREATE TABLE coupon_usage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    coupon_id UUID NOT NULL REFERENCES coupons(id),
    user_id UUID NOT NULL REFERENCES users(id),
    booking_id UUID REFERENCES bookings(id),
    discount_applied NUMERIC NOT NULL,
    partner_commission NUMERIC DEFAULT 0,
    commission_paid BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_coupon_usage_coupon ON coupon_usage(coupon_id);
CREATE INDEX idx_coupon_usage_user ON coupon_usage(user_id);
CREATE INDEX idx_coupon_usage_booking ON coupon_usage(booking_id);

-- Create pricing_config table
CREATE TABLE pricing_config (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    convenience_charge_percent NUMERIC NOT NULL DEFAULT 5,
    trip_assurance_price NUMERIC NOT NULL DEFAULT 199,
    min_advance_payment NUMERIC NOT NULL DEFAULT 200,
    default_advance_payment NUMERIC NOT NULL DEFAULT 500,
    max_advance_payment NUMERIC NOT NULL DEFAULT 2000,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Insert default pricing config
INSERT INTO pricing_config (id, convenience_charge_percent, trip_assurance_price, min_advance_payment, default_advance_payment, max_advance_payment)
VALUES (gen_random_uuid(), 5, 199, 200, 500, 2000);

-- Create admin_logs table for audit trail
CREATE TABLE admin_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_user_id UUID REFERENCES users(id),
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id UUID,
    details JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_admin_logs_admin ON admin_logs(admin_user_id);
CREATE INDEX idx_admin_logs_entity ON admin_logs(entity_type, entity_id);
CREATE INDEX idx_admin_logs_created ON admin_logs(created_at);

-- Function to auto-generate booking number
CREATE OR REPLACE FUNCTION generate_booking_number()
RETURNS TRIGGER AS $$
DECLARE
    location_code TEXT;
    new_seq_number INT;
BEGIN
    -- Get location code from pickup location
    SELECT COALESCE(pl.location_code, 'BR') INTO location_code
    FROM pickup_locations pl
    WHERE pl.id = NEW.pickup_location_id;
    
    IF location_code IS NULL THEN
        location_code := 'BR';
    END IF;
    
    -- Get next sequence number
    new_seq_number := nextval('booking_number_seq');
    
    -- Format: LOCCODE-YYMMDD0001
    NEW.booking_number := location_code || '-' || to_char(NOW(), 'YYMMDD') || LPAD(new_seq_number::text, 4, '0');
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate booking number
CREATE TRIGGER generate_booking_number_trigger
    BEFORE INSERT ON bookings
    FOR EACH ROW
    WHEN (NEW.booking_number IS NULL)
    EXECUTE FUNCTION generate_booking_number();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers to tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_kyc_records_updated_at BEFORE UPDATE ON kyc_records
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bikes_updated_at BEFORE UPDATE ON bikes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_coupons_updated_at BEFORE UPDATE ON coupons
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pickup_locations_updated_at BEFORE UPDATE ON pickup_locations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Comments for documentation
COMMENT ON TABLE users IS 'Authentication users table';
COMMENT ON TABLE profiles IS 'User profile information';
COMMENT ON TABLE user_roles IS 'Role-based access control';
COMMENT ON TABLE kyc_records IS 'KYC document verification status';
COMMENT ON TABLE bikes IS 'Bike catalog/master data';
COMMENT ON TABLE bike_inventory IS 'Location-based bike availability';
COMMENT ON TABLE bookings IS 'Rental bookings';
COMMENT ON TABLE coupons IS 'Discount coupons with partner tracking';
COMMENT ON TABLE coupon_usage IS 'Coupon redemption history';
COMMENT ON TABLE pricing_config IS 'Global pricing configuration';
COMMENT ON TABLE admin_logs IS 'Audit trail for admin actions';