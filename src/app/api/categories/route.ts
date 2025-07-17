import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        subcategories: {
          orderBy: { name: 'asc' }
        },
        _count: {
          select: { products: true }
        }
      },
      orderBy: { name: 'asc' }
    });
    
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, slug, description } = body;
    
    const newCategory = await prisma.category.create({
      data: {
        name,
        slug,
        description: description || null,
      },
      include: {
        subcategories: true,
        _count: {
          select: { products: true }
        }
      }
    });
    
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json({ error: 'Category name or slug already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
