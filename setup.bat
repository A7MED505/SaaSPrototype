@echo off
REM Quick start script for the project (Windows)

echo 🚀 FirstSaaS Prototype - Quick Start
echo ====================================

REM Check if Node.js is installed
where node >nul 2>nul
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 18+
    exit /b 1
)

echo ✅ Node.js version:
node --version

echo ✅ npm version:
npm --version

REM Install backend dependencies
echo.
echo 📦 Installing backend dependencies...
cd source_code
call npm install

REM Install frontend dependencies
echo.
echo 📦 Installing frontend dependencies...
cd frontend
call npm install
cd ..\..

REM Copy environment files if not present
if not exist ".env" (
    echo.
    echo 📝 Creating .env file...
    copy .env.example .env
    echo ⚠️  Please update .env with your configuration
)

if not exist "source_code\backend\.env" (
    echo 📝 Creating backend .env file...
    copy source_code\backend\.env.example source_code\backend\.env
)

REM Run tests
echo.
echo 🧪 Running tests...
cd source_code
call npm test
cd ..

echo.
echo ✅ Setup complete!
echo.
echo 📖 Next steps:
echo   1. Update .env files with your configuration
echo   2. Start backend: cd source_code ^&^& npm run dev
echo   3. Start frontend: cd source_code\frontend ^&^& npm run dev
echo   4. Open http://localhost:5173 in your browser
echo.
pause
