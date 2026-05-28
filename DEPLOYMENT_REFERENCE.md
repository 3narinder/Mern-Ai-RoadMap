# 🚀 Vercel Deployment - Quick Reference Card

## Files I Created

| File | Purpose |
|------|---------|
| `vercel.json` | Vercel configuration & environment setup |
| `api/progress.js` | Express backend for serverless functions |
| `.env.production` | Production environment variables template |
| `QUICK_DEPLOY.md` | 5-minute deployment guide |
| `VERCEL_DEPLOYMENT.md` | Full guide with troubleshooting |
| `DEPLOY_CHECKLIST.txt` | Step-by-step checklist |

## Files I Modified

| File | Change |
|------|--------|
| `vite.config.js` | Added `VITE_API_URL` environment variable support |
| `src/service/storage-adaptor.js` | Added environment auto-detection (local vs production) |

## The 3 Steps to Deploy

### Step 1: MongoDB Atlas (2 min)
```
https://www.mongodb.com/cloud/atlas
→ Network Access → Add IP → 0.0.0.0/0 → Confirm
→ Database → Connect → Copy connection string
```

### Step 2: Git Push (1 min)
```bash
git add .
git commit -m "Setup Vercel deployment"
git push origin main
```

### Step 3: Vercel Deploy (2 min)
```
https://vercel.com
→ Add New Project → Select repo
→ Environment Variables:
  • MONGODB_URI = [from Step 1]
  • NODE_ENV = production
  • VITE_USE_API = true
→ Deploy!
```

## After Deployment

| Test | Expected Result |
|------|-----------------|
| Open `https://your-app.vercel.app` | Roadmap app loads |
| Visit `/api/health` | `{"status":"ok",...}` |
| Check an item | Item marked as checked |
| Uncheck an item | Item marked as unchecked |
| Refresh page | Data persists |
| Grid updates | Colors change based on activity |

## Environment Variables (Vercel Dashboard)

```
MONGODB_URI     = mongodb+srv://user:pass@cluster.mongodb.net/?appName=Cluster0
NODE_ENV        = production
VITE_USE_API    = true
```

## Deployment Architecture

```
Your Code on GitHub
        ↓
Vercel Import & Build
        ↓
npm run build → Creates dist/
        ↓
Frontend + Backend deployed
        ↓
Connected to MongoDB Atlas
        ↓
Live at: https://your-project.vercel.app
```

## Local Development (Unchanged!)

```bash
# Dev mode with Vite
npm run dev

# Backend mode
npm run server

# Both together
npm run dev:full
```

## Troubleshooting Quick Links

**Problem: Can't save data**
- [ ] Check MongoDB IP whitelist allows Vercel
- [ ] Check MONGODB_URI in Vercel env variables
- [ ] Check VITE_USE_API = true

**Problem: CORS error**
- [ ] Should not happen (Vercel auto-proxies /api/*)
- [ ] Check browser console for exact error
- [ ] See VERCEL_DEPLOYMENT.md for solutions

**Problem: Build failed**
- [ ] Check Vercel Deployments → Logs
- [ ] Run `npm run build` locally to debug
- [ ] Most common: Missing environment variables

**Problem: App won't load**
- [ ] Check deployment status (should be "Ready")
- [ ] Clear browser cache + refresh
- [ ] Try in incognito mode
- [ ] Check console for JavaScript errors

## Security Checklist

- ✓ `.env` never committed (in .gitignore)
- ✓ Secrets in Vercel dashboard only
- ✓ MongoDB connection string kept secret
- ✓ CORS configured for production
- ✓ Environment variables per environment

## Useful URLs

| Service | URL |
|---------|-----|
| MongoDB Atlas | https://www.mongodb.com/cloud/atlas |
| Vercel Dashboard | https://vercel.com/dashboard |
| Your Frontend | https://your-project.vercel.app |
| Your API | https://your-project.vercel.app/api/progress |
| Health Check | https://your-project.vercel.app/api/health |

## Deployment Timeline

| Step | Time | What Happens |
|------|------|-------------|
| Push to GitHub | 1 min | Code ready for deployment |
| Vercel receives | Instant | Deployment triggered |
| Build phase | 1-2 min | `npm run build` runs |
| Deploy phase | 1-2 min | Files uploaded to CDN |
| Total | ~5 min | App goes live! |

## After Going Live

- ✓ Commits to main branch auto-deploy
- ✓ Rollbacks available in Vercel dashboard
- ✓ View deployment logs anytime
- ✓ Automatically gets SSL certificate
- ✓ Free tier included (very generous)

## Performance Notes

- Frontend served from Vercel CDN (fast!)
- Backend runs on serverless functions (scales automatically)
- Database on MongoDB Atlas (reliable)
- First load: ~2 seconds
- Subsequent loads: <500ms
- API calls: ~100-500ms

## Cost (Free Tier)

- ✓ Frontend hosting: Free
- ✓ Serverless functions: Free (up to 100 invocations/day)
- ✓ MongoDB Atlas: Free tier available
- **Total: $0/month for hobbyist use**

## When to Scale Up

Upgrade to paid tiers when you have:
- More than 100 API calls/day
- Multiple simultaneous users
- Larger database (>1GB)
- Need for custom domains with SSL

---

**Ready? Start with Step 1: MongoDB Atlas Setup! 🚀**

Questions? See VERCEL_DEPLOYMENT.md for detailed help.
