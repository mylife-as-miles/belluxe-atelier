import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { Product } from '@/types/product.types';

export async function GET() {
  const products = await prisma.product.findMany();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { title, srcUrl, gallery, price, discount, rating, category, subcategory } = body;

  const newProduct = await prisma.product.create({
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

  return NextResponse.json(newProduct, { status: 201 });
}