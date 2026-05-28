# 🚀 Vercel Deployment Guide

## What I've Set Up

✅ **vercel.json** - Vercel configuration  
✅ **api/progress.js** - Serverless backend handler  
✅ **.env.production** - Production environment variables  
✅ **vite.config.js** - Updated Vite config  
✅ **storage-adaptor.js** - Auto-detects local vs production

---

## 🎯 Step-by-Step Deployment

### Step 1: Prepare MongoDB Atlas (5 minutes)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Network Access" → "IP Whitelist"
3. Click "Add IP Address" → "Allow Access from Anywhere" → Confirm
4. Copy your connection string (should look like):
   ```
   mongodb+srv://username:password@cluster.mongodb.net/?appName=Cluster0
   ```

**Store this safely!** You'll need it in Step 3.

---

### Step 2: Push to GitHub

```bash
# From your project root
git add .
git commit -m "Setup Vercel deployment"
git push origin main
```

---

### Step 3: Deploy on Vercel

1. **Go to** [vercel.com](https://vercel.com)
2. **Sign in** with GitHub
3. **Click** "Add New Project"
4. **Select** your `Mern-Ai-RoadMap` repository
5. **Configure Project:**
   - Framework Preset: "Vite" ✓
   - Root Directory: "./" ✓
   - Build Command: "npm run build" ✓
   - Output Directory: "dist" ✓
   - **IMPORTANT → Click "Environment Variables"**

6. **Add Environment Variables** (in Vercel Dashboard):

   ```
   MONGODB_URI = mongodb+srv://username:password@cluster...
   NODE_ENV = production
   VITE_USE_API = true
   ```

   Click "Add" for each one.

7. **Click "Deploy"** 🎉

---

## 📋 After Deployment

### Test Your Deployment

```bash
# Your frontend URL (Vercel will show it)
https://your-app-name.vercel.app

# Test health endpoint
https://your-app-name.vercel.app/api/health
```

### If You Get CORS Error

1. Go to Vercel Dashboard → Your Project → Settings
2. Look at your actual deployment URL
3. Update the CORS origin in storage-adaptor.js (if needed)

---

## 🔗 API Endpoints After Deployment

All these will work automatically:

- `GET /api/health` - Health check
- `GET /api/progress?userId=...` - Get progress
- `PUT /api/progress` - Save progress
- `POST /api/progress/toggle` - Toggle item
- `DELETE /api/progress?userId=...` - Clear progress

---

## 🐛 Troubleshooting

| Problem                         | Solution                                                                  |
| ------------------------------- | ------------------------------------------------------------------------- |
| **"Cannot connect to MongoDB"** | Check MongoDB Atlas IP whitelist. Add `0.0.0.0/0` or use private endpoint |
| **"CORS error"**                | Vercel auto-proxies `/api/*` - should just work                           |
| **"502 Bad Gateway"**           | Check Vercel logs (Deployments → Click latest → Logs)                     |
| **"Build failed"**              | Run `npm run build` locally to debug                                      |
| **"Data not saving"**           | Check if `VITE_USE_API=true` is set in env variables                      |

---

## 📊 File Structure After Setup

```
your-repo/
├── api/
│   └── progress.js           ← Vercel serverless handler
├── server/                   ← Shared Express config
├── src/                      ← React frontend
├── dist/                     ← Built files (auto-deployed)
├── vite.config.js            ← Updated with VITE_API_URL
├── vercel.json               ← Vercel config
├── .env.production           ← Production env vars
└── package.json
```

---

## ✨ What Happens on Deploy

1. **Vercel receives your code**
2. **Runs `npm run build`** → creates `dist/` folder
3. **Deploys `dist/` as frontend** → served at `your-app.vercel.app`
4. **Deploys `api/progress.js` as serverless function** → `/api/progress/*` endpoints
5. **All API calls work** through `/api/*` (auto-routed to serverless function)
6. **Connected to MongoDB Atlas** via `MONGODB_URI` environment variable

---

## 🔐 Security Notes

⚠️ **Your MongoDB credentials are in `.env` file**

- ✅ Never commit `.env` to GitHub
- ✅ Always use Vercel's "Environment Variables" dashboard
- ✅ Already added `.env` to `.gitignore` (check it!)

---

## 🎯 Done! 🎉

Your app is now live on Vercel:

- Frontend: `https://your-app.vercel.app`
- Backend API: Same domain at `/api/progress`
- Database: MongoDB Atlas (cloud)

**All three integrated and working!**

---

## Extra: Local Development Still Works

```bash
# Frontend dev server (http://localhost:5173)
npm run dev

# Backend dev server (http://localhost:5000)
npm run server

# Both together
npm run dev:full
```

Local env vars read from `.env` file automatically.

---

**Need help? Check Vercel logs:**

1. Go to Vercel Dashboard
2. Click your project
3. Deployments → Latest deployment
4. Click "Logs" tab to see any errors
