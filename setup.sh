#!/bin/bash
# Quick start script for the project

echo "🚀 FirstSaaS Prototype - Quick Start"
echo "===================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"

# Install backend dependencies
echo ""
echo "📦 Installing backend dependencies..."
cd source_code
npm install

# Install frontend dependencies
echo ""
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ../..

# Copy environment files if not present
if [ ! -f ".env" ]; then
    echo ""
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please update .env with your configuration"
fi

if [ ! -f "source_code/backend/.env" ]; then
    echo "📝 Creating backend .env file..."
    cp source_code/backend/.env.example source_code/backend/.env
fi

# Run tests
echo ""
echo "🧪 Running tests..."
cd source_code
npm test

echo ""
echo "✅ Setup complete!"
echo ""
echo "📖 Next steps:"
echo "  1. Update .env files with your configuration"
echo "  2. Start backend: cd source_code && npm run dev"
echo "  3. Start frontend: cd source_code/frontend && npm run dev"
echo "  4. Open http://localhost:5173 in your browser"
echo ""
