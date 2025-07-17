import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(params.id) },
    });
    
    if (product) {
      const formattedProduct = {
        ...product,
        gallery: JSON.parse(product.gallery),
        discount: JSON.parse(product.discount),
      };
      return NextResponse.json(formattedProduct);
    }
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { title, srcUrl, gallery, price, discount, rating, category, subcategory } = body;
    
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(params.id) },
      data: {
        title,
        srcUrl,
        gallery: JSON.stringify(gallery),
        price,
        discount: JSON.stringify(discount),
        rating,
        category,
        subcategory,
      },
    });
    
    const formattedProduct = {
      ...updatedProduct,
      gallery: JSON.parse(updatedProduct.gallery),
      discount: JSON.parse(updatedProduct.discount),
    };
    
    return NextResponse.json(formattedProduct);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.product.delete({
      where: { id: parseInt(params.id) },
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
