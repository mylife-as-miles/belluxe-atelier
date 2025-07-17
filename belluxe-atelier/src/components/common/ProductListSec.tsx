import React from 'react';
import { Product } from '@/types/product.types';

interface ProductListSecProps {
  title: string;
  data: Product[];
  viewAllLink: string;
}

const ProductListSec: React.FC<ProductListSecProps> = ({ title, data, viewAllLink }) => {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((product) => (
          <div key={product.id} className="border rounded-lg p-4">
            <img src={product.srcUrl} alt={product.title} className="w-full h-48 object-cover mb-2" />
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="text-gray-600">${product.price}</p>
            <a href={`/product/${product.id}`} className="text-blue-500 hover:underline">
              View Details
            </a>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <a href={viewAllLink} className="text-blue-600 hover:underline">
          View All Products
        </a>
      </div>
    </section>
  );
};

export default ProductListSec;