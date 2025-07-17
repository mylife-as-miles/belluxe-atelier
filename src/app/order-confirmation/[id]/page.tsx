"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Package, Truck, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";

interface OrderItem {
  id: number;
  quantity: number;
  price: number;
  color?: string;
  product: {
    id: number;
    title: string;
    srcUrl: string;
  };
}

interface Order {
  id: string;
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  shippingAddress: string;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: string;
  paymentStatus: string;
  paymentMethod?: string;
  trackingNumber?: string;
  orderItems: OrderItem[];
  createdAt: string;
}

export default function OrderConfirmationPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${id}`);
        if (!response.ok) {
          throw new Error('Order not found');
        }
        const orderData = await response.json();
        setOrder(orderData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load order');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p>Loading your order...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button asChild>
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  const shippingAddress = JSON.parse(order.shippingAddress);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 rounded-full p-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <h1 className={cn([integralCF.className, "text-3xl font-bold mb-2"])}>
            Order Confirmed!
          </h1>
          <p className="text-gray-600">
            Thank you for your order. We've received your order and will begin processing it soon.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <div className="space-y-6">
            {/* Order Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Order Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Number:</span>
                  <span className="font-mono">#{order.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Date:</span>
                  <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <Badge variant={order.status === 'PENDING' ? 'secondary' : 'default'}>
                    {order.status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Status:</span>
                  <Badge variant={order.paymentStatus === 'PAID' ? 'default' : 'secondary'}>
                    {order.paymentStatus}
                  </Badge>
                </div>
                {order.trackingNumber && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tracking Number:</span>
                    <span className="font-mono">{order.trackingNumber}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-gray-600">
                  <p className="font-medium text-black">{order.customerName}</p>
                  <p>{shippingAddress.street}</p>
                  <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}</p>
                  <p>{shippingAddress.country}</p>
                  {order.customerPhone && <p>{order.customerPhone}</p>}
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We'll send order updates to: <br />
                  <span className="font-medium text-black">{order.customerEmail}</span>
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Items */}
                <div className="space-y-3">
                  {order.orderItems.map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="relative h-16 w-16 overflow-hidden rounded-md bg-gray-100">
                        <Image
                          src={item.product.srcUrl}
                          alt={item.product.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{item.product.title}</h4>
                        {item.color && (
                          <p className="text-xs text-gray-500">Color: {item.color}</p>
                        )}
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                          <span className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Pricing */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${order.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{order.shipping === 0 ? "Free" : `$${order.shipping.toFixed(2)}`}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  <Button asChild className="w-full">
                    <Link href="/shop">Continue Shopping</Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/account/orders">View All Orders</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
