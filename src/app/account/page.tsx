"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Package, 
  CreditCard, 
  Settings, 
  Bell,
  MapPin,
  Shield,
  ArrowRight,
  Mail,
  Phone
} from "lucide-react";
import Link from "next/link";

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "loading") return; // Still loading
    if (!session) {
      router.push("/auth/signin?callbackUrl=/account");
      return;
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect
  }

  const menuItems = [
    {
      title: "My Orders",
      description: "Track and manage your order history",
      icon: Package,
      href: "/account/orders",
      color: "text-blue-600 bg-blue-50",
    },
    {
      title: "Profile Settings",
      description: "Update your personal information",
      icon: User,
      href: "/profile",
      color: "text-green-600 bg-green-50",
    },
    {
      title: "Payment Methods",
      description: "Manage your saved payment methods",
      icon: CreditCard,
      href: "/account/payment-methods",
      color: "text-purple-600 bg-purple-50",
    },
    {
      title: "Address Book",
      description: "Manage your shipping and billing addresses",
      icon: MapPin,
      href: "/account/addresses",
      color: "text-orange-600 bg-orange-50",
    },
    {
      title: "Notifications",
      description: "Configure your notification preferences",
      icon: Bell,
      href: "/account/notifications",
      color: "text-indigo-600 bg-indigo-50",
    },
    {
      title: "Security",
      description: "Password and security settings",
      icon: Shield,
      href: "/account/security",
      color: "text-red-600 bg-red-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
          <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Name</label>
                  <p className="text-gray-900">{session.user?.name || "Not provided"}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <p className="text-gray-900">{session.user?.email}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Member Since</label>
                  <p className="text-gray-900">
                    {new Date().toLocaleDateString("en-US", { 
                      year: "numeric", 
                      month: "long" 
                    })}
                  </p>
                </div>

                <Link href="/profile">
                  <Button className="w-full mt-4">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Account Menu */}
          <div className="lg:col-span-2">
            <div className="grid md:grid-cols-2 gap-4">
              {menuItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg ${item.color}`}>
                            <item.icon className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {item.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/shop">
              <Button variant="outline" className="w-full justify-start">
                <Package className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
            
            <Link href="/account/orders">
              <Button variant="outline" className="w-full justify-start">
                <Package className="h-4 w-4 mr-2" />
                View Recent Orders
              </Button>
            </Link>
            
            <Link href="/cart">
              <Button variant="outline" className="w-full justify-start">
                <Package className="h-4 w-4 mr-2" />
                View Cart
              </Button>
            </Link>
            
            <Link href="/auth/signout">
              <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                <Shield className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
