"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Plus, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Folder,
  Tag,
  Save,
  X 
} from "lucide-react";

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
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewCategoryDialog, setShowNewCategoryDialog] = useState(false);
  const [showNewSubcategoryDialog, setShowNewSubcategoryDialog] = useState<number | null>(null);
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

  const [editCategoryData, setEditCategoryData] = useState({
    name: "",
    description: "",
  });

  const [editSubcategoryData, setEditSubcategoryData] = useState({
    name: "",
    description: "",
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
        setShowNewCategoryDialog(false);
        alert('Category created successfully');
      } else {
        alert('Error creating category');
      }
    } catch (error) {
      console.error('Error creating category:', error);
      alert('Error creating category');
    }
  };

  const handleCreateSubcategory = async () => {
    if (!newSubcategory.name.trim() || !newSubcategory.categoryId) return;

    try {
      const subcategoryData = {
        ...newSubcategory,
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
        setShowNewSubcategoryDialog(null);
        alert('Subcategory created successfully');
      } else {
        alert('Error creating subcategory');
      }
    } catch (error) {
      console.error('Error creating subcategory:', error);
      alert('Error creating subcategory');
    }
  };

  const handleUpdateCategory = async () => {
    if (!editingCategory || !editCategoryData.name.trim()) return;

    try {
      const categoryData = {
        ...editCategoryData,
        slug: generateSlug(editCategoryData.name),
      };

      const response = await fetch(`/api/categories/${editingCategory.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryData),
      });

      if (response.ok) {
        await fetchCategories();
        setEditingCategory(null);
        setEditCategoryData({ name: "", description: "" });
        alert('Category updated successfully');
      } else {
        alert('Error updating category');
      }
    } catch (error) {
      console.error('Error updating category:', error);
      alert('Error updating category');
    }
  };

  const handleUpdateSubcategory = async () => {
    if (!editingSubcategory || !editSubcategoryData.name.trim()) return;

    try {
      const subcategoryData = {
        ...editSubcategoryData,
        slug: generateSlug(editSubcategoryData.name),
      };

      const response = await fetch(`/api/subcategories/${editingSubcategory.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subcategoryData),
      });

      if (response.ok) {
        await fetchCategories();
        setEditingSubcategory(null);
        setEditSubcategoryData({ name: "", description: "" });
        alert('Subcategory updated successfully');
      } else {
        alert('Error updating subcategory');
      }
    } catch (error) {
      console.error('Error updating subcategory:', error);
      alert('Error updating subcategory');
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
        alert('Category deleted successfully');
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
        alert('Subcategory deleted successfully');
      } else {
        alert('Error deleting subcategory');
      }
    } catch (error) {
      console.error('Error deleting subcategory:', error);
      alert('Error deleting subcategory');
    }
  };

  const openEditCategory = (category: Category) => {
    setEditingCategory(category);
    setEditCategoryData({
      name: category.name,
      description: category.description || "",
    });
  };

  const openEditSubcategory = (subcategory: Subcategory) => {
    setEditingSubcategory(subcategory);
    setEditSubcategoryData({
      name: subcategory.name,
      description: subcategory.description || "",
    });
  };

  const resetNewSubcategory = (categoryId: number) => {
    setNewSubcategory({ name: "", description: "", categoryId });
    setShowNewSubcategoryDialog(categoryId);
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Categories Management</h1>
          <p className="text-muted-foreground">
            Organize your products with categories and subcategories
          </p>
        </div>
        <Dialog open={showNewCategoryDialog} onOpenChange={setShowNewCategoryDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Category</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="category-name">Category Name</Label>
                <Input
                  id="category-name"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  placeholder="Enter category name"
                />
              </div>
              <div>
                <Label htmlFor="category-description">Description (Optional)</Label>
                <Textarea
                  id="category-description"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  placeholder="Enter category description"
                  rows={3}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowNewCategoryDialog(false);
                    setNewCategory({ name: "", description: "" });
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateCategory} disabled={!newCategory.name.trim()}>
                  <Save className="h-4 w-4 mr-2" />
                  Create Category
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Folder className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Categories</p>
                <p className="text-2xl font-bold">{categories.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Subcategories</p>
                <p className="text-2xl font-bold">
                  {categories.reduce((sum, cat) => sum + cat.subcategories.length, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Categories List */}
      <div className="grid gap-6">
        {loading ? (
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
                <p className="mt-2 text-muted-foreground">Loading categories...</p>
              </div>
            </CardContent>
          </Card>
        ) : categories.length === 0 ? (
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <Folder className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <p className="text-muted-foreground">No categories found</p>
                <p className="text-sm text-muted-foreground">Create your first category to get started</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          categories.map((category) => (
            <Card key={category.id}>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="flex items-center gap-2">
                      <Folder className="h-5 w-5 text-blue-600" />
                      {category.name}
                      <Badge variant="secondary" className="ml-2">
                        {category.subcategories.length} subcategories
                      </Badge>
                    </CardTitle>
                    {category.description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {category.description}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => resetNewSubcategory(category.id)}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      <span className="hidden md:inline">Add Subcategory</span>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEditCategory(category)}>
                          <Edit2 className="h-4 w-4 mr-2" />
                          Edit Category
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDeleteCategory(category.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Category
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {category.subcategories.length === 0 ? (
                  <div className="text-center py-4 text-muted-foreground text-sm">
                    No subcategories yet
                  </div>
                ) : (
                  <div className="grid gap-2">
                    {category.subcategories.map((subcategory) => (
                      <div
                        key={subcategory.id}
                        className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <Tag className="h-4 w-4 text-green-600" />
                            <span className="font-medium">{subcategory.name}</span>
                          </div>
                          {subcategory.description && (
                            <p className="text-sm text-muted-foreground mt-1 ml-6">
                              {subcategory.description}
                            </p>
                          )}
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openEditSubcategory(subcategory)}>
                              <Edit2 className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDeleteSubcategory(subcategory.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Edit Category Dialog */}
      <Dialog open={!!editingCategory} onOpenChange={(open) => !open && setEditingCategory(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-category-name">Category Name</Label>
              <Input
                id="edit-category-name"
                value={editCategoryData.name}
                onChange={(e) => setEditCategoryData({ ...editCategoryData, name: e.target.value })}
                placeholder="Enter category name"
              />
            </div>
            <div>
              <Label htmlFor="edit-category-description">Description (Optional)</Label>
              <Textarea
                id="edit-category-description"
                value={editCategoryData.description}
                onChange={(e) => setEditCategoryData({ ...editCategoryData, description: e.target.value })}
                placeholder="Enter category description"
                rows={3}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setEditingCategory(null);
                  setEditCategoryData({ name: "", description: "" });
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleUpdateCategory} disabled={!editCategoryData.name.trim()}>
                <Save className="h-4 w-4 mr-2" />
                Update Category
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Subcategory Dialog */}
      <Dialog open={!!editingSubcategory} onOpenChange={(open) => !open && setEditingSubcategory(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Subcategory</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-subcategory-name">Subcategory Name</Label>
              <Input
                id="edit-subcategory-name"
                value={editSubcategoryData.name}
                onChange={(e) => setEditSubcategoryData({ ...editSubcategoryData, name: e.target.value })}
                placeholder="Enter subcategory name"
              />
            </div>
            <div>
              <Label htmlFor="edit-subcategory-description">Description (Optional)</Label>
              <Textarea
                id="edit-subcategory-description"
                value={editSubcategoryData.description}
                onChange={(e) => setEditSubcategoryData({ ...editSubcategoryData, description: e.target.value })}
                placeholder="Enter subcategory description"
                rows={3}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setEditingSubcategory(null);
                  setEditSubcategoryData({ name: "", description: "" });
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleUpdateSubcategory} disabled={!editSubcategoryData.name.trim()}>
                <Save className="h-4 w-4 mr-2" />
                Update Subcategory
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* New Subcategory Dialog */}
      <Dialog open={!!showNewSubcategoryDialog} onOpenChange={(open) => !open && setShowNewSubcategoryDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Subcategory</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="new-subcategory-name">Subcategory Name</Label>
              <Input
                id="new-subcategory-name"
                value={newSubcategory.name}
                onChange={(e) => setNewSubcategory({ ...newSubcategory, name: e.target.value })}
                placeholder="Enter subcategory name"
              />
            </div>
            <div>
              <Label htmlFor="new-subcategory-description">Description (Optional)</Label>
              <Textarea
                id="new-subcategory-description"
                value={newSubcategory.description}
                onChange={(e) => setNewSubcategory({ ...newSubcategory, description: e.target.value })}
                placeholder="Enter subcategory description"
                rows={3}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setShowNewSubcategoryDialog(null);
                  setNewSubcategory({ name: "", description: "", categoryId: 0 });
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleCreateSubcategory} disabled={!newSubcategory.name.trim()}>
                <Save className="h-4 w-4 mr-2" />
                Create Subcategory
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
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
