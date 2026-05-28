#!/bin/bash

# Backend startup script with clear logging

set -e

PROJECT_DIR="/Users/narinder/Personal/roadmap"
cd "$PROJECT_DIR"

clear

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                  STARTING BACKEND SERVER                       ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Check if MongoDB is running
echo "📡 Checking MongoDB connection..."
if ! mongosh --eval "db.adminCommand('ping')" > /dev/null 2>&1; then
  echo "❌ MongoDB is NOT running!"
  echo ""
  echo "💡 Start MongoDB with this command:"
  echo "   mongod --dbpath ~/mongodb-data"
  echo ""
  exit 1
fi

echo "✅ MongoDB is running"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install > /dev/null 2>&1
  echo "✅ Dependencies installed"
  echo ""
fi

# Start the backend server
echo "🚀 Starting backend server..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

node server/index.js

# If we get here, server crashed
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "❌ Server exited unexpectedly!"
echo ""
exit 1
