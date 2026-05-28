#!/bin/bash

# Combined startup script for full development environment

PROJECT_DIR="/Users/narinder/Personal/roadmap"
cd "$PROJECT_DIR"

clear

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║           STARTING FULL DEVELOPMENT ENVIRONMENT                ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Create mongodb data directory if it doesn't exist
mkdir -p ~/mongodb-data

# Kill any existing processes
echo "🧹 Cleaning up existing processes..."
ps aux | grep "mongod" | grep -v grep | awk '{print $2}' | xargs kill 2>/dev/null || true
ps aux | grep "node server" | grep -v grep | awk '{print $2}' | xargs kill 2>/dev/null || true
sleep 1
echo "✅ Cleanup complete"
echo ""

# Start MongoDB
echo "🚀 Starting MongoDB..."
mongod --dbpath ~/mongodb-data > /tmp/mongodb.log 2>&1 &
MONGO_PID=$!
sleep 2

if ! kill -0 $MONGO_PID 2>/dev/null; then
  echo "❌ MongoDB failed to start!"
  cat /tmp/mongodb.log
  exit 1
fi

echo "✅ MongoDB started (PID: $MONGO_PID)"
echo ""

# Start Backend
echo "🚀 Starting Backend Server..."
node server/index.js > /tmp/server.log 2>&1 &
SERVER_PID=$!
sleep 2

if ! kill -0 $SERVER_PID 2>/dev/null; then
  echo "❌ Backend failed to start!"
  cat /tmp/server.log
  kill $MONGO_PID
  exit 1
fi

echo "✅ Backend started (PID: $SERVER_PID)"
echo ""

# Start Frontend
echo "🚀 Starting Frontend Dev Server..."
echo ""
npm run dev &
FRONTEND_PID=$!

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║         FULL STACK RUNNING SUCCESSFULLY! 🎉                   ║"
echo "╠════════════════════════════════════════════════════════════════╣"
echo "║  Frontend: http://localhost:5173                              ║"
echo "║  Backend:  http://localhost:5000                              ║"
echo "║  MongoDB:  mongodb://localhost:27017/roadmap-dev              ║"
echo "╠════════════════════════════════════════════════════════════════╣"
echo "║  All logs printed to console above                             ║"
echo "║  Press Ctrl+C to stop all services                            ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Wait for all processes
wait

# Cleanup on exit
echo ""
echo "🛑 Stopping all services..."
kill $MONGO_PID $SERVER_PID $FRONTEND_PID 2>/dev/null || true
echo "✅ All services stopped"
