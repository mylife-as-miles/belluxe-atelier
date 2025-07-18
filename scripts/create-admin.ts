import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function connectWithRetry(retries = 5, delay = 3000) {
  for (let i = 0; i < retries; i++) {
    try {
      await prisma.$connect();
      console.log('Database connection successful.');
      return;
    } catch (error) {
      console.error(`Database connection attempt ${i + 1} failed. Retrying in ${delay / 1000}s...`);
      if (i < retries - 1) {
        await sleep(delay);
      } else {
        console.error("Could not connect to the database after several retries.");
        throw error;
      }
    }
  }
}

async function createAdminUser() {
  try {
    console.log('Attempting to connect to the database...');
    await connectWithRetry();

    // Check if admin already exists
    console.log('Checking for existing admin user...');
    const existingAdmin = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    });

    if (existingAdmin) {
      console.log('Admin user already exists:', existingAdmin.email);
      return;
    }

    // Create admin user
    console.log('Creating new admin user...');
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const hashedPassword = await bcrypt.hash(adminPassword, 12);

    const admin = await prisma.user.create({
      data: {
        email: 'admin@belluxe.com',
        password: hashedPassword,
        name: 'Belluxe Admin',
        role: 'ADMIN',
      }
    });

    console.log('Admin user created successfully:');
    console.log('Email:', admin.email);
    console.log('Password:', adminPassword);
    console.log('Please change the password after first login!');
  } catch (error) {
    console.error('Error during admin user creation process:', error);
  } finally {
    await prisma.$disconnect();
    console.log('Database connection closed.');
  }
}

createAdminUser();
