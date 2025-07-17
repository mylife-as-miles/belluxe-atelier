"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Eye, Package, Truck, Calendar, DollarSign, Filter } from "lucide-react";
import Image from "next/image";

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
  updatedAt: string;
}

const statusColors = {
  PENDING: "secondary",
  CONFIRMED: "default",
  PROCESSING: "default",
  SHIPPED: "default",
  DELIVERED: "default",
  CANCELLED: "destructive",
  REFUNDED: "destructive"
};

const paymentStatusColors = {
  PENDING: "secondary",
  PAID: "default",
  FAILED: "destructive",
  REFUNDED: "destructive"
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [updatingOrder, setUpdatingOrder] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      const url = statusFilter === "all" ? "/api/orders" : `/api/orders?status=${statusFilter}`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, field: string, value: string) => {
    setUpdatingOrder(orderId);
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ [field]: value }),
      });

      if (response.ok) {
        const updatedOrder = await response.json();
        setOrders(orders.map(order => 
          order.id === orderId ? updatedOrder : order
        ));
        if (selectedOrder?.id === orderId) {
          setSelectedOrder(updatedOrder);
        }
      }
    } catch (error) {
      console.error("Error updating order:", error);
    } finally {
      setUpdatingOrder(null);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const getStatusBadge = (status: string, type: "status" | "payment") => {
    const colors = type === "status" ? statusColors : paymentStatusColors;
    return (
      <Badge variant={colors[status as keyof typeof colors] as any}>
        {status}
      </Badge>
    );
  };

  const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;

  const filteredOrders = orders;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Orders Management</h1>
          <p className="text-muted-foreground">
            Manage customer orders and track fulfillment
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold">{orders.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(orders.reduce((sum, order) => sum + order.total, 0))}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">Pending Orders</p>
                <p className="text-2xl font-bold">
                  {orders.filter(order => order.status === 'PENDING').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Today's Orders</p>
                <p className="text-2xl font-bold">
                  {orders.filter(order => 
                    new Date(order.createdAt).toDateString() === new Date().toDateString()
                  ).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <Filter className="h-4 w-4" />
            <div className="flex gap-2">
              <Label htmlFor="status-filter">Filter by Status:</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                  <SelectItem value="PROCESSING">Processing</SelectItem>
                  <SelectItem value="SHIPPED">Shipped</SelectItem>
                  <SelectItem value="DELIVERED">Delivered</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <Card>
        <CardHeader>
          <CardTitle>Orders ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading orders...</div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No orders found
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-sm">#{order.id}</span>
                        {getStatusBadge(order.status, "status")}
                        {getStatusBadge(order.paymentStatus, "payment")}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {order.customerName} • {order.customerEmail}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString()} • {formatCurrency(order.total)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedOrder(order)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Order #{selectedOrder?.id}</DialogTitle>
                          </DialogHeader>
                          {selectedOrder && (
                            <div className="space-y-4">
                              {/* Customer Info */}
                              <div>
                                <h4 className="font-semibold mb-2">Customer Information</h4>
                                <div className="text-sm space-y-1">
                                  <p>{selectedOrder.customerName}</p>
                                  <p>{selectedOrder.customerEmail}</p>
                                  {selectedOrder.customerPhone && <p>{selectedOrder.customerPhone}</p>}
                                </div>
                              </div>

                              {/* Shipping Address */}
                              <div>
                                <h4 className="font-semibold mb-2">Shipping Address</h4>
                                <div className="text-sm">
                                  {(() => {
                                    try {
                                      const address = JSON.parse(selectedOrder.shippingAddress);
                                      return (
                                        <div className="space-y-1">
                                          <p>{address.street}</p>
                                          <p>{address.city}, {address.state} {address.zipCode}</p>
                                          <p>{address.country}</p>
                                        </div>
                                      );
                                    } catch {
                                      return <p>{selectedOrder.shippingAddress}</p>;
                                    }
                                  })()}
                                </div>
                              </div>

                              {/* Order Items */}
                              <div>
                                <h4 className="font-semibold mb-2">Order Items</h4>
                                <div className="space-y-2">
                                  {selectedOrder.orderItems.map((item, index) => (
                                    <div key={index} className="flex gap-3 p-2 border rounded">
                                      <div className="relative h-12 w-12 overflow-hidden rounded">
                                        <Image
                                          src={item.product.srcUrl}
                                          alt={item.product.title}
                                          fill
                                          className="object-cover"
                                        />
                                      </div>
                                      <div className="flex-1">
                                        <p className="text-sm font-medium">{item.product.title}</p>
                                        {item.color && <p className="text-xs text-muted-foreground">Color: {item.color}</p>}
                                        <div className="flex justify-between">
                                          <span className="text-xs">Qty: {item.quantity}</span>
                                          <span className="text-sm font-medium">{formatCurrency(item.price * item.quantity)}</span>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Order Total */}
                              <div>
                                <h4 className="font-semibold mb-2">Order Summary</h4>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>{formatCurrency(selectedOrder.subtotal)}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Tax</span>
                                    <span>{formatCurrency(selectedOrder.tax)}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>{selectedOrder.shipping === 0 ? "Free" : formatCurrency(selectedOrder.shipping)}</span>
                                  </div>
                                  <Separator />
                                  <div className="flex justify-between font-semibold">
                                    <span>Total</span>
                                    <span>{formatCurrency(selectedOrder.total)}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Status Updates */}
                              <div className="space-y-4">
                                <h4 className="font-semibold">Update Order</h4>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Order Status</Label>
                                    <Select
                                      value={selectedOrder.status}
                                      onValueChange={(value) => updateOrderStatus(selectedOrder.id, "status", value)}
                                      disabled={updatingOrder === selectedOrder.id}
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="PENDING">Pending</SelectItem>
                                        <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                                        <SelectItem value="PROCESSING">Processing</SelectItem>
                                        <SelectItem value="SHIPPED">Shipped</SelectItem>
                                        <SelectItem value="DELIVERED">Delivered</SelectItem>
                                        <SelectItem value="CANCELLED">Cancelled</SelectItem>
                                        <SelectItem value="REFUNDED">Refunded</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <Label>Payment Status</Label>
                                    <Select
                                      value={selectedOrder.paymentStatus}
                                      onValueChange={(value) => updateOrderStatus(selectedOrder.id, "paymentStatus", value)}
                                      disabled={updatingOrder === selectedOrder.id}
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="PENDING">Pending</SelectItem>
                                        <SelectItem value="PAID">Paid</SelectItem>
                                        <SelectItem value="FAILED">Failed</SelectItem>
                                        <SelectItem value="REFUNDED">Refunded</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                <div>
                                  <Label htmlFor="tracking">Tracking Number</Label>
                                  <Input
                                    id="tracking"
                                    value={selectedOrder.trackingNumber || ""}
                                    onChange={(e) => updateOrderStatus(selectedOrder.id, "trackingNumber", e.target.value)}
                                    placeholder="Enter tracking number"
                                    disabled={updatingOrder === selectedOrder.id}
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
