"use client";

import { useCartStore } from "@/lib/cart-store";
import { Product } from "@/types/product.types";
import React from "react";

const AddToCartBtn = ({ data }: { data: Product & { quantity: number } }) => {
  const { addItem, openCart } = useCartStore();

  const handleAddToCart = () => {
    // Calculate the final price considering discounts
    const finalPrice = data.discount.percentage > 0 
      ? data.price - (data.price * data.discount.percentage) / 100
      : data.discount.amount > 0 
      ? data.price - data.discount.amount
      : data.price;

    // Add item to cart with the specified quantity
    addItem({
      id: data.id,
      title: data.title,
      price: finalPrice,
      srcUrl: data.srcUrl,
    }, data.quantity);
    
    // Open the cart drawer to show the added item
    openCart();
  };

  return (
    <button
      type="button"
      className="bg-black w-full ml-3 sm:ml-5 rounded-full h-11 md:h-[52px] text-sm sm:text-base text-white hover:bg-black/80 transition-all"
      onClick={handleAddToCart}
    >
      Add to Cart
    </button>
  );
};

export default AddToCartBtn;
