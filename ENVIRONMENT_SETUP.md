# Environment Variables Setup Guide

## Local Development (.env)
Your local `.env` file should have:

```bash
# Database
DATABASE_URL="file:./dev.db"

# Next.js Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-change-in-production"

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

## Production (Vercel Environment Variables)

### Step 1: Go to Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Select your `belluxe-atelier` project
3. Go to Settings → Environment Variables

### Step 2: Add These Environment Variables

#### Required for Production:

**DATABASE_URL**
- Value: `file:./dev.db` (for SQLite) or your production database URL
- Environment: Production, Preview, Development

**NEXTAUTH_URL**
- Value: `https://belluxe-atelier.vercel.app` (or your custom domain)
- Environment: Production, Preview

**NEXTAUTH_SECRET**
- Value: Generate a secure secret (use: `openssl rand -base64 32`)
- Environment: Production, Preview, Development

**CLOUDINARY_CLOUD_NAME**
- Value: Your Cloudinary cloud name
- Environment: Production, Preview, Development

**CLOUDINARY_API_KEY**
- Value: Your Cloudinary API key
- Environment: Production, Preview, Development

**CLOUDINARY_API_SECRET**
- Value: Your Cloudinary API secret
- Environment: Production, Preview, Development

**NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME**
- Value: Your Cloudinary cloud name (same as CLOUDINARY_CLOUD_NAME)
- Environment: Production, Preview, Development

### Step 3: Generate NextAuth Secret

Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

Or use this online generator: https://generate-secret.vercel.app/32

### Step 4: Database for Production

For production, consider upgrading to:
- **Vercel Postgres** (recommended for Vercel)
- **PlanetScale** (MySQL)
- **Railway** (PostgreSQL)
- **Supabase** (PostgreSQL)

Update your `DATABASE_URL` accordingly.

### Step 5: Redeploy

After setting environment variables:
1. Go to Deployments tab
2. Click "Redeploy" on the latest deployment
3. Or push a new commit to trigger automatic deployment

## Notes:

- ✅ Environment variables are automatically injected during build
- ✅ NextAuth will work properly with correct NEXTAUTH_URL
- ✅ Admin routes will be accessible without authentication
- ✅ User authentication will work for customer accounts
- ✅ Database operations will function correctly

## Security Tips:

- Never commit `.env` file to Git
- Use different secrets for development and production
- Regularly rotate API keys and secrets
- Use environment-specific database URLs
