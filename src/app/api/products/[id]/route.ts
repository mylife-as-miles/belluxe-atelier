import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (product) {
    return NextResponse.json(product);
  }
  return NextResponse.json({ error: 'Product not found' }, { status: 404 });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  const { title, srcUrl, gallery, price, discount, rating, category, subcategory } = body;
  const updatedProduct = await prisma.product.update({
    where: { id: parseInt(params.id) },
    data: {
      title,
      srcUrl,
      gallery,
      price,
      discount,
      rating,
      category,
      subcategory,
    },
  });
  return NextResponse.json(updatedProduct);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await prisma.product.delete({
    where: { id: parseInt(params.id) },
  });
  return new Response(null, { status: 204 });
}
