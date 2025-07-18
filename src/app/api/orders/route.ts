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
      orderItems,
    } = body;

    if (!customerEmail || !shippingAddress || !total || !orderItems) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const order = await prisma.$transaction(async (tx) => {
      // 1. Check stock for all items
      for (const item of orderItems) {
        const product = await tx.product.findUnique({
          where: { id: item.productId },
        });

        if (!product || product.stock < item.quantity) {
          throw new Error(`Not enough stock for product: ${product?.title || item.productId}`);
        }
      }

      // 2. Create the order
      const newOrder = await tx.order.create({
        data: {
          userId: session?.user?.id,
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
          orderItems: {
            create: orderItems.map((item: any) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
              color: item.color,
            })),
          },
        },
        include: {
          orderItems: true,
        },
      });

      // 3. Decrease stock for each product
      for (const item of orderItems) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      return newOrder;
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error: any) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create order" },
      { status: 500 }
    );
  }
}
