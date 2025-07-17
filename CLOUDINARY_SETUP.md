# Cloudinary Setup Instructions

## 1. Create a Cloudinary Account
- Go to https://cloudinary.com/
- Sign up for a free account
- After signup, you'll be redirected to your dashboard

## 2. Get Your Credentials
In your Cloudinary dashboard, you'll find:
- **Cloud Name**: Your unique cloud name
- **API Key**: Your API key for authentication
- **API Secret**: Your secret key (keep this private)

## 3. Update Environment Variables
Edit your `.env` file and replace the placeholder values:

```
CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
CLOUDINARY_API_KEY=your_actual_api_key
CLOUDINARY_API_SECRET=your_actual_api_secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
```

## 4. Restart the Development Server
After updating the environment variables, restart your dev server:

```bash
npm run dev
```

## 5. Test Image Upload
1. Go to http://localhost:3001/admin/products/new
2. Try uploading an image using the file input
3. The image should be uploaded to Cloudinary and displayed as a preview

## Features Included:
- ✅ Automatic image optimization
- ✅ Image resizing and format conversion
- ✅ CDN delivery for fast loading
- ✅ Preview of uploaded images
- ✅ Support for main product image and gallery images
- ✅ Organized uploads in 'belluxe-products' folder

## Free Tier Limits:
- 25 GB storage
- 25 GB bandwidth per month
- Sufficient for development and small projects
