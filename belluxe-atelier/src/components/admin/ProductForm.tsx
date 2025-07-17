import React, { useState } from 'react';
import { Product } from '@/types/product.types';
import { useRouter } from 'next/router';

const ProductForm: React.FC<{ product?: Product }> = ({ product }) => {
  const [title, setTitle] = useState(product?.title || '');
  const [srcUrl, setSrcUrl] = useState(product?.srcUrl || '');
  const [gallery, setGallery] = useState(product?.gallery.join(', ') || '');
  const [price, setPrice] = useState(product?.price || 0);
  const [discountAmount, setDiscountAmount] = useState(product?.discount.amount || 0);
  const [discountPercentage, setDiscountPercentage] = useState(product?.discount.percentage || 0);
  const [rating, setRating] = useState(product?.rating || 0);
  const [category, setCategory] = useState(product?.category || '');
  const [subcategory, setSubcategory] = useState(product?.subcategory || '');
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const galleryArray = gallery.split(',').map(url => url.trim());
    
    const productData = {
      title,
      srcUrl,
      gallery: galleryArray,
      price,
      discount: {
        amount: discountAmount,
        percentage: discountPercentage,
      },
      rating,
      category,
      subcategory,
    };

    const response = product 
      ? await fetch(`/api/products/${product.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        })
      : await fetch('/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        });

    if (response.ok) {
      router.push('/admin/products');
    } else {
      console.error('Failed to save product');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Title</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Image URL</label>
        <input 
          type="text" 
          value={srcUrl} 
          onChange={(e) => setSrcUrl(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Gallery (comma-separated URLs)</label>
        <input 
          type="text" 
          value={gallery} 
          onChange={(e) => setGallery(e.target.value)} 
        />
      </div>
      <div>
        <label>Price</label>
        <input 
          type="number" 
          value={price} 
          onChange={(e) => setPrice(Number(e.target.value))} 
          required 
        />
      </div>
      <div>
        <label>Discount Amount</label>
        <input 
          type="number" 
          value={discountAmount} 
          onChange={(e) => setDiscountAmount(Number(e.target.value))} 
        />
      </div>
      <div>
        <label>Discount Percentage</label>
        <input 
          type="number" 
          value={discountPercentage} 
          onChange={(e) => setDiscountPercentage(Number(e.target.value))} 
        />
      </div>
      <div>
        <label>Rating</label>
        <input 
          type="number" 
          value={rating} 
          onChange={(e) => setRating(Number(e.target.value))} 
          required 
        />
      </div>
      <div>
        <label>Category</label>
        <input 
          type="text" 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Subcategory</label>
        <input 
          type="text" 
          value={subcategory} 
          onChange={(e) => setSubcategory(e.target.value)} 
          required 
        />
      </div>
      <button type="submit">{product ? 'Update Product' : 'Add Product'}</button>
    </form>
  );
};

export default ProductForm;