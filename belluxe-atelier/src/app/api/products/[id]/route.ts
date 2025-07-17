import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { Product } from '@/types/product.types';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
  });

  if (!product) {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json(product);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const updatedData: Product = await request.json();

  const product = await prisma.product.update({
    where: { id: Number(id) },
    data: updatedData,
  });

  return NextResponse.json(product);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  await prisma.product.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ message: 'Product deleted successfully' });
}