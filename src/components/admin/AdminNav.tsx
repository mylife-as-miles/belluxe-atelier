import Link from "next/link";

const AdminNav = () => {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/admin" className="text-xl font-bold text-gray-900">
              Belluxe Admin
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/admin/products"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Products
            </Link>
            <Link
              href="/admin/categories"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Categories
            </Link>
            <Link
              href="/admin/orders"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Orders
            </Link>
            <Link
              href="/"
              className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              View Site
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNav;
