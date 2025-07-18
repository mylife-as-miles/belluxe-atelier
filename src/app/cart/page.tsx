"use client";

import Breadcr  const getProductStock = (id: string): number => {
    const product = products.find((p) => p.id === id);
    return product?.stock ?? 0;
  };art from "@/components/cart-page/BreadcrumbCart";
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
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const getProductStock = (id: number) => {
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
                  const isLowStock = item.quantity > stock && stock > 0;

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
                              >
                                <Minus className="h-3 w-3" />
                              </Button>

                              <span className="w-12 text-center font-medium">
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
                                disabled={item.quantity >= stock}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>

                            <div className="ml-auto">
                              {isOutOfStock && (
                                <p className="text-red-500 text-sm font-semibold">
                                  Out of Stock
                                </p>
                              )}
                              {isLowStock && (
                                <p className="text-yellow-500 text-sm font-semibold">
                                  Only {stock} left in stock
                                </p>
                              )}
                            </div>
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
              <div className="w-full lg:max-w-[395px] border border-black/10 rounded-[20px] p-5 md:p-6">
                <h3
                  className={cn([
                    integralCF.className,
                    "font-bold text-xl md:text-2xl text-black uppercase mb-5",
                  ])}
                >
                  Order Summary
                </h3>
                <div className="space-y-4 text-sm md:text-base">
                  <div className="flex items-center justify-between">
                    <span className="text-black/60">Subtotal</span>
                    <span className="font-semibold text-black">
                      ₦{totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-black/60">Discount (-20%)</span>
                    <span className="font-semibold text-[#FF3333]">
                      -₦{(totalPrice * 0.2).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-black/60">Delivery Fee</span>
                    <span className="font-semibold text-black">
                      ₦{(totalPrice * 0.05).toLocaleString()}
                    </span>
                  </div>
                  <hr className="border-t-black/10" />
                  <div className="flex items-center justify-between">
                    <span className="text-black">Total</span>
                    <span className="font-bold text-xl md:text-2xl text-black">
                      ₦
                      {(
                        totalPrice -
                        totalPrice * 0.2 +
                        totalPrice * 0.05
                      ).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <InputGroup className="bg-transparent">
                      <InputGroup.Text>
                        <MdOutlineLocalOffer className="text-2xl text-black/40" />
                      </InputGroup.Text>
                      <InputGroup.Input
                        placeholder="Add promo code"
                      />
                    </InputGroup>
                    <Button className="bg-black text-white h-12 text-base font-bold w-full max-w-[125px]">
                      Apply
                    </Button>
                  </div>
                  <Button
                    asChild
                    className="bg-black text-white h-12 text-base font-bold w-full"
                  >
                    <Link href="/checkout">
                      Go to Checkout{" "}
                      <FaArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <TbBasketExclamation className="text-7xl text-black/10 mx-auto mb-5" />
            <h2 className="text-2xl font-bold text-black mb-2">
              Your cart is empty
            </h2>
            <p className="text-black/60 mb-6">
              Looks like you haven&apos;t added anything to your cart yet.
            </p>
            <Button asChild className="bg-black text-white">
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
