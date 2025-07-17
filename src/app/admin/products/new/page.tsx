"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    srcUrl: "",
    gallery: [""],
    price: "",
    discountAmount: "",
    discountPercentage: "",
    rating: "",
    categoryId: "",
    subcategoryId: "",
    description: "",
    colors: [""],
    specifications: [{ key: "", value: "" }],
    faqs: [{ question: "", answer: "" }],
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (formData.categoryId) {
      const selectedCategory = categories.find(cat => cat.id === parseInt(formData.categoryId));
      setSubcategories(selectedCategory?.subcategories || []);
      setFormData(prev => ({ ...prev, subcategoryId: "" })); // Reset subcategory when category changes
    } else {
      setSubcategories([]);
    }
  }, [formData.categoryId, categories]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const result = await response.json();
    return result.url;
  };

  const handleMainImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const url = await uploadToCloudinary(file);
      setFormData({ ...formData, srcUrl: url });
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleGalleryImageUpload = async (index: number, file: File) => {
    setUploadingImage(true);
    try {
      const url = await uploadToCloudinary(file);
      handleGalleryChange(index, url);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

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
        categoryId: parseInt(formData.categoryId),
        subcategoryId: formData.subcategoryId ? parseInt(formData.subcategoryId) : null,
        description: formData.description,
        colors: formData.colors.filter(color => color.trim() !== ""),
        specifications: formData.specifications.filter(spec => spec.key.trim() !== "" && spec.value.trim() !== ""),
        faqs: formData.faqs.filter(faq => faq.question.trim() !== "" && faq.answer.trim() !== ""),
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

  // Colors handlers
  const handleColorChange = (index: number, value: string) => {
    const newColors = [...formData.colors];
    newColors[index] = value;
    setFormData({ ...formData, colors: newColors });
  };

  const addColorField = () => {
    setFormData({ ...formData, colors: [...formData.colors, ""] });
  };

  const removeColorField = (index: number) => {
    const newColors = formData.colors.filter((_, i) => i !== index);
    setFormData({ ...formData, colors: newColors });
  };

  // Specifications handlers
  const handleSpecificationChange = (index: number, field: string, value: string) => {
    const newSpecs = [...formData.specifications];
    newSpecs[index] = { ...newSpecs[index], [field]: value };
    setFormData({ ...formData, specifications: newSpecs });
  };

  const addSpecificationField = () => {
    setFormData({ 
      ...formData, 
      specifications: [...formData.specifications, { key: "", value: "" }] 
    });
  };

  const removeSpecificationField = (index: number) => {
    const newSpecs = formData.specifications.filter((_, i) => i !== index);
    setFormData({ ...formData, specifications: newSpecs });
  };

  // FAQ handlers
  const handleFaqChange = (index: number, field: string, value: string) => {
    const newFaqs = [...formData.faqs];
    newFaqs[index] = { ...newFaqs[index], [field]: value };
    setFormData({ ...formData, faqs: newFaqs });
  };

  const addFaqField = () => {
    setFormData({ 
      ...formData, 
      faqs: [...formData.faqs, { question: "", answer: "" }] 
    });
  };

  const removeFaqField = (index: number) => {
    const newFaqs = formData.faqs.filter((_, i) => i !== index);
    setFormData({ ...formData, faqs: newFaqs });
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
              Main Product Image
            </label>
            <div className="space-y-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleMainImageUpload}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                disabled={uploadingImage}
              />
              {uploadingImage && (
                <p className="text-sm text-blue-600">Uploading image...</p>
              )}
              {formData.srcUrl && (
                <div className="mt-2">
                  <img 
                    src={formData.srcUrl} 
                    alt="Preview" 
                    className="h-32 w-32 object-cover rounded-md border"
                  />
                </div>
              )}
            </div>
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
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subcategory
            </label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={formData.subcategoryId}
              onChange={(e) => setFormData({ ...formData, subcategoryId: e.target.value })}
              disabled={!formData.categoryId || subcategories.length === 0}
            >
              <option value="">Select Subcategory (Optional)</option>
              {subcategories.map((subcategory) => (
                <option key={subcategory.id} value={subcategory.id}>
                  {subcategory.name}
                </option>
              ))}
            </select>
            {!formData.categoryId && (
              <p className="text-sm text-gray-500 mt-1">Select a category first</p>
            )}
            {formData.categoryId && subcategories.length === 0 && (
              <p className="text-sm text-gray-500 mt-1">No subcategories available for this category</p>
            )}
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
            Gallery Images
          </label>
          {formData.gallery.map((url, index) => (
            <div key={index} className="space-y-2 mb-4 p-4 border border-gray-200 rounded-md">
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleGalleryImageUpload(index, file);
                    }
                  }}
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                  disabled={uploadingImage}
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
              {url && (
                <div className="mt-2">
                  <img 
                    src={url} 
                    alt={`Gallery ${index + 1}`} 
                    className="h-24 w-24 object-cover rounded-md border"
                  />
                </div>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addGalleryField}
            className="bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600 mt-2"
            disabled={uploadingImage}
          >
            Add Gallery Image
          </button>
        </div>

        {/* Description */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Description
          </label>
          <textarea
            rows={4}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Enter detailed product description..."
          />
        </div>

        {/* Colors */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Available Colors
          </label>
          {formData.colors.map((color, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                value={color}
                onChange={(e) => handleColorChange(index, e.target.value)}
                placeholder="Color name (e.g., Black, Silver, Gold)"
              />
              {formData.colors.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeColorField(index)}
                  className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addColorField}
            className="bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600 mt-2"
          >
            Add Color
          </button>
        </div>

        {/* Product Specifications */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Product Specifications
            </label>
            <button
              type="button"
              onClick={() => {
                const watchSpecs = [
                  { key: "Movement", value: "Swiss Automatic" },
                  { key: "Case Material", value: "Stainless Steel" },
                  { key: "Water Resistance", value: "100m / 330ft" },
                  { key: "Crystal", value: "Sapphire Crystal" },
                  { key: "Case Diameter", value: "42mm" },
                  { key: "Band Material", value: "Leather" }
                ];
                setFormData({ ...formData, specifications: watchSpecs });
              }}
              className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-md hover:bg-blue-200"
            >
              Load Watch Template
            </button>
          </div>
          {formData.specifications.map((spec, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3 p-3 border border-gray-200 rounded-md">
              <input
                type="text"
                className="border border-gray-300 rounded-md px-3 py-2"
                value={spec.key}
                onChange={(e) => handleSpecificationChange(index, 'key', e.target.value)}
                placeholder="Specification name (e.g., Movement, Case Material)"
              />
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                  value={spec.value}
                  onChange={(e) => handleSpecificationChange(index, 'value', e.target.value)}
                  placeholder="Specification value (e.g., Swiss Automatic, Stainless Steel)"
                />
                {formData.specifications.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSpecificationField(index)}
                    className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addSpecificationField}
            className="bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600 mt-2"
          >
            Add Specification
          </button>
        </div>

        {/* FAQs */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Frequently Asked Questions (FAQs)
            </label>
            <button
              type="button"
              onClick={() => {
                const defaultFaqs = [
                  { 
                    question: "What materials are used in this product?", 
                    answer: "This product is made from high-quality materials including premium metals and genuine leather where applicable." 
                  },
                  { 
                    question: "Is this product water-resistant?", 
                    answer: "Yes, this product features water resistance suitable for daily wear and light water exposure." 
                  },
                  { 
                    question: "What warranty is included?", 
                    answer: "This product comes with a 2-year international warranty covering manufacturing defects." 
                  }
                ];
                setFormData({ ...formData, faqs: defaultFaqs });
              }}
              className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-md hover:bg-green-200"
            >
              Load FAQ Template
            </button>
          </div>
          {formData.faqs.map((faq, index) => (
            <div key={index} className="mb-4 p-4 border border-gray-200 rounded-md">
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2"
                value={faq.question}
                onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
                placeholder="FAQ Question (e.g., Is this watch waterproof?)"
              />
              <textarea
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={faq.answer}
                onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
                placeholder="FAQ Answer (e.g., Yes, this watch has 100m water resistance...)"
              />
              {formData.faqs.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFaqField(index)}
                  className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 mt-2"
                >
                  Remove FAQ
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addFaqField}
            className="bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600 mt-2"
          >
            Add FAQ
          </button>
        </div>        <div className="mt-6 flex justify-end space-x-3">
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
