# 🚀 Quick Start Guide

## Prerequisites

- Node.js installed
- MongoDB installed (run `brew install mongodb-community` if needed)

## One-Command Start (Recommended)

```bash
chmod +x start-dev.sh
./start-dev.sh
```

This will:

1. Start MongoDB
2. Start backend server on port 5000
3. Start frontend dev server on port 5173

## Manual Start (3 terminals)

**Terminal 1: Start MongoDB**

```bash
mongod --dbpath ~/mongodb-data
```

**Terminal 2: Start Backend**

```bash
npm run server
```

**Terminal 3: Start Frontend**

```bash
npm run dev
```

## Access the App

- **Frontend**: http://localhost:5173
- **Backend Health**: http://localhost:5000/api/health

## How It Works

1. You toggle a checkbox in the frontend
2. Frontend sends request to `http://localhost:5000/api/progress/toggle`
3. Backend saves to MongoDB
4. On page reload, data is retrieved from MongoDB
5. **No localStorage needed!** ✅

## Configuration

All configuration is in `.env` and `.env.local`:

```
.env:                           .env.local:
MONGODB_URI=mongodb://...       VITE_USE_API=true
PORT=5000
```

## Database

MongoDB stores your data in: `mongodb://localhost:27017/roadmap-dev`

To explore data:

```bash
mongosh
use roadmap-dev
db.progresses.find().pretty()
```

## Troubleshooting

**Port 5000 already in use?**

```bash
# Find and kill process using port 5000
lsof -i :5000
kill <PID>
```

**Port 5173 already in use?**

```bash
# Change in vite.config.js or let Vite pick another port
```

**MongoDB connection error?**

```bash
# Make sure MongoDB is running:
mongod --version  # Check if installed
mongosh            # Test connection
```

---

**Happy coding!** 🎉
