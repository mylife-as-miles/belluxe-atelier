"use client";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import React from "react";
import { motion } from "framer-motion";
import DressStyleCard from "./DressStyleCard";
import { useQuery } from "@tanstack/react-query";

import { getCategories, Category } from "@/lib/features/categories/apis";


// Spinner component inline since we can't find the UI component
const SpinnerLoader = () => (
  <div className="flex justify-center items-center py-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
  </div>
);

const DressStyle = () => {
  const {
    data: categories,
    isPending,
    isError,
  } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  if (isPending) return <SpinnerLoader />;
  if (isError) return <div className="text-center py-8 text-red-500">Error fetching categories</div>;

  // Fallback images for categories without images
  const fallbackImages = [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHx3YXRjaHxlbnwwfHx8fDE3NTI3MjA0NDd8MA&ixlib=rb-4.0.3&q=85&w=400&h=200&fit=crop",
    "https://images.unsplash.com/photo-1611652022419-a9419f74343d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwyfHxqZXdlbHJ5fGVufDB8fHx8MTc1MjcyMDQ0N3ww&ixlib=rb-4.0.3&q=85&w=400&h=200&fit=crop",
    "https://images.unsplash.com/photo-1506629905607-d53d4d2178d5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwzfHxhY2Nlc3Nvcmllc3xlbnwwfHx8fDE3NTI3MjA0NDd8MA&ixlib=rb-4.0.3&q=85&w=400&h=200&fit=crop"
  ];

  const firstRow = categories?.slice(0, 2) || [];
  const secondRow = categories?.slice(2, 4) || [];
  const thirdRow = categories?.slice(4, 6) || [];

  return (
    <div className="px-4 xl:px-0">
      <section className="max-w-frame mx-auto bg-[#F0F0F0] px-6 pb-6 pt-10 md:p-[70px] rounded-[40px] text-center">
        <motion.h2
          initial={{ y: "100px", opacity: 0 }}
          whileInView={{ y: "0", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={cn([
            integralCF.className,
            "text-[32px] leading-[36px] md:text-5xl mb-8 md:mb-14 capitalize",
          ])}
        >
          BROWSE BY COLLECTION STYLE
        </motion.h2>
        <motion.div
          initial={{ y: "100px", opacity: 0 }}
          whileInView={{ y: "0", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row md:h-[289px] space-y-4 sm:space-y-0 sm:space-x-5 mb-4 sm:mb-5"
        >
          {firstRow.map((category: Category, index: number) => (
            <DressStyleCard
              key={category.id}
              title={category.name}
              url={`/shop?category=${category.slug}`}
              className="md:max-w-[260px] lg:max-w-[360px] xl:max-w-[407px] h-[190px] bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${(category as any).image || fallbackImages[index] || fallbackImages[0]})` 
              }}
            />
          ))}
        </motion.div>
        <motion.div
          initial={{ y: "100px", opacity: 0 }}
          whileInView={{ y: "0", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-col sm:flex-row md:h-[289px] space-y-5 sm:space-y-0 sm:space-x-5 mb-4 sm:mb-5"
        >
          {secondRow.map((category: Category, index: number) => (
            <DressStyleCard
              key={category.id}
              title={category.name}
              url={`/shop?category=${category.slug}`}
              className="md:max-w-[684px] h-[190px] bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${(category as any).image || fallbackImages[index + 2] || fallbackImages[1]})` 
              }}
            />
          ))}
        </motion.div>
        <motion.div
          initial={{ y: "100px", opacity: 0 }}
          whileInView={{ y: "0", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row md:h-[289px] space-y-5 sm:space-y-0 sm:space-x-5"
        >
          {thirdRow.map((category: Category, index: number) => (
            <DressStyleCard
              key={category.id}
              title={category.name}
              url={`/shop?category=${category.slug}`}
              className="md:max-w-[407px] h-[190px] bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${(category as any).image || fallbackImages[index + 4] || fallbackImages[2]})` 
              }}
            />
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default DressStyle;