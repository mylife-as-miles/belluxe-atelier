"use client";

import { useState, useEffect, useCallback } from "react";
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

  const fetchOrders = useCallback(async () => {
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
  }, [statusFilter]);

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
  }, [statusFilter, fetchOrders]);

  const getStatusBadge = (status: string, type: "status" | "payment") => {
    const colors = type === "status" ? statusColors : paymentStatusColors;
    return (
      <Badge variant={colors[status as keyof typeof colors] as any}>
        {status}
      </Badge>
    );
  };

  const formatCurrency = (amount: number) => `₦${amount.toLocaleString()}`;

  const filteredOrders = orders;

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Orders Management</h1>
          <p className="text-muted-foreground">
            Manage customer orders and track fulfillment
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={fetchOrders}
            disabled={loading}
            size="sm"
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-blue-600 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-sm text-muted-foreground truncate">Total Orders</p>
                <p className="text-xl md:text-2xl font-bold">{orders.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-600 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-sm text-muted-foreground truncate">Total Revenue</p>
                <p className="text-lg md:text-2xl font-bold">
                  {formatCurrency(orders.reduce((sum, order) => sum + order.total, 0))}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-orange-600 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-sm text-muted-foreground truncate">Pending</p>
                <p className="text-xl md:text-2xl font-bold">
                  {orders.filter(order => order.status === 'PENDING').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-purple-600 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-sm text-muted-foreground truncate">Today</p>
                <p className="text-xl md:text-2xl font-bold">
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
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium">Filters</span>
            </div>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <Label htmlFor="status-filter" className="text-sm whitespace-nowrap">Status:</Label>
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
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between">
            <span>Orders ({filteredOrders.length})</span>
            <div className="text-sm text-muted-foreground font-normal">
              {loading && "Loading..."}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
              <p className="mt-2 text-muted-foreground">Loading orders...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
              <p>No orders found</p>
              <p className="text-sm">Orders will appear here when customers place them</p>
            </div>
          ) : (
            <div className="divide-y">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
                          #{order.id.slice(-8)}
                        </span>
                        {getStatusBadge(order.status, "status")}
                        {getStatusBadge(order.paymentStatus, "payment")}
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium truncate">
                          {order.customerName}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          {order.customerEmail}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                          <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                          <span>•</span>
                          <span className="font-medium text-foreground">
                            {formatCurrency(order.total)}
                          </span>
                          <span>•</span>
                          <span>{order.orderItems.length} item{order.orderItems.length !== 1 ? 's' : ''}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="h-8"
                            onClick={() => setSelectedOrder(order)}
                          >
                            <Eye className="h-4 w-4 md:mr-1" />
                            <span className="hidden md:inline">View</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <span>Order #{selectedOrder?.id?.slice(-8)}</span>
                              <div className="flex gap-1">
                                {selectedOrder && getStatusBadge(selectedOrder.status, "status")}
                                {selectedOrder && getStatusBadge(selectedOrder.paymentStatus, "payment")}
                              </div>
                            </DialogTitle>
                          </DialogHeader>
                          {selectedOrder && (
                            <div className="space-y-6">
                              <div className="grid md:grid-cols-2 gap-6">
                                {/* Customer Info */}
                                <div>
                                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                                    <span>Customer Information</span>
                                  </h4>
                                  <div className="space-y-2 text-sm bg-muted/30 p-4 rounded-lg">
                                    <p className="font-medium">{selectedOrder.customerName}</p>
                                    <p className="text-muted-foreground">{selectedOrder.customerEmail}</p>
                                    {selectedOrder.customerPhone && (
                                      <p className="text-muted-foreground">{selectedOrder.customerPhone}</p>
                                    )}
                                    <p className="text-xs text-muted-foreground pt-2">
                                      Order Date: {new Date(selectedOrder.createdAt).toLocaleString()}
                                    </p>
                                  </div>
                                </div>

                                {/* Shipping Address */}
                                <div>
                                  <h4 className="font-semibold mb-3">Shipping Address</h4>
                                  <div className="text-sm bg-muted/30 p-4 rounded-lg">
                                    {(() => {
                                      try {
                                        const address = JSON.parse(selectedOrder.shippingAddress);
                                        return (
                                          <div className="space-y-1">
                                            <p className="font-medium">{address.street}</p>
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
                              </div>

                              {/* Order Items */}
                              <div>
                                <h4 className="font-semibold mb-3">Order Items</h4>
                                <div className="space-y-3 max-h-60 overflow-y-auto">
                                  {selectedOrder.orderItems.map((item, index) => (
                                    <div key={index} className="flex gap-3 p-3 border rounded-lg hover:bg-muted/30 transition-colors">
                                      <div className="relative h-16 w-16 overflow-hidden rounded-md flex-shrink-0">
                                        <Image
                                          src={item.product.srcUrl}
                                          alt={item.product.title}
                                          fill
                                          className="object-cover"
                                        />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <p className="font-medium truncate">{item.product.title}</p>
                                        {item.color && (
                                          <p className="text-sm text-muted-foreground">
                                            Color: {item.color}
                                          </p>
                                        )}
                                        <div className="flex justify-between items-center mt-1">
                                          <span className="text-sm text-muted-foreground">
                                            Qty: {item.quantity} × {formatCurrency(item.price)}
                                          </span>
                                          <span className="font-semibold">
                                            {formatCurrency(item.price * item.quantity)}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Order Summary */}
                              <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                  <h4 className="font-semibold mb-3">Order Summary</h4>
                                  <div className="space-y-3 bg-muted/30 p-4 rounded-lg">
                                    <div className="flex justify-between text-sm">
                                      <span>Subtotal</span>
                                      <span>{formatCurrency(selectedOrder.subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span>Tax</span>
                                      <span>{formatCurrency(selectedOrder.tax)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
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
                                <div>
                                  <h4 className="font-semibold mb-3">Update Order</h4>
                                  <div className="space-y-4 bg-muted/30 p-4 rounded-lg">
                                    <div>
                                      <Label className="text-sm">Order Status</Label>
                                      <Select
                                        value={selectedOrder.status}
                                        onValueChange={(value) => updateOrderStatus(selectedOrder.id, "status", value)}
                                        disabled={updatingOrder === selectedOrder.id}
                                      >
                                        <SelectTrigger className="mt-1">
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
                                      <Label className="text-sm">Payment Status</Label>
                                      <Select
                                        value={selectedOrder.paymentStatus}
                                        onValueChange={(value) => updateOrderStatus(selectedOrder.id, "paymentStatus", value)}
                                        disabled={updatingOrder === selectedOrder.id}
                                      >
                                        <SelectTrigger className="mt-1">
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
                                    <div>
                                      <Label htmlFor="tracking" className="text-sm">Tracking Number</Label>
                                      <Input
                                        id="tracking"
                                        value={selectedOrder.trackingNumber || ""}
                                        onChange={(e) => updateOrderStatus(selectedOrder.id, "trackingNumber", e.target.value)}
                                        placeholder="Enter tracking number"
                                        disabled={updatingOrder === selectedOrder.id}
                                        className="mt-1"
                                      />
                                    </div>
                                    {updatingOrder === selectedOrder.id && (
                                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
                                        Updating...
                                      </div>
                                    )}
                                  </div>
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
