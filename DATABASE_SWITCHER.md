# Database Configuration Switcher

## For Local Development (SQLite)
Use `schema.local.prisma` as reference or copy the datasource block below to your main `schema.prisma`:

```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

## For Production (PostgreSQL)
Your main `schema.prisma` is now configured for PostgreSQL:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("POSTGRES_PRISMA_URL")
  directUrl = env("POSTGRES_URL_NON_POOLING")
}
```

## Environment Variables

### Local Development (.env)
```
DATABASE_URL="file:./dev.db"
```

### Production (Vercel)
Add these variables in Vercel Dashboard:
```
POSTGRES_PRISMA_URL=your_vercel_postgres_url
POSTGRES_URL_NON_POOLING=your_vercel_postgres_direct_url
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your-production-secret
```

## Commands

### Local Development
```bash
# Generate Prisma client for SQLite
npx prisma generate

# Push schema to SQLite
npx prisma db push

# View database
npx prisma studio
```

### Production Setup
```bash
# Generate Prisma client for PostgreSQL
npx prisma generate

# Deploy schema to Vercel Postgres
npx prisma db push

# Seed production database (optional)
npx prisma db seed
```

## Quick Switch Commands

### Switch to Local (SQLite)
```bash
# Copy local schema
cp prisma/schema.local.prisma prisma/schema.prisma

# Update the datasource block in schema.prisma to use SQLite
# Then run:
npx prisma generate
npx prisma db push
```

### Switch to Production (PostgreSQL)
```bash
# Update datasource in schema.prisma to:
# provider = "postgresql"
# url = env("POSTGRES_PRISMA_URL")
# directUrl = env("POSTGRES_URL_NON_POOLING")

# Then run:
npx prisma generate
npx prisma db push
```
