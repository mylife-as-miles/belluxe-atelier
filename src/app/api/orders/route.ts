import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

// GET /api/orders - Fetch all orders
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    
    const orders = await prisma.order.findMany({
      where: status ? { status: status as any } : undefined,
      include: {
        orderItems: {
          include: {
            product: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

// POST /api/orders - Create a new order
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const body = await request.json();
    const {
      customerEmail,
      customerName,
      customerPhone,
      shippingAddress,
      billingAddress,
      subtotal,
      tax,
      shipping,
      total,
      paymentMethod,
      notes,
      orderItems
    } = body;

    // Validate required fields
    if (!customerEmail || !customerName || !shippingAddress || !orderItems?.length) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create order with order items (link to user if authenticated)
    const order = await prisma.order.create({
      data: {
        userId: session?.user?.id || null, // Link to user if logged in
        customerEmail,
        customerName,
        customerPhone,
        shippingAddress,
        billingAddress,
        subtotal,
        tax,
        shipping,
        total,
        paymentMethod,
        notes,
        orderItems: {
          create: orderItems.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            color: item.color
          }))
        }
      },
      include: {
        orderItems: {
          include: {
            product: true
          }
        }
      }
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
