#!/bin/bash

# Kill any existing processes
pkill -f "node server" || true
pkill -f "mongod" || true
sleep 1

# Create MongoDB data directory if it doesn't exist
mkdir -p ~/mongodb-data

echo "🚀 Starting MongoDB..."
mongod --dbpath ~/mongodb-data > /tmp/mongodb.log 2>&1 &
MONGO_PID=$!
sleep 2

echo "✅ MongoDB running (PID: $MONGO_PID)"

echo "🚀 Starting Backend Server..."
cd /Users/narinder/Personal/roadmap
node server/index.js > /tmp/server.log 2>&1 &
SERVER_PID=$!
sleep 2

echo "✅ Server running (PID: $SERVER_PID)"

echo "🚀 Starting Frontend Dev Server..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "╔════════════════════════════════════════════╗"
echo "║  Full Stack Running Successfully! 🎉      ║"
echo "╠════════════════════════════════════════════╣"
echo "║  MongoDB:  mongodb://localhost:27017       ║"
echo "║  Backend:  http://localhost:5000           ║"
echo "║  Frontend: http://localhost:5173           ║"
echo "╠════════════════════════════════════════════╣"
echo "║  Frontend API Mode: VITE_USE_API=true      ║"
echo "║  Data Storage: MongoDB                      ║"
echo "╚════════════════════════════════════════════╝"
echo ""
echo "Press Ctrl+C to stop all services"

wait $FRONTEND_PID
