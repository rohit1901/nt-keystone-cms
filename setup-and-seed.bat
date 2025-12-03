@echo off
REM ============================================================================
REM Keystone CMS - Setup and Seed Script (Windows)
REM ============================================================================
REM
REM This script automates the process of setting up the database and seeding it
REM with demo data after schema changes.
REM
REM Usage:
REM   setup-and-seed.bat           Full setup and seed
REM   setup-and-seed.bat --quick   Skip Prisma regeneration
REM   setup-and-seed.bat --fresh   Delete database and start fresh
REM

setlocal EnableDelayedExpansion

REM Parse arguments
set FRESH_START=0
set QUICK_MODE=0

:parse_args
if "%~1"=="" goto :main
if /i "%~1"=="--fresh" (
    set FRESH_START=1
    shift
    goto :parse_args
)
if /i "%~1"=="--quick" (
    set QUICK_MODE=1
    shift
    goto :parse_args
)
if /i "%~1"=="--help" goto :help
if /i "%~1"=="-h" goto :help

echo Unknown option: %~1
echo Use --help for usage information
exit /b 1

:help
echo Usage: setup-and-seed.bat [OPTIONS]
echo.
echo Options:
echo   --fresh    Delete database and start fresh
echo   --quick    Skip Prisma client regeneration
echo   --help     Show this help message
echo.
exit /b 0

:main
echo.
echo ============================================================================
echo   Keystone CMS - Setup and Seed
echo ============================================================================
echo.

REM Step 1: Fresh start if requested
if %FRESH_START%==1 (
    echo [INFO] Performing fresh database setup...

    if exist "keystone.db" (
        echo [INFO] Backing up existing database...
        for /f "tokens=2-4 delims=/ " %%a in ('date /t') do (set mydate=%%c%%a%%b)
        for /f "tokens=1-2 delims=/:" %%a in ('time /t') do (set mytime=%%a%%b)
        move "keystone.db" "keystone.db.backup.!mydate!_!mytime!"
        echo [SUCCESS] Database backed up
    )

    if exist ".keystone" (
        echo [INFO] Removing .keystone directory...
        rmdir /s /q ".keystone"
        echo [SUCCESS] .keystone directory removed
    )

    echo [SUCCESS] Fresh start preparation complete
)

REM Step 2: Check for node_modules
if not exist "node_modules" (
    echo [WARNING] node_modules not found. Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo [ERROR] Failed to install dependencies
        exit /b 1
    )
    echo [SUCCESS] Dependencies installed
)

REM Step 3: Regenerate Prisma Client (unless quick mode)
if %QUICK_MODE%==0 (
    echo.
    echo ============================================================================
    echo   Step 1: Regenerating Prisma Client
    echo ============================================================================
    echo.

    if exist "node_modules\.prisma" (
        echo [INFO] Removing old Prisma client cache...
        rmdir /s /q "node_modules\.prisma"
        echo [SUCCESS] Prisma client cache removed
    ) else (
        echo [INFO] No Prisma client cache found
    )

    echo [INFO] Generating Prisma client from schema...
    call npx prisma generate --schema=./schema.prisma
    if errorlevel 1 (
        echo [ERROR] Failed to generate Prisma client
        echo [INFO] Try running: npm run keystone dev
        exit /b 1
    )
    echo [SUCCESS] Prisma client generated successfully
) else (
    echo [WARNING] Skipping Prisma client regeneration (quick mode)
)

REM Step 4: Ensure database exists
echo.
echo ============================================================================
echo   Step 2: Checking Database
echo ============================================================================
echo.

if not exist "keystone.db" (
    echo [INFO] Database not found. Creating new database...
    echo [WARNING] You need to run 'npm run keystone dev' first to create the database
    echo [INFO] After the server starts and migrations complete, press Ctrl+C
    echo [INFO] Then run this script again
    echo.
    echo Press any key to start Keystone server...
    pause > nul
    call npm run keystone dev
    echo.
    echo [INFO] Keystone server stopped. Run this script again to seed the database.
    exit /b 0
) else (
    echo [SUCCESS] Database found
)

REM Step 5: Run seed script
echo.
echo ============================================================================
echo   Step 3: Seeding Database
echo ============================================================================
echo.

echo [INFO] Running seed script...
call npx ts-node seed.ts
if errorlevel 1 (
    echo [ERROR] Seed script failed
    echo [INFO] Check the error messages above
    exit /b 1
)
echo [SUCCESS] Database seeded successfully

REM Step 6: Summary
echo.
echo ============================================================================
echo   Setup Complete!
echo ============================================================================
echo.
echo [SUCCESS] Prisma Client: Regenerated
echo [SUCCESS] Database: Ready
echo [SUCCESS] Seed Data: Loaded
echo.
echo Next steps:
echo   1. Start Keystone Admin UI:
echo      npm run keystone dev
echo.
echo   2. Open your browser:
echo      http://localhost:3000
echo.
echo   3. Check the seeded content in the Admin UI
echo.
echo Troubleshooting:
echo   - If you see TypeScript errors, restart your IDE
echo   - If seed fails, try: setup-and-seed.bat --fresh
echo   - For help: setup-and-seed.bat --help
echo.
echo [SUCCESS] All done! Happy coding! 🚀
echo.

exit /b 0
