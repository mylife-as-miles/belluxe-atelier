import { useEffect, useState } from "react";
import ProductListSec from "@/components/common/ProductListSec";
import { Product } from "@/types/product.types";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>
      <ProductListSec
        title="Manage Products"
        data={products}
        viewAllLink="/admin/products/new"
      />
    </div>
  );
}