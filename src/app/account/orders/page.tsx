"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  Package, 
  Calendar, 
  CreditCard, 
  Truck, 
  Search,
  Filter,
  RefreshCw,
  Eye,
  Download,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface OrderItem {
  id: number;
  productId: number;
  quantity: number;
  price: number;
  color?: string;
  product: {
    id: number;
    title: string;
    srcUrl: string;
    gallery: string;
  };
}

interface Order {
  id: string;
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  shippingAddress: string;
  billingAddress?: string;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: string;
  paymentStatus: string;
  paymentMethod?: string;
  trackingNumber?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  orderItems: OrderItem[];
}

const statusColors = {
  PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
  CONFIRMED: "bg-blue-100 text-blue-800 border-blue-200",
  PROCESSING: "bg-purple-100 text-purple-800 border-purple-200",
  SHIPPED: "bg-indigo-100 text-indigo-800 border-indigo-200",
  DELIVERED: "bg-green-100 text-green-800 border-green-200",
  CANCELLED: "bg-red-100 text-red-800 border-red-200",
  REFUNDED: "bg-gray-100 text-gray-800 border-gray-200",
};

const paymentStatusColors = {
  PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
  PAID: "bg-green-100 text-green-800 border-green-200",
  FAILED: "bg-red-100 text-red-800 border-red-200",
  REFUNDED: "bg-gray-100 text-gray-800 border-gray-200",
};

export default function AccountOrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "loading") return; // Still loading
    if (!session) {
      router.push("/auth/signin?callbackUrl=/account/orders");
      return;
    }
  }, [session, status, router]);

  // Fetch user's orders
  useEffect(() => {
    const fetchOrders = async () => {
      if (!session?.user?.email) return;
      
      try {
        const response = await fetch(`/api/orders/user?email=${encodeURIComponent(session.user.email)}`);
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          console.error("Failed to fetch orders");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [session]);

  // Filter orders based on search and filters
  const filteredOrders = orders.filter(order => {
    const matchesSearch = searchTerm === "" || 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    const matchesDate = dateFilter === "all" || (() => {
      const orderDate = new Date(order.createdAt);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - orderDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      switch (dateFilter) {
        case "7days": return diffDays <= 7;
        case "30days": return diffDays <= 30;
        case "90days": return diffDays <= 90;
        default: return true;
      }
    })();
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const getStatusBadge = (status: string, type: "status" | "payment") => {
    const colors = type === "status" ? statusColors : paymentStatusColors;
    return (
      <Badge 
        variant="outline" 
        className={`${colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800"} font-medium`}
      >
        {status.replace("_", " ")}
      </Badge>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <RefreshCw className="h-5 w-5 animate-spin" />
          <span>Loading your orders...</span>
        </div>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/profile">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Profile
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600 mt-2">Track and manage your order history</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="search">Search Orders</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Order ID or customer name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="status">Order Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                    <SelectItem value="PROCESSING">Processing</SelectItem>
                    <SelectItem value="SHIPPED">Shipped</SelectItem>
                    <SelectItem value="DELIVERED">Delivered</SelectItem>
                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="date">Date Range</Label>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="7days">Last 7 days</SelectItem>
                    <SelectItem value="30days">Last 30 days</SelectItem>
                    <SelectItem value="90days">Last 90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button 
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                    setDateFilter("all");
                  }}
                  variant="outline"
                  className="w-full"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-600 mb-6">
                {orders.length === 0 
                  ? "You haven&apos;t placed any orders yet."
                  : "No orders match your current filters."
                }
              </p>
              <Link href="/shop">
                <Button>Start Shopping</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="bg-gray-50 border-b">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                      <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(order.createdAt)}
                        </div>
                        <div className="flex items-center gap-1">
                          <CreditCard className="h-4 w-4" />
                          {order.paymentMethod || "N/A"}
                        </div>
                        {order.trackingNumber && (
                          <div className="flex items-center gap-1">
                            <Truck className="h-4 w-4" />
                            {order.trackingNumber}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col lg:items-end gap-2">
                      <div className="flex gap-2">
                        {getStatusBadge(order.status, "status")}
                        {getStatusBadge(order.paymentStatus, "payment")}
                      </div>
                      <div className="text-lg font-semibold">
                        {formatCurrency(order.total)}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  {/* Order Items */}
                  <div className="space-y-4 mb-6">
                    {order.orderItems.map((item) => {
                      const gallery = item.product.gallery ? JSON.parse(item.product.gallery) : [];
                      const imageUrl = gallery[0] || item.product.srcUrl || "/images/placeholder.png";
                      
                      return (
                        <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                          <div className="w-16 h-16 relative bg-white rounded-md overflow-hidden border">
                            <Image
                              src={imageUrl}
                              alt={item.product.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{item.product.title}</h4>
                            <div className="text-sm text-gray-600 mt-1">
                              <span>Quantity: {item.quantity}</span>
                              {item.color && <span className="ml-4">Color: {item.color}</span>}
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="font-medium">{formatCurrency(item.price)}</div>
                            <div className="text-sm text-gray-600">per item</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Order Summary */}
                  <Separator className="mb-4" />
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Shipping Address</h4>
                      <p className="text-sm text-gray-600 whitespace-pre-line">
                        {order.shippingAddress}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Order Summary</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span>{formatCurrency(order.subtotal)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Shipping</span>
                          <span>{formatCurrency(order.shipping)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tax</span>
                          <span>{formatCurrency(order.tax)}</span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex justify-between font-medium">
                          <span>Total</span>
                          <span>{formatCurrency(order.total)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <Separator className="my-4" />
                  <div className="flex gap-2">
                    <Link href={`/order-confirmation/${order.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download Invoice
                    </Button>
                    {order.status === "SHIPPED" && order.trackingNumber && (
                      <Button variant="outline" size="sm">
                        <Truck className="h-4 w-4 mr-2" />
                        Track Package
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
