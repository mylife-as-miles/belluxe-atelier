[![Belluxe Atelier](https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.0.3&q=85&w=1200&h=630&fit=crop)](https://belluxe-atelier.vercel.app/)

# 🏆 Belluxe Atelier

> A premium e-commerce platform for luxury timepieces and jewelry, built with modern web technologies.

**Belluxe Atelier** is a comprehensive, production-ready e-commerce application specializing in luxury watches and fine jewelry. Built with **Next.js 14**, **TypeScript**, **Prisma**, and **PostgreSQL**, it offers a seamless shopping experience with advanced features like real-time inventory management, secure authentication, and responsive design.

[![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.0-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16.0-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

## ✨ Features

### 🛍️ **E-commerce Core**
- **Product Catalog**: Dynamic product listings with advanced filtering and search
- **Shopping Cart**: Persistent cart with Redux state management
- **Order Management**: Complete order processing and tracking system
- **User Authentication**: Secure login/signup with NextAuth.js
- **Admin Dashboard**: Comprehensive product and order management

### 🎨 **User Experience**
- **Responsive Design**: Mobile-first approach with seamless device compatibility
- **Interactive UI**: Smooth animations with Framer Motion
- **Modern Components**: Beautiful UI built with ShadCN/UI and Radix
- **Performance Optimized**: Server-side rendering and static generation
- **SEO Friendly**: Optimized metadata and structured data

### 🔧 **Technical Excellence**
- **Type Safety**: Full TypeScript implementation
- **Database**: PostgreSQL with Prisma ORM
- **Real-time Updates**: React Query for efficient data fetching
- **Image Management**: Cloudinary integration for optimized media
- **Deployment Ready**: Vercel-optimized with environment configurations

## 📋 Table of Contents

- [🏆 Belluxe Atelier](#-belluxe-atelier)
  - [✨ Features](#-features)
  - [📋 Table of Contents](#-table-of-contents)
  - [🚀 Quick Start](#-quick-start)
  - [🔧 Tech Stack](#-tech-stack)
  - [📦 Installation](#-installation)
  - [🗄️ Database Setup](#️-database-setup)
  - [🌐 Deployment](#-deployment)
  - [📁 Project Structure](#-project-structure)
  - [🎯 Usage](#-usage)
  - [🤝 Contributing](#-contributing)
  - [📝 License](#-license)
  - [📧 Contact](#-contact)

## 🚀 Quick Start

Get Belluxe Atelier running locally in minutes:

```bash
# Clone the repository
git clone https://github.com/mylife-as-miles/belluxe-atelier.git
cd belluxe-atelier

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Set up the database
npx prisma generate
npx prisma db push
npx prisma db seed

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🔧 Tech Stack

### **Frontend**
- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[ShadCN/UI](https://ui.shadcn.com/)** - Modern React components
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library

### **Backend & Database**
- **[Prisma](https://www.prisma.io/)** - Next-generation ORM
- **[PostgreSQL](https://www.postgresql.org/)** - Robust relational database
- **[NextAuth.js](https://next-auth.js.org/)** - Authentication for Next.js

### **State Management & Data Fetching**
- **[Redux Toolkit](https://redux-toolkit.js.org/)** - Predictable state container
- **[React Query](https://tanstack.com/query/latest)** - Powerful data synchronization
- **[Zustand](https://github.com/pmndrs/zustand)** - Lightweight state management

### **Development & Deployment**
- **[Vercel](https://vercel.com/)** - Deployment platform
- **[Cloudinary](https://cloudinary.com/)** - Image and video management
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting

## 📦 Installation

### Prerequisites

- **Node.js** 18.0 or later
- **npm**, **yarn**, or **pnpm**
- **PostgreSQL** database (local or cloud)
- **Git**

### Step-by-Step Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/mylife-as-miles/belluxe-atelier.git
   cd belluxe-atelier
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   
   Edit the `.env` file with your configuration:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/belluxe_atelier"
   
   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   
   # Cloudinary (optional)
   CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Push database schema
   npx prisma db push
   
   # Seed the database with sample data
   npm run db:seed
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

6. **Open Application**
   - Visit [http://localhost:3000](http://localhost:3000) in your browser
   - Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)

## 🗄️ Database Setup

### Local Development (SQLite)
For quick local development, you can use SQLite:
```env
DATABASE_URL="file:./dev.db"
```

### PostgreSQL (Recommended for Production)
1. **Create a PostgreSQL database**
2. **Update your .env file**:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/belluxe_atelier"
   ```
3. **Run migrations**:
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

### Cloud Database Options
- **[Neon](https://neon.tech/)** - Serverless PostgreSQL
- **[PlanetScale](https://planetscale.com/)** - MySQL platform
- **[Supabase](https://supabase.com/)** - Open source Firebase alternative

## 🌐 Deployment

### Vercel (Recommended)

1. **Connect your GitHub repository to Vercel**
2. **Configure environment variables** in Vercel dashboard
3. **Deploy automatically** on every push to main branch

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmylife-as-miles%2Fbelluxe-atelier)

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Environment Variables for Production

Ensure these are set in your deployment environment:
- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `CLOUDINARY_*` (if using image uploads)

## 📁 Project Structure

```
belluxe-atelier/
├── 📂 prisma/                    # Database schema and migrations
│   ├── schema.prisma            # Prisma schema definition
│   ├── 📂 migrations/           # Database migrations
│   └── 📂 seed/                 # Database seed scripts
├── 📂 public/                   # Static assets
│   ├── 📂 icons/                # SVG icons and graphics
│   └── 📂 images/               # Static images
├── 📂 src/
│   ├── 📂 app/                  # Next.js App Router
│   │   ├── 📂 api/              # API routes
│   │   ├── 📂 auth/             # Authentication pages
│   │   ├── 📂 admin/            # Admin dashboard
│   │   ├── 📂 shop/             # Shop pages
│   │   └── 📂 cart/             # Shopping cart
│   ├── 📂 components/           # React components
│   │   ├── 📂 ui/               # ShadCN UI components
│   │   ├── 📂 common/           # Shared components
│   │   ├── 📂 homepage/         # Homepage sections
│   │   ├── 📂 shop-page/        # Shop page components
│   │   └── 📂 product-page/     # Product detail components
│   ├── 📂 lib/                  # Utility libraries
│   │   ├── 📂 features/         # Redux slices & API calls
│   │   ├── 📂 hooks/            # Custom React hooks
│   │   ├── auth.ts              # NextAuth configuration
│   │   ├── prisma.ts            # Prisma client
│   │   └── utils.ts             # Utility functions
│   ├── 📂 styles/               # CSS and styling
│   │   ├── globals.css          # Global styles
│   │   └── 📂 fonts/            # Custom fonts
│   └── 📂 types/                # TypeScript type definitions
├── 📂 scripts/                  # Build and utility scripts
├── 📄 components.json           # ShadCN/UI configuration
├── 📄 next.config.mjs           # Next.js configuration
├── 📄 tailwind.config.ts        # Tailwind CSS configuration
├── 📄 tsconfig.json             # TypeScript configuration
└── 📄 package.json              # Dependencies and scripts
```

## 🎯 Usage

### Customer Features
- **Browse Products**: Explore luxury watches and jewelry by category
- **Product Details**: View detailed specifications, images, and reviews
- **Shopping Cart**: Add/remove items with persistent state
- **User Authentication**: Secure account creation and login
- **Order Management**: Track order history and status

### Admin Features
- **Product Management**: Add, edit, and delete products
- **Order Processing**: View and manage customer orders
- **Category Management**: Organize products by categories
- **User Management**: Admin user controls

### API Endpoints
```
GET    /api/products              # Get all products
GET    /api/products/[id]         # Get product by ID
POST   /api/products              # Create new product (admin)
PUT    /api/products/[id]         # Update product (admin)
DELETE /api/products/[id]         # Delete product (admin)

GET    /api/categories            # Get all categories
POST   /api/categories            # Create category (admin)

GET    /api/orders                # Get orders (admin)
POST   /api/orders                # Create new order
```

## 🤝 Contributing

We welcome contributions to Belluxe Atelier! Here's how you can help:

### Development Workflow

1. **Fork the repository**
   ```bash
   git clone https://github.com/mylife-as-miles/belluxe-atelier.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add tests for new features
   - Update documentation as needed

4. **Test your changes**
   ```bash
   npm run lint
   npm run build
   ```

5. **Commit and push**
   ```bash
   git commit -m "feat: add amazing feature"
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**

### Contribution Guidelines

- **Code Style**: Follow the existing TypeScript and React patterns
- **Commit Messages**: Use conventional commit format (`feat:`, `fix:`, `docs:`, etc.)
- **Documentation**: Update README and comments for new features
- **Testing**: Add tests for new functionality

### Issues and Bug Reports

- Use the [GitHub Issues](https://github.com/mylife-as-miles/belluxe-atelier/issues) page
- Provide clear reproduction steps
- Include browser and environment details
- Add screenshots for UI issues

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Belluxe Atelier

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## 📧 Contact

### Project Maintainer
- **GitHub**: [@mylife-as-miles](https://github.com/mylife-as-miles)
- **Repository**: [belluxe-atelier](https://github.com/mylife-as-miles/belluxe-atelier)

### Support
- **Issues**: [GitHub Issues](https://github.com/mylife-as-miles/belluxe-atelier/issues)
- **Discussions**: [GitHub Discussions](https://github.com/mylife-as-miles/belluxe-atelier/discussions)

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

[Live Demo](https://belluxe-atelier.vercel.app/) • [Documentation](https://github.com/mylife-as-miles/belluxe-atelier/wiki) • [Issues](https://github.com/mylife-as-miles/belluxe-atelier/issues) • [Contributing](CONTRIBUTING.md)

Made with ❤️ for the luxury e-commerce community

</div>