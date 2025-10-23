import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Package, 
  Folder, 
  Users, 
  ShoppingCart,
  BarChart3,
  Settings
} from "lucide-react";

export default function AdminDashboard() {
  const adminCards = [
    {
      title: "Products",
      description: "Manage your product catalog",
      href: "/admin/products",
      icon: Package,
      color: "bg-blue-500",
      available: true
    },
    {
      title: "Categories", 
      description: "Manage product categories and subcategories",
      href: "/admin/categories",
      icon: Folder,
      color: "bg-green-500",
      available: true
    },
    {
      title: "Customers",
      description: "Manage customer data and profiles",
      href: "/admin/customers",
      icon: Users,
      color: "bg-purple-500",
      available: true
    },
    {
      title: "Orders",
      description: "Track and manage customer orders",
      href: "/admin/orders",
      icon: ShoppingCart,
      color: "bg-orange-500",
      available: true
    },
    {
      title: "Analytics",
      description: "View sales and performance metrics",
      href: "/admin/analytics",
      icon: BarChart3,
      color: "bg-indigo-500",
      available: false
    },
    {
      title: "Settings",
      description: "Configure store settings and preferences",
      href: "/admin/settings",
      icon: Settings,
      color: "bg-gray-500",
      available: false
    }
  ];

  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome to the Nessa Atelier admin panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {adminCards.map((card) => {
          const IconComponent = card.icon;
          
          if (card.available) {
            return (
              <Link 
                key={card.title}
                href={card.href}
                className="block group hover:scale-105 transition-transform duration-200"
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 w-12 h-12 ${card.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                          {card.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          }
          
          return (
            <div 
              key={card.title}
              className="block group cursor-not-allowed opacity-60"
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-12 h-12 ${card.color} rounded-lg flex items-center justify-center`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {card.title}
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          Coming Soon
                        </span>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
      
      <div className="mt-8 p-4 md:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Quick Stats</h2>
        <p className="text-sm text-gray-600 mb-4">
          Your store overview will appear here once you start adding products and receiving orders.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-white rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">0</div>
            <div className="text-xs text-gray-500">Products</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">0</div>
            <div className="text-xs text-gray-500">Orders</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-600">0</div>
            <div className="text-xs text-gray-500">Customers</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-orange-600">₦0</div>
            <div className="text-xs text-gray-500">Revenue</div>
          </div>
        </div>
      </div>
    </div>
  );
}
