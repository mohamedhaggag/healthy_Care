@echo off
echo Starting HealthyCare Development Server...
echo.

REM Check if node_modules exists, if not install dependencies
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo Failed to install dependencies. Please check your npm installation.
        pause
        exit /b 1
    )
    echo.
) else (
    REM node_modules exists, but may be incomplete (e.g., missing backend deps like express)
    if not exist "node_modules\\express" (
        echo node_modules exists but dependencies look incomplete. Installing dependencies...
        call npm install
        if errorlevel 1 (
            echo Failed to install dependencies. Please check your npm installation.
            pause
            exit /b 1
        )
        echo.
    )
)

REM Start the development server(s)
echo Starting HealthyCare (Vite + AI Server)...
echo.
npm run dev:full

REM Note: The server runs continuously, so pause won't execute until server stops
pause

