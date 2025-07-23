"use client";

import BreadcrumbCart from "@/components/cart-page/BreadcrumbCart";
import { Button } from "@/components/ui/button";
import InputGroup from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { FaArrowRight } from "react-icons/fa6";
import { MdOutlineLocalOffer } from "react-icons/md";
import { TbBasketExclamation } from "react-icons/tb";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Product } from "@/types/product.types";

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice } = useCartStore();
  const [products, setProducts] = useState<Product[]>([]);
  const totalPrice = getTotalPrice();

  useEffect(() => {
    const fetchProducts = async () => {
      if (items.length > 0) {
        const productIds = items.map((item) => item.id);
        const res = await fetch(`/api/products?ids=${productIds.join(',')}`);
        const data = await res.json();
        setProducts(data);
      }
    };
    fetchProducts();
  }, [items]);

  const getProductStock = (id: string) => {
    const product = products.find((p) => p.id === id);
    return product ? product.stock : 0;
  };

  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        {items.length > 0 ? (
          <>
            <BreadcrumbCart />
            <h2
              className={cn([
                integralCF.className,
                "font-bold text-[32px] md:text-[40px] text-black uppercase mb-5 md:mb-6",
              ])}
            >
              your cart
            </h2>
            <div className="flex flex-col lg:flex-row space-y-5 lg:space-y-0 lg:space-x-5 items-start">
              <div className="w-full p-3.5 md:px-6 flex-col space-y-4 md:space-y-6 rounded-[20px] border border-black/10">
                {items.map((item, idx, arr) => {
                  const stock = getProductStock(item.id);
                  const isOutOfStock = stock === 0;
                  const isLowStock = !isOutOfStock && item.quantity >= stock;

                  return (
                    <React.Fragment key={`${item.id}-${item.color}-${idx}`}>
                      <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4">
                        <div className="relative h-32 w-32 overflow-hidden rounded-lg flex-shrink-0">
                          <Image
                            src={item.srcUrl}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-semibold text-black mb-1">
                                {item.title}
                              </h3>
                              {item.color && (
                                <p className="text-sm text-black/60 mb-2">
                                  Color: {item.color}
                                </p>
                              )}
                              <p className="text-xl font-bold text-black">
                                ₦{item.price.toLocaleString()}
                              </p>
                            </div>

                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-600 hover:text-red-700"
                              onClick={() => removeItem(item.id, item.color)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="flex items-center gap-3 mt-4">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    item.quantity - 1,
                                    item.color
                                  )
                                }
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="text-lg font-medium">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    item.quantity + 1,
                                    item.color
                                  )
                                }
                                disabled={item.quantity >= stock || isOutOfStock}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            {isOutOfStock && (
                              <p className="text-sm text-red-600 font-semibold">
                                Out of Stock
                              </p>
                            )}
                            {isLowStock && (
                              <p className="text-sm text-yellow-600 font-semibold">
                                Low Stock (only {stock} left)
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      {idx < arr.length - 1 && (
                        <hr className="border-t-black/10" />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
              <div className="w-full lg:max-w-[420px] p-5 md:p-6 rounded-[20px] border border-black/10 space-y-5">
                <h3 className="font-bold text-2xl text-black">Order Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-black/60">Subtotal</span>
                    <span className="font-medium text-black">
                      ₦{totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black/60">Discount</span>
                    <span className="font-medium text-black">-₦0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black/60">Delivery Fee</span>
                    <span className="font-medium text-black">₦0.00</span>
                  </div>
                  <hr className="border-t-black/10" />
                  <div className="flex justify-between">
                    <span className="font-medium text-black">Total</span>
                    <span className="font-bold text-black">
                      ₦{totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div className="relative w-full">
                    <MdOutlineLocalOffer className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40" />
                    <InputGroup
                      className="pl-9"
                    >
                      <InputGroup.Input placeholder="Add promo code" />
                    </InputGroup>
                  </div>
                  <Button className="font-bold">Apply</Button>
                </div>
                <Button
                  asChild
                  className="w-full bg-black text-white font-bold h-12"
                >
                  <Link href="/checkout">
                    Go to Checkout <FaArrowRight className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <TbBasketExclamation className="text-8xl text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-black mb-2">
              Your cart is empty
            </h2>
            <p className="text-black/60 mb-6">
              Looks like you haven&apos;t added anything to your cart yet.
            </p>
            <Button asChild>
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
