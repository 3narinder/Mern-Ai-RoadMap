#!/bin/bash

# Frontend startup script with clear logging

set -e

PROJECT_DIR="/Users/narinder/Personal/roadmap"
cd "$PROJECT_DIR"

clear

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                  STARTING FRONTEND DEV SERVER                  ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Check if backend is running
echo "🔍 Checking backend connection..."
if curl -s http://localhost:5000/api/health > /dev/null 2>&1; then
  echo "✅ Backend is running (http://localhost:5000)"
else
  echo "⚠️  Backend is NOT running yet"
  echo "💡 Start backend with: ./backend.sh"
  echo ""
fi

echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install > /dev/null 2>&1
  echo "✅ Dependencies installed"
  echo ""
fi

# Check .env.local
if [ ! -f ".env.local" ]; then
  echo "📝 Creating .env.local..."
  echo "VITE_USE_API=true" > .env.local
  echo "✅ .env.local created"
  echo ""
fi

# Start the frontend dev server
echo "🚀 Starting frontend dev server..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

npm run dev

# If we get here, server crashed
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "❌ Frontend exited unexpectedly!"
echo ""
exit 1
