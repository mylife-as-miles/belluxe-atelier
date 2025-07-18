npm install -g vercel
vercel login
vercel# Deployment Checklist

## ✅ Pre-Deployment Steps

### 1. Environment Variables
- [ ] Set `NEXTAUTH_URL` to your production domain
- [ ] Generate and set secure `NEXTAUTH_SECRET`
- [ ] Configure Cloudinary credentials
- [ ] Set up production database URL

### 2. Database Setup
- [ ] Choose production database (Vercel Postgres, PlanetScale, etc.)
- [ ] Run database migrations in production
- [ ] Seed initial data if needed

### 3. Build Configuration
- [ ] Verify `next.config.mjs` has correct settings
- [ ] Test build locally: `npm run build`
- [ ] Check for TypeScript errors: `npm run lint`

## 🚀 Deployment Steps

### Vercel Dashboard Setup
1. **Environment Variables**
   ```
   NEXTAUTH_URL=https://belluxe-atelier.vercel.app
   NEXTAUTH_SECRET=[generated-secret]
   CLOUDINARY_CLOUD_NAME=[your-cloud-name]
   CLOUDINARY_API_KEY=[your-api-key]
   CLOUDINARY_API_SECRET=[your-api-secret]
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=[your-cloud-name]
   DATABASE_URL=[your-production-db-url]
   ```

2. **Deploy**
   - Push to GitHub main branch
   - Vercel will automatically deploy
   - Or manually trigger deployment

## 🧪 Post-Deployment Testing

### 1. Core Functionality
- [ ] Homepage loads correctly
- [ ] Product pages display properly
- [ ] Shopping cart works
- [ ] Checkout process functions

### 2. Admin Panel
- [ ] `/admin` dashboard accessible
- [ ] Product management works
- [ ] Order management functions
- [ ] Image uploads to Cloudinary work

### 3. User Authentication
- [ ] User registration works
- [ ] User login functions
- [ ] Profile page shows order history
- [ ] Protected routes work correctly

### 4. Database Operations
- [ ] Products load from database
- [ ] Orders are created properly
- [ ] User accounts are saved
- [ ] Order history displays correctly

## 🔧 Troubleshooting

### Common Issues:
1. **500 Internal Server Error**
   - Check environment variables
   - Verify database connection
   - Check server logs in Vercel

2. **Authentication Issues**
   - Verify NEXTAUTH_URL matches domain
   - Check NEXTAUTH_SECRET is set
   - Clear browser cookies

3. **Database Errors**
   - Verify DATABASE_URL format
   - Check database permissions
   - Run migrations if needed

4. **Image Upload Issues**
   - Verify Cloudinary credentials
   - Check API key permissions
   - Test upload limits

## 📊 Monitoring

After deployment, monitor:
- [ ] Error rates in Vercel dashboard
- [ ] Performance metrics
- [ ] User registration/login rates
- [ ] Order completion rates

## 🔄 Updates

For future updates:
1. Test changes locally
2. Push to preview branch first
3. Test preview deployment
4. Merge to main for production
5. Monitor for issues
