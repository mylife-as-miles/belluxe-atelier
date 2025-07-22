"use client";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import AdminHeader from "@/components/admin/AdminHeader";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Menu,
  X,
  LayoutDashboard,
  Package,
  Users,
  FolderOpen,
  ShoppingCart
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
      current: pathname === '/admin'
    },
    {
      name: 'Products',
      href: '/admin/products',
      icon: Package,
      current: pathname.startsWith('/admin/products')
    },
    {
      name: 'Categories',
      href: '/admin/categories',
      icon: FolderOpen,
      current: pathname === '/admin/categories'
    },
    {
      name: 'Orders',
      href: '/admin/orders',
      icon: ShoppingCart,
      current: pathname === '/admin/orders'
    },
    {
      name: 'Customers',
      href: '/admin/customers',
      icon: Users,
      current: pathname === '/admin/customers'
    }
  ];

  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        
        {/* Desktop Navigation */}
        <nav className="hidden md:block bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center space-x-8">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link 
                      key={item.name}
                      href={item.href} 
                      className={cn(
                        "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                        item.current
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                      )}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
            <span className="font-medium text-gray-900">Admin Panel</span>
            <div className="w-8" /> {/* Spacer for alignment */}
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="bg-white border-b shadow-lg">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors",
                        item.current
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </AdminAuthGuard>
  );
}
