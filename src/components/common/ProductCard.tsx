"use client";

import React from "react";
import Rating from "../ui/Rating";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product.types";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";

type ProductCardProps = {
  data: Product;
};

const ProductCard = ({ data }: ProductCardProps) => {
  const { addItem } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      id: data.id,
      title: data.title,
      price: data.discount.percentage > 0 
        ? data.price - (data.price * data.discount.percentage) / 100
        : data.discount.amount > 0 
        ? data.price - data.discount.amount
        : data.price,
      srcUrl: data.srcUrl,
    });
  };

  const finalPrice = data.discount.percentage > 0 
    ? data.price - (data.price * data.discount.percentage) / 100
    : data.discount.amount > 0 
    ? data.price - data.discount.amount
    : data.price;

  return (
    <div className="flex flex-col items-start aspect-auto group">
      <Link
        href={`/shop/product/${data.id}`}
        className="block w-full"
      >
        <div className="bg-[#F0EEED] rounded-[13px] lg:rounded-[20px] w-full lg:max-w-[295px] aspect-square mb-2.5 xl:mb-4 overflow-hidden relative">
          <Image
            src={data.srcUrl}
            width={295}
            height={298}
            className="rounded-md w-full h-full object-contain hover:scale-110 transition-all duration-500"
            alt={data.title}
            priority
          />
          <Button
            onClick={handleAddToCart}
            className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-8 w-8 p-0"
            size="icon"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </Link>
      <Link href={`/shop/product/${data.id}`} className="block w-full">
        <strong className="text-black xl:text-xl">{data.title}</strong>
        <div className="flex items-end mb-1 xl:mb-2">
          <Rating
            initialValue={data.rating}
            allowFraction
            SVGclassName="inline-block"
            emptyClassName="fill-gray-50"
            size={19}
            readonly
          />
          <span className="text-black text-xs xl:text-sm ml-[11px] xl:ml-[13px] pb-0.5 xl:pb-0">
            {data.rating.toFixed(1)}
            <span className="text-black/60">/5</span>
          </span>
        </div>
        <div className="flex items-center space-x-[5px] xl:space-x-2.5">
          <span className="font-bold text-black text-xl xl:text-2xl">
            ${finalPrice.toFixed(2)}
          </span>
          {(data.discount.percentage > 0 || data.discount.amount > 0) && (
            <span className="font-bold text-black/40 line-through text-xl xl:text-2xl">
              ${data.price.toFixed(2)}
            </span>
          )}
          {data.discount.percentage > 0 ? (
            <span className="font-medium text-[10px] xl:text-xs py-1.5 px-3.5 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
              {`-${data.discount.percentage}%`}
            </span>
          ) : (
            data.discount.amount > 0 && (
              <span className="font-medium text-[10px] xl:text-xs py-1.5 px-3.5 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
                {`-$${data.discount.amount.toFixed(2)}`}
              </span>
            )
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;