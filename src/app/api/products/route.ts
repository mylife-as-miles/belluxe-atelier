import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    
    // Parse JSON strings back to objects/arrays
    const formattedProducts = products.map((product: any) => ({
      ...product,
      gallery: JSON.parse(product.gallery),
      discount: JSON.parse(product.discount),
      colors: JSON.parse(product.colors || "[]"),
      specifications: JSON.parse(product.specifications || "[]"),
      faqs: JSON.parse(product.faqs || "[]"),
    }));
    
    return NextResponse.json(formattedProducts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      title, 
      srcUrl, 
      gallery, 
      price, 
      discount, 
      rating, 
      category, 
      subcategory,
      description,
      colors,
      specifications,
      faqs
    } = body;
    
    const newProduct = await prisma.product.create({
      data: {
        title,
        srcUrl,
        gallery: JSON.stringify(gallery),
        price,
        discount: JSON.stringify(discount),
        rating,
        category,
        subcategory,
        description: description || "",
        colors: JSON.stringify(colors || []),
        specifications: JSON.stringify(specifications || []),
        faqs: JSON.stringify(faqs || []),
      },
    });
    
    // Parse JSON strings back for response
    const formattedProduct = {
      ...newProduct,
      gallery: JSON.parse(newProduct.gallery),
      discount: JSON.parse(newProduct.discount),
      colors: JSON.parse(newProduct.colors || "[]"),
      specifications: JSON.parse(newProduct.specifications || "[]"),
      faqs: JSON.parse(newProduct.faqs || "[]"),
    };
    
    return NextResponse.json(formattedProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
