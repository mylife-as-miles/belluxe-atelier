import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, slug, description, categoryId } = body;
    
    const newSubcategory = await prisma.subcategory.create({
      data: {
        name,
        slug,
        description: description || null,
        categoryId,
      },
      include: {
        category: true,
        _count: {
          select: { products: true }
        }
      }
    });
    
    return NextResponse.json(newSubcategory, { status: 201 });
  } catch (error) {
    console.error('Error creating subcategory:', error);
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json({ error: 'Subcategory slug already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create subcategory' }, { status: 500 });
  }
}
