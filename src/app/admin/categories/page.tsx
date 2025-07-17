"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  subcategories: Subcategory[];
}

interface Subcategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  categoryId: number;
}

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);
  const [showNewSubcategoryForm, setShowNewSubcategoryForm] = useState<number | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingSubcategory, setEditingSubcategory] = useState<Subcategory | null>(null);

  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
  });

  const [newSubcategory, setNewSubcategory] = useState({
    name: "",
    description: "",
    categoryId: 0,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleCreateCategory = async () => {
    if (!newCategory.name.trim()) return;

    try {
      const categoryData = {
        ...newCategory,
        slug: generateSlug(newCategory.name),
      };

      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryData),
      });

      if (response.ok) {
        await fetchCategories();
        setNewCategory({ name: "", description: "" });
        setShowNewCategoryForm(false);
      } else {
        alert('Error creating category');
      }
    } catch (error) {
      console.error('Error creating category:', error);
      alert('Error creating category');
    }
  };

  const handleCreateSubcategory = async (categoryId: number) => {
    if (!newSubcategory.name.trim()) return;

    try {
      const subcategoryData = {
        ...newSubcategory,
        categoryId,
        slug: generateSlug(newSubcategory.name),
      };

      const response = await fetch('/api/subcategories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subcategoryData),
      });

      if (response.ok) {
        await fetchCategories();
        setNewSubcategory({ name: "", description: "", categoryId: 0 });
        setShowNewSubcategoryForm(null);
      } else {
        alert('Error creating subcategory');
      }
    } catch (error) {
      console.error('Error creating subcategory:', error);
      alert('Error creating subcategory');
    }
  };

  const handleDeleteCategory = async (categoryId: number) => {
    if (!confirm('Are you sure you want to delete this category? This will also delete all subcategories.')) {
      return;
    }

    try {
      const response = await fetch(`/api/categories/${categoryId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchCategories();
      } else {
        alert('Error deleting category');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Error deleting category');
    }
  };

  const handleDeleteSubcategory = async (subcategoryId: number) => {
    if (!confirm('Are you sure you want to delete this subcategory?')) {
      return;
    }

    try {
      const response = await fetch(`/api/subcategories/${subcategoryId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchCategories();
      } else {
        alert('Error deleting subcategory');
      }
    } catch (error) {
      console.error('Error deleting subcategory:', error);
      alert('Error deleting subcategory');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg text-gray-600">Loading categories...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Categories Management</h1>
        <button
          onClick={() => setShowNewCategoryForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Add New Category
        </button>
      </div>

      {/* New Category Form */}
      {showNewCategoryForm && (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Add New Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Category Name"
              className="border border-gray-300 rounded-md px-3 py-2"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description (optional)"
              className="border border-gray-300 rounded-md px-3 py-2"
              value={newCategory.description}
              onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
            />
          </div>
          <div className="flex space-x-3 mt-4">
            <button
              onClick={handleCreateCategory}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Create Category
            </button>
            <button
              onClick={() => {
                setShowNewCategoryForm(false);
                setNewCategory({ name: "", description: "" });
              }}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Categories List */}
      {categories.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500">No categories found. Create your first category!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category.id} className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-500">Slug: {category.slug}</p>
                  {category.description && (
                    <p className="text-gray-600 mt-1">{category.description}</p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowNewSubcategoryForm(category.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                  >
                    Add Subcategory
                  </button>
                  <button
                    onClick={() => setEditingCategory(category)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* New Subcategory Form */}
              {showNewSubcategoryForm === category.id && (
                <div className="bg-gray-50 rounded-md p-4 mb-4">
                  <h4 className="text-md font-medium text-gray-800 mb-3">Add Subcategory</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Subcategory Name"
                      className="border border-gray-300 rounded-md px-3 py-2"
                      value={newSubcategory.name}
                      onChange={(e) => setNewSubcategory({ ...newSubcategory, name: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="Description (optional)"
                      className="border border-gray-300 rounded-md px-3 py-2"
                      value={newSubcategory.description}
                      onChange={(e) => setNewSubcategory({ ...newSubcategory, description: e.target.value })}
                    />
                  </div>
                  <div className="flex space-x-2 mt-3">
                    <button
                      onClick={() => handleCreateSubcategory(category.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                    >
                      Create
                    </button>
                    <button
                      onClick={() => {
                        setShowNewSubcategoryForm(null);
                        setNewSubcategory({ name: "", description: "", categoryId: 0 });
                      }}
                      className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Subcategories */}
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-3">
                  Subcategories ({category.subcategories.length})
                </h4>
                {category.subcategories.length === 0 ? (
                  <p className="text-gray-500 text-sm">No subcategories yet.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {category.subcategories.map((subcategory) => (
                      <div key={subcategory.id} className="border border-gray-200 rounded-md p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-medium text-gray-900">{subcategory.name}</h5>
                            <p className="text-xs text-gray-500">Slug: {subcategory.slug}</p>
                            {subcategory.description && (
                              <p className="text-sm text-gray-600 mt-1">{subcategory.description}</p>
                            )}
                          </div>
                          <div className="flex space-x-1">
                            <button
                              onClick={() => setEditingSubcategory(subcategory)}
                              className="bg-yellow-400 text-white px-2 py-1 rounded text-xs hover:bg-yellow-500"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteSubcategory(subcategory.id)}
                              className="bg-red-400 text-white px-2 py-1 rounded text-xs hover:bg-red-500"
                            >
                              Del
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
