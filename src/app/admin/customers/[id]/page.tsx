"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Mail, 
  Calendar, 
  ShoppingBag, 
  User, 
  Shield,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Package
} from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CustomerOrder = {
  id: string;
  total: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
  orderItems: {
    quantity: number;
    price: number;
    product: {
      title: string;
      srcUrl: string;
    };
  }[];
};

type CustomerDetails = {
  id: string;
  name: string | null;
  email: string | null;
  role: 'USER' | 'ADMIN';
  emailVerified: Date | null;
  createdAt: string;
  image: string | null;
  orders: CustomerOrder[];
};

export default function CustomerDetailPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const [customer, setCustomer] = useState<CustomerDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    role: "USER" as 'USER' | 'ADMIN'
  });
  const router = useRouter();

  const fetchCustomer = useCallback(async () => {
    try {
      const response = await fetch(`/api/admin/customers/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setCustomer(data);
        setEditData({
          name: data.name || "",
          email: data.email || "",
          role: data.role
        });
      } else if (response.status === 404) {
        router.push('/admin/customers');
        alert("Customer not found");
      }
    } catch (error) {
      console.error('Error fetching customer:', error);
      alert("Failed to fetch customer details");
    } finally {
      setLoading(false);
    }
  }, [params.id, router]);

  useEffect(() => {
    fetchCustomer();
  }, [fetchCustomer]);

  const handleUpdateCustomer = async () => {
    try {
      const response = await fetch(`/api/admin/customers/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editData),
      });

      if (response.ok) {
        await fetchCustomer();
        setEditModalOpen(false);
        alert("Customer updated successfully");
      } else {
        alert("Failed to update customer");
      }
    } catch (error) {
      console.error('Error updating customer:', error);
      alert("Failed to update customer");
    }
  };

  const handleDeleteCustomer = async () => {
    try {
      const response = await fetch(`/api/admin/customers/${params.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/admin/customers');
        alert("Customer deleted successfully");
      } else {
        const error = await response.json();
        alert(error.error || "Failed to delete customer");
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
      alert("Failed to delete customer");
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Customer Not Found</h2>
        <Button asChild>
          <Link href="/admin/customers">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Customers
          </Link>
        </Button>
      </div>
    );
  }

  const totalSpent = customer.orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = customer.orders.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/customers">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Customer Details
            </h1>
            <p className="text-gray-600 mt-1">
              Manage customer information and view order history
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Customer</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    placeholder="Customer name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    placeholder="customer@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={editData.role} onValueChange={(value: 'USER' | 'ADMIN') => setEditData({ ...editData, role: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USER">User</SelectItem>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setEditModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateCustomer}>
                  Save Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Customer</DialogTitle>
              </DialogHeader>
              <p className="py-4">
                Are you sure you want to delete this customer? This action cannot be undone.
                {totalOrders > 0 && (
                  <span className="block mt-2 text-red-600 font-medium">
                    Note: This customer has {totalOrders} orders and cannot be deleted.
                  </span>
                )}
              </p>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={handleDeleteCustomer}
                  disabled={totalOrders > 0}
                >
                  Delete Customer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Customer Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Basic Info */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Customer Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                {customer.image ? (
                  <Image
                    src={customer.image}
                    alt={customer.name || 'User'}
                    width={64}
                    height={64}
                    style={{ objectFit: 'cover', borderRadius: '9999px' }}
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="h-8 w-8 text-gray-500" />
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-semibold">
                    {customer.name || 'No Name'}
                  </h3>
                  <p className="text-gray-600 flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    {customer.email}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 ml-auto">
                <Badge variant={customer.role === 'ADMIN' ? 'default' : 'secondary'}>
                  {customer.role === 'ADMIN' ? (
                    <>
                      <Shield className="h-3 w-3 mr-1" />
                      Admin
                    </>
                  ) : (
                    <>
                      <User className="h-3 w-3 mr-1" />
                      User
                    </>
                  )}
                </Badge>
                <Badge variant={customer.emailVerified ? 'default' : 'destructive'}>
                  {customer.emailVerified ? (
                    <>
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </>
                  ) : (
                    <>
                      <XCircle className="h-3 w-3 mr-1" />
                      Unverified
                    </>
                  )}
                </Badge>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Joined</p>
                <p className="font-medium flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(customer.createdAt)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatDistanceToNow(new Date(customer.createdAt), { addSuffix: true })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email Status</p>
                <p className="font-medium">
                  {customer.emailVerified ? 'Verified' : 'Pending verification'}
                </p>
                {customer.emailVerified && (
                  <p className="text-xs text-gray-500 mt-1">
                    Verified {formatDistanceToNow(new Date(customer.emailVerified), { addSuffix: true })}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Order Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{totalOrders}</p>
              <p className="text-sm text-gray-600">Total Orders</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{formatCurrency(totalSpent)}</p>
              <p className="text-sm text-gray-600">Total Spent</p>
            </div>
            {totalOrders > 0 && (
              <div className="text-center">
                <p className="text-lg font-semibold">{formatCurrency(totalSpent / totalOrders)}</p>
                <p className="text-sm text-gray-600">Average Order Value</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Order History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Order History
            <Badge variant="outline" className="ml-auto">
              {totalOrders} orders
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {customer.orders.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Orders Yet</h3>
              <p className="text-gray-600">This customer hasn&apos;t placed any orders.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {customer.orders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-4 mb-2">
                        <Link 
                          href={`/admin/orders/${order.id}`}
                          className="font-medium text-blue-600 hover:text-blue-800"
                        >
                          Order #{order.id.slice(-8)}
                        </Link>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                        <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                          {order.paymentStatus}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold">{formatCurrency(order.total)}</p>
                      <p className="text-sm text-gray-600">
                        {order.orderItems.length} item{order.orderItems.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  
                  {/* Order Items Preview */}
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {order.orderItems.slice(0, 3).map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                        <Image
                          src={item.product.srcUrl}
                          alt={item.product.title}
                          width={40}
                          height={40}
                          style={{ objectFit: 'cover', borderRadius: '0.375rem' }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.product.title}</p>
                          <p className="text-xs text-gray-600">
                            Qty: {item.quantity} × {formatCurrency(item.price)}
                          </p>
                        </div>
                      </div>
                    ))}
                    {order.orderItems.length > 3 && (
                      <div className="flex items-center justify-center p-2 bg-gray-50 rounded text-sm text-gray-600">
                        +{order.orderItems.length - 3} more items
                      </div>
                    )}
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
