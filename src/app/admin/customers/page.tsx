"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Mail, 
  Calendar, 
  ShoppingBag,
  UserCheck,
  UserX,
  ChevronDown,
  Eye
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import Link from "next/link";

import Image from "next/image";

type Customer = {
  id: string;
  name: string | null;
  email: string | null;
  role: 'USER' | 'ADMIN';
  emailVerified: Date | null;
  createdAt: Date;
  image: string | null;
  _count: {
    orders: number;
  };
  orders: {
    id: string;
    total: number;
    status: string;
    createdAt: Date;
  }[];
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    let filtered = customers;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(customer =>
        (customer: Customer) =>
          customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Role filter
    if (roleFilter !== "all") {
      filtered = filtered.filter((customer: Customer) => customer.role === roleFilter);
    }

    setFilteredCustomers(filtered);
  }, [customers, searchTerm, roleFilter]);

  const fetchCustomers = async () => {
    try {
      const response = await fetch('/api/admin/customers');
      if (response.ok) {
        const data = await response.json();
        setCustomers(data);
        setFilteredCustomers(data);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateCustomerRole = async (userId: string, newRole: 'USER' | 'ADMIN') => {
    try {
      const response = await fetch('/api/admin/customers', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, role: newRole }),
      });

      if (response.ok) {
        fetchCustomers(); // Refresh the list
      }
    } catch (error) {
      console.error('Error updating customer role:', error);
    }
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Customer Management</h1>
          <p className="text-gray-600 mt-1">Manage and view customer information</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="px-3 py-1">
            <Users className="h-4 w-4 mr-1" />
            {filteredCustomers.length} customers
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
            <p className="text-xs text-gray-500 mt-1">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Verified Emails</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {customers.filter((c: Customer) => c.emailVerified).length}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {Math.round((customers.filter((c: Customer) => c.emailVerified).length / customers.length) * 100)}% verified
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Buyers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {customers.filter((c: Customer) => c._count.orders > 0).length}
            </div>
            <p className="text-xs text-gray-500 mt-1">Have made at least 1 order</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Admin Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {customers.filter((c: Customer) => c.role === 'ADMIN').length}
            </div>
            <p className="text-xs text-gray-500 mt-1">Administrative access</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search customers by name or email..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Role Filter - Desktop */}
            <div className="hidden sm:flex gap-2">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="USER">Users</SelectItem>
                  <SelectItem value="ADMIN">Admins</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Mobile Filter Button */}
            <Button 
              variant="outline" 
              className="sm:hidden"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </div>

          {/* Mobile Filters */}
          {showMobileFilters && (
            <div className="sm:hidden mt-4 pt-4 border-t">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Filter by Role
                  </label>
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="USER">Users</SelectItem>
                      <SelectItem value="ADMIN">Admins</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </CardHeader>
      </Card>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Customer</TableHead>
                <TableHead className="hidden sm:table-cell">Role</TableHead>
                <TableHead className="hidden md:table-cell">Orders</TableHead>
                <TableHead className="hidden lg:table-cell">Joined</TableHead>
                <TableHead className="hidden lg:table-cell">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {customer.image ? (
                        <Image
                          src={customer.image}
                          alt={customer.name || 'User'}
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full"
                          unoptimized
                        />
                      ) : (
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <Users className="h-4 w-4 text-gray-500" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {customer.name || 'No name'}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {customer.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge 
                      variant={customer.role === 'ADMIN' ? 'default' : 'secondary'}
                      className="capitalize"
                    >
                      {customer.role.toLowerCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-1">
                      <ShoppingBag className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">{customer._count.orders}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-gray-500">
                    {formatDate(customer.createdAt)}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <Badge 
                      variant={customer.emailVerified ? 'default' : 'outline'}
                      className="text-xs"
                    >
                      {customer.emailVerified ? (
                        <>
                          <UserCheck className="h-3 w-3 mr-1" />
                          Verified
                        </>
                      ) : (
                        <>
                          <UserX className="h-3 w-3 mr-1" />
                          Unverified
                        </>
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedCustomer(customer)}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="hidden sm:inline ml-1">View</span>
                      </Button>
                      {customer.role !== 'ADMIN' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateCustomerRole(customer.id, 'ADMIN')}
                        >
                          Make Admin
                        </Button>
                      )}
                      {customer.role === 'ADMIN' && customer.id !== 'current-user-id' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateCustomerRole(customer.id, 'USER')}
                        >
                          Remove Admin
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredCustomers.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No customers found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </Card>

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Customer Details</h2>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedCustomer(null)}
                >
                  ×
                </Button>
              </div>

              <div className="space-y-6">
                {/* Customer Info */}
                <div className="flex items-center gap-4">
                  {selectedCustomer.image ? (
                    <Image
                      src={selectedCustomer.image}
                      alt={selectedCustomer.name || 'User'}
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded-full"
                      unoptimized
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                      <Users className="h-8 w-8 text-gray-500" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-medium">{selectedCustomer.name || 'No name'}</h3>
                    <p className="text-gray-500">{selectedCustomer.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge 
                        variant={selectedCustomer.role === 'ADMIN' ? 'default' : 'secondary'}
                      >
                        {selectedCustomer.role}
                      </Badge>
                      <Badge 
                        variant={selectedCustomer.emailVerified ? 'default' : 'outline'}
                      >
                        {selectedCustomer.emailVerified ? 'Verified' : 'Unverified'}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Recent Orders */}
                <div>
                  <h4 className="font-medium mb-3">Recent Orders</h4>
                  {selectedCustomer.orders.length > 0 ? (
                    <div className="space-y-2">
                      {selectedCustomer.orders.map((order) => (
                        <div key={order.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <div>
                            <p className="font-medium">Order #{order.id.slice(-8)}</p>
                            <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{formatCurrency(order.total)}</p>
                            <Badge variant="outline" className="text-xs">
                              {order.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">No orders found</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
