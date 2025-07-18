# Neon PostgreSQL Setup Guide

## 🎯 Step 1: Create Neon Database

### Sign up for Neon:
1. Go to https://neon.tech
2. Sign up with GitHub/Google or email
3. Create a new project
4. Choose **Free Tier** (3 GB storage, 100 hours compute)
5. Select region closest to your users
6. Give it a name: `belluxe-atelier`
7. Click **Create Project**

### Get Database Connection String:
After creation, Neon will show you the connection string:
```
postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
```

## 🔧 Step 2: Get Database Connection String

In your Neon dashboard:
1. Go to **Dashboard** → Your Project
2. Click on **Connection Details**
3. Copy the connection string (it looks like):
   ```
   postgresql://username:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```

**Note: Neon provides a single connection string that works perfectly with Prisma!**

## ⚙️ Step 3: Update Environment Variables

### In Vercel Dashboard:
1. Go to **Settings** → **Environment Variables**
2. Add/Update these variables:

```bash
# Database (Use your Neon connection string)
DATABASE_URL=postgresql://username:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require

# Authentication
NEXTAUTH_URL=https://belluxe-atelier.vercel.app
NEXTAUTH_SECRET=[generate-secure-secret]

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

### Generate NextAuth Secret:
```bash
openssl rand -base64 32
```

## 🗄️ Step 4: Update Prisma Schema

Update your `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"  // Changed from "sqlite"
  url      = env("DATABASE_URL")
}

// Rest of your models remain the same...
```

## 🔄 Step 5: Database Migration

### Option A: Reset and Push (Recommended for first setup)
```bash
# Generate new migration for PostgreSQL
npx prisma db push

# Generate Prisma client
npx prisma generate

# Seed the database
npx tsx prisma/seed/seed.ts
```

### Option B: Create Migration (For existing data)
```bash
# Create migration
npx prisma migrate dev --name init-postgres

# Apply to production
npx prisma migrate deploy
```

## 📦 Step 6: Update Package Dependencies

Add PostgreSQL driver if needed:
```bash
npm install @prisma/client
npm install prisma --save-dev
```

## 🚀 Step 7: Deploy

1. **Commit changes:**
   ```bash
   git add .
   git commit -m "Setup Vercel Postgres database"
   git push origin main
   ```

2. **Vercel will automatically:**
   - Detect the changes
   - Run migrations
   - Deploy with new database

## ✅ Step 8: Verify Setup

### Test Database Connection:
1. Go to your deployed app
2. Check admin panel: `https://belluxe-atelier.vercel.app/admin`
3. Verify products load correctly
4. Test user registration/login
5. Place a test order

### In Neon Dashboard:
1. Go to **SQL Editor** in your Neon dashboard
2. Run test queries to check tables:
   ```sql
   SELECT * FROM "Product" LIMIT 5;
   SELECT * FROM "User" LIMIT 5;
   SELECT * FROM "Order" LIMIT 5;
   ```

## 🎛️ Step 9: Database Management

### Neon provides:
- **SQL Editor** - Run SQL queries directly in dashboard
- **Branching** - Create database branches for testing
- **Metrics** - Monitor database performance and usage
- **Automatic Backups** - Point-in-time recovery
- **Connection Pooling** - Built-in for better performance
- **Autoscaling** - Automatic compute scaling

### Useful Commands:
```bash
# Connect to production database locally
npx prisma studio

# View database schema
npx prisma db pull

# Reset database (careful!)
npx prisma db push --force-reset
```

## 🔍 Troubleshooting

### Common Issues:
1. **Connection Timeout**
   - Check your connection string is correct
   - Ensure your Neon database is not suspended (free tier auto-suspends)

2. **Migration Errors**
   - Run `npx prisma db push` instead of migrate for first setup
   - Check schema compatibility

3. **SSL Errors**
   - Neon requires SSL by default (`sslmode=require`)
   - Connection string should include this automatically

4. **Database Suspended**
   - Free tier databases auto-suspend after inactivity
   - First request after suspension may be slower

## 📊 Neon Free Tier Limits

### What's Included:
- ✅ **1 project with unlimited databases**
- ✅ **3 GB storage** (~500,000+ products)
- ✅ **100 hours compute/month** (~3.3 hours/day)
- ✅ **Unlimited requests** (within compute limits)
- ✅ **Connection pooling**
- ✅ **Point-in-time recovery (7 days)**
- ✅ **Database branching**
- ✅ **Auto-suspend when inactive**

### When to Upgrade:
- Need more than 100 hours compute/month
- Want always-on databases (no auto-suspend)
- Need more storage (up to 200 GB on paid plans)
- Want longer recovery periods

## 🎉 Benefits of Neon

✅ **Generous Free Tier** - More storage and features than most  
✅ **Database Branching** - Create copies for testing  
✅ **Auto-scaling** - Scales compute automatically  
✅ **Modern Architecture** - Built for serverless  
✅ **Great Performance** - Optimized for Next.js apps  
✅ **Easy Management** - Clean, intuitive dashboard  
✅ **No Cold Starts** - Fast connection establishment
