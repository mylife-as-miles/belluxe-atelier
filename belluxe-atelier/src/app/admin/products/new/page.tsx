import { useState } from "react";
import { useRouter } from "next/router";
import ProductForm from "@/components/admin/ProductForm";
import { Product } from "@/types/product.types";

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (product: Product) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      router.push("/admin/products");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ProductForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}