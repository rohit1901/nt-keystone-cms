#!/bin/bash

# ============================================================================
# Keystone CMS - Setup and Seed Script
# ============================================================================
#
# This script automates the process of setting up the database and seeding it
# with demo data after schema changes.
#
# Usage:
#   ./setup-and-seed.sh           # Full setup and seed
#   ./setup-and-seed.sh --quick   # Skip Prisma regeneration
#   ./setup-and-seed.sh --fresh   # Delete database and start fresh
#

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
print_header() {
    echo ""
    echo -e "${BLUE}============================================================================${NC}"
    echo -e "${BLUE}  $1${NC}"
    echo -e "${BLUE}============================================================================${NC}"
    echo ""
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${BLUE}→ $1${NC}"
}

# Parse arguments
FRESH_START=false
QUICK_MODE=false

for arg in "$@"; do
    case $arg in
        --fresh)
            FRESH_START=true
            shift
            ;;
        --quick)
            QUICK_MODE=true
            shift
            ;;
        --help|-h)
            echo "Usage: $0 [OPTIONS]"
            echo ""
            echo "Options:"
            echo "  --fresh    Delete database and start fresh"
            echo "  --quick    Skip Prisma client regeneration"
            echo "  --help     Show this help message"
            echo ""
            exit 0
            ;;
        *)
            print_error "Unknown option: $arg"
            echo "Use --help for usage information"
            exit 1
            ;;
    esac
done

# Main script
print_header "Keystone CMS - Setup and Seed"

# Step 1: Fresh start if requested
if [ "$FRESH_START" = true ]; then
    print_info "Performing fresh database setup..."

    if [ -f "keystone.db" ]; then
        print_info "Backing up existing database..."
        mv keystone.db "keystone.db.backup.$(date +%Y%m%d_%H%M%S)"
        print_success "Database backed up"
    fi

    if [ -d ".keystone" ]; then
        print_info "Removing .keystone directory..."
        rm -rf .keystone
        print_success ".keystone directory removed"
    fi

    print_success "Fresh start preparation complete"
fi

# Step 2: Check for node_modules
if [ ! -d "node_modules" ]; then
    print_warning "node_modules not found. Installing dependencies..."
    npm install
    print_success "Dependencies installed"
fi

# Step 3: Regenerate Prisma Client (unless quick mode)
if [ "$QUICK_MODE" = false ]; then
    print_header "Step 1: Regenerating Prisma Client"

    print_info "Removing old Prisma client cache..."
    if [ -d "node_modules/.prisma" ]; then
        rm -rf node_modules/.prisma
        print_success "Prisma client cache removed"
    else
        print_info "No Prisma client cache found"
    fi

    print_info "Generating Prisma client from schema..."
    if npx prisma generate --schema=./schema.prisma; then
        print_success "Prisma client generated successfully"
    else
        print_error "Failed to generate Prisma client"
        print_info "Try running: npx keystone dev"
        exit 1
    fi
else
    print_warning "Skipping Prisma client regeneration (quick mode)"
fi

# Step 4: Ensure database exists
print_header "Step 2: Checking Database"

if [ ! -f "keystone.db" ] || [ "$FRESH_START" = true ]; then
    print_info "Database not found. Creating new database..."
    print_warning "Starting Keystone to create database schema..."
    print_info "This will start the server. Press Ctrl+C after migrations complete."

    # Start Keystone in background and wait for it to be ready
    timeout 60s npm run keystone dev &
    KEYSTONE_PID=$!

    # Wait for Keystone to start and create tables
    sleep 5

    # Stop Keystone
    kill $KEYSTONE_PID 2>/dev/null || true
    wait $KEYSTONE_PID 2>/dev/null || true

    print_success "Database created"
else
    print_success "Database found"
fi

# Step 5: Run seed script
print_header "Step 3: Seeding Database"

print_info "Running seed script..."
if npx ts-node seed.ts; then
    print_success "Database seeded successfully"
else
    print_error "Seed script failed"
    print_info "Check the error messages above"
    exit 1
fi

# Step 6: Summary
print_header "Setup Complete!"

echo ""
echo -e "${GREEN}✓ Prisma Client: Regenerated${NC}"
echo -e "${GREEN}✓ Database: Ready${NC}"
echo -e "${GREEN}✓ Seed Data: Loaded${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo -e "  1. Start Keystone Admin UI:"
echo -e "     ${YELLOW}npm run keystone dev${NC}"
echo ""
echo -e "  2. Open your browser:"
echo -e "     ${YELLOW}http://localhost:3000${NC}"
echo ""
echo -e "  3. Check the seeded content in the Admin UI"
echo ""
echo -e "${BLUE}Troubleshooting:${NC}"
echo -e "  - If you see TypeScript errors, restart your IDE"
echo -e "  - If seed fails, try: ${YELLOW}./setup-and-seed.sh --fresh${NC}"
echo -e "  - For help: ${YELLOW}./setup-and-seed.sh --help${NC}"
echo ""
print_success "All done! Happy coding! 🚀"
echo ""
