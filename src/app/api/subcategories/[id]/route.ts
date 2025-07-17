import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const subcategoryId = parseInt(params.id);
    
    if (isNaN(subcategoryId)) {
      return NextResponse.json({ error: 'Invalid subcategory ID' }, { status: 400 });
    }

    // Check if subcategory has products
    const subcategory = await prisma.subcategory.findUnique({
      where: { id: subcategoryId },
      include: { _count: { select: { products: true } } }
    });

    if (!subcategory) {
      return NextResponse.json({ error: 'Subcategory not found' }, { status: 404 });
    }

    if (subcategory._count.products > 0) {
      return NextResponse.json({ 
        error: 'Cannot delete subcategory with existing products. Please move or delete products first.' 
      }, { status: 400 });
    }

    await prisma.subcategory.delete({
      where: { id: subcategoryId }
    });
    
    return NextResponse.json({ message: 'Subcategory deleted successfully' });
  } catch (error) {
    console.error('Error deleting subcategory:', error);
    return NextResponse.json({ error: 'Failed to delete subcategory' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const subcategoryId = parseInt(params.id);
    const body = await request.json();
    const { name, slug, description, categoryId } = body;
    
    if (isNaN(subcategoryId)) {
      return NextResponse.json({ error: 'Invalid subcategory ID' }, { status: 400 });
    }

    const updatedSubcategory = await prisma.subcategory.update({
      where: { id: subcategoryId },
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
    
    return NextResponse.json(updatedSubcategory);
  } catch (error) {
    console.error('Error updating subcategory:', error);
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json({ error: 'Subcategory slug already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update subcategory' }, { status: 500 });
  }
}
