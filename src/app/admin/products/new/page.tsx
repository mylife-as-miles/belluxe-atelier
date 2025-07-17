"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    srcUrl: "",
    gallery: [""],
    price: "",
    discountAmount: "",
    discountPercentage: "",
    rating: "",
    category: "",
    subcategory: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productData = {
        title: formData.title,
        srcUrl: formData.srcUrl,
        gallery: formData.gallery.filter(url => url.trim() !== ""),
        price: parseFloat(formData.price),
        discount: {
          amount: parseFloat(formData.discountAmount) || 0,
          percentage: parseFloat(formData.discountPercentage) || 0,
        },
        rating: parseFloat(formData.rating),
        category: formData.category,
        subcategory: formData.subcategory,
      };

      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        router.push("/admin/products");
      } else {
        alert("Error creating product");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error creating product");
    } finally {
      setLoading(false);
    }
  };

  const handleGalleryChange = (index: number, value: string) => {
    const newGallery = [...formData.gallery];
    newGallery[index] = value;
    setFormData({ ...formData, gallery: newGallery });
  };

  const addGalleryField = () => {
    setFormData({ ...formData, gallery: [...formData.gallery, ""] });
  };

  const removeGalleryField = (index: number) => {
    const newGallery = formData.gallery.filter((_, i) => i !== index);
    setFormData({ ...formData, gallery: newGallery });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Product</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Title
            </label>
            <input
              type="text"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price ($)
            </label>
            <input
              type="number"
              step="0.01"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Main Image URL
            </label>
            <input
              type="url"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={formData.srcUrl}
              onChange={(e) => setFormData({ ...formData, srcUrl: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating (1-5)
            </label>
            <input
              type="number"
              min="1"
              max="5"
              step="0.1"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="">Select Category</option>
              <option value="watches">Watches</option>
              <option value="earrings">Earrings</option>
              <option value="necklaces">Necklaces</option>
              <option value="rings">Rings</option>
              <option value="bracelets">Bracelets</option>
              <option value="jewelry-sets">Jewelry Sets</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subcategory
            </label>
            <input
              type="text"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={formData.subcategory}
              onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Discount Amount ($)
            </label>
            <input
              type="number"
              step="0.01"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={formData.discountAmount}
              onChange={(e) => setFormData({ ...formData, discountAmount: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Discount Percentage (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={formData.discountPercentage}
              onChange={(e) => setFormData({ ...formData, discountPercentage: e.target.value })}
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gallery Images (URLs)
          </label>
          {formData.gallery.map((url, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="url"
                className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                value={url}
                onChange={(e) => handleGalleryChange(index, e.target.value)}
                placeholder="Image URL"
              />
              {formData.gallery.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeGalleryField(index)}
                  className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addGalleryField}
            className="bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600 mt-2"
          >
            Add Gallery Image
          </button>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
