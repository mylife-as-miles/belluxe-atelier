import React from 'react';
import ProductForm from '@/components/admin/ProductForm';

const NewProductPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <ProductForm />
    </div>
  );
};

export default NewProductPage;