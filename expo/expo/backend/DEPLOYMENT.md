# Utopia Backend Deployment Guide

## Quick Deploy to Railway

### 1. Prerequisites
- GitHub repository with your code
- Railway account (https://railway.app)

### 2. Deploy Steps

```bash
# 1. Install Railway CLI
npm install -g @railway/cli

# 2. Login to Railway
railway login

# 3. Initialize new project (from backend directory)
cd backend
railway init

# 4. Add MongoDB
railway add --plugin mongodb

# 5. Deploy
railway up
```

### 3. Environment Variables (Set in Railway Dashboard)

| Variable | Value | Required |
|----------|-------|----------|
| `PORT` | 5000 | Yes |
| `NODE_ENV` | production | Yes |
| `MONGO_URI` | (from MongoDB Atlas or Railway) | Yes |
| `JWT_SECRET` | (64 char random string) | Yes |
| `JWT_EXPIRE` | 30d | Yes |
| `CORS_ORIGINS` | https://utopia.app | Yes |
| `RATE_LIMIT_MAX_GENERAL` | 100 | No |
| `RATE_LIMIT_MAX_AUTH` | 10 | No |

### 4. Generate JWT Secret
```bash
# On Mac/Linux
openssl rand -hex 32

# On Windows PowerShell
[System.Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

### 5. Custom Domain (Optional)
1. Go to Railway Dashboard → Settings → Domains
2. Add custom domain: `api.utopia.app`
3. Update DNS records as instructed

---

## Alternative: Deploy to Render

### 1. Create render.yaml
Already created in this directory.

### 2. Deploy
1. Push code to GitHub
2. Connect Render to GitHub repo
3. Select "Web Service"
4. Set root directory to `/backend`
5. Add environment variables
6. Deploy!

---

## MongoDB Atlas Setup

### 1. Create Cluster
1. Go to https://cloud.mongodb.com
2. Create free M0 cluster
3. Choose region closest to your users (Mumbai for India)

### 2. Get Connection String
1. Click "Connect"
2. Choose "Connect your application"
3. Copy connection string
4. Replace `<password>` with your password

### 3. Whitelist IPs
- For Railway: Whitelist `0.0.0.0/0` (all IPs)
- This is safe because you still need credentials

---

## Post-Deployment Checklist

- [ ] Backend is accessible at production URL
- [ ] Database connection successful
- [ ] API health check responds: `GET /health`
- [ ] User registration works
- [ ] Merchant registration works
- [ ] Deals endpoint works: `GET /api/deals`
- [ ] Update mobile app API URLs
