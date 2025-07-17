import Link from "next/link";

async function getProducts() {
  const res = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3001'}/api/products`, { 
    cache: 'no-store' 
  });
  if (!res.ok) {
    return [];
  }
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <Link 
          href="/admin/products/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Add New Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500">No products found. Create your first product!</p>
          <Link 
            href="/admin/products/new"
            className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Add New Product
          </Link>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {products.map((product: any) => (
              <li key={product.id}>
                <div className="px-4 py-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <img 
                      className="h-16 w-16 object-cover rounded-md" 
                      src={product.srcUrl} 
                      alt={product.title}
                    />
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{product.title}</h3>
                      <p className="text-sm text-gray-500">{product.category} • {product.subcategory}</p>
                      <p className="text-sm font-medium text-gray-900">${product.price}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Link 
                      href={`/admin/products/${product.id}/edit`}
                      className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600 transition-colors"
                    >
                      Edit
                    </Link>
                    <button className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors">
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
