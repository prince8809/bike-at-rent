#!/bin/bash

# Database Migration Runner for BikeAtRent Backend
# Usage: ./migrate.sh up|down|create <name>

set -e

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "Error: DATABASE_URL environment variable is not set"
    echo "Please create a .env file with DATABASE_URL"
    exit 1
fi

MIGRATIONS_DIR="migrations"

# Function to run migrations up
migrate_up() {
    echo "Running migrations up..."
    for file in $(ls $MIGRATIONS_DIR/*.up.sql | sort); do
        echo "Applying: $file"
        psql "$DATABASE_URL" -f "$file"
    done
    echo "✓ All migrations applied successfully"
}

# Function to run migrations down
migrate_down() {
    echo "Running migrations down..."
    for file in $(ls $MIGRATIONS_DIR/*.down.sql | sort -r); do
        echo "Rolling back: $file"
        psql "$DATABASE_URL" -f "$file"
    done
    echo "✓ All migrations rolled back successfully"
}

# Function to create a new migration
create_migration() {
    if [ -z "$1" ]; then
        echo "Error: Migration name is required"
        echo "Usage: ./migrate.sh create <migration_name>"
        exit 1
    fi
    
    timestamp=$(date +%Y%m%d%H%M%S)
    name=$1
    up_file="$MIGRATIONS_DIR/${timestamp}_${name}.up.sql"
    down_file="$MIGRATIONS_DIR/${timestamp}_${name}.down.sql"
    
    echo "-- Migration: $name (up)" > "$up_file"
    echo "" >> "$up_file"
    
    echo "-- Migration: $name (down)" > "$down_file"
    echo "" >> "$down_file"
    
    echo "✓ Created migration files:"
    echo "  - $up_file"
    echo "  - $down_file"
}

# Main script logic
case "$1" in
    up)
        migrate_up
        ;;
    down)
        migrate_down
        ;;
    create)
        create_migration "$2"
        ;;
    *)
        echo "Usage: ./migrate.sh {up|down|create <name>}"
        echo ""
        echo "Commands:"
        echo "  up      - Apply all pending migrations"
        echo "  down    - Rollback all migrations"
        echo "  create  - Create a new migration file"
        exit 1
        ;;
esac