"use client";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import React,d from "react";
import * as motion from "framer-motion";
import DressStyleCard from "./DressStyleCard";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/features/categories/apis";
import { Category } from "@prisma/client";
import SpinnerLoader from "@/components/ui/SpinnerbLoader";

const DressStyle = () => {
  const {
    data: categories,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  if (isPending) return <SpinnerLoader />;
  if (isError) return <div>Error fetching categories</div>;

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
          BROWSE BY DRESS STYLE
        </motion.h2>
        <motion.div
          initial={{ y: "100px", opacity: 0 }}
          whileInView={{ y: "0", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row md:h-[289px] space-y-4 sm:space-y-0 sm:space-x-5 mb-4 sm:mb-5"
        >
          {firstRow.map((category: Category) => (
            <DressStyleCard
              key={category.id}
              title={category.name}
              url={`/shop#${category.slug}`}
              className="md:max-w-[260px] lg:max-w-[360px] xl:max-w-[407px] h-[190px] bg-cover bg-center"
              style={{ backgroundImage: `url(${category.image})` }}
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
          {secondRow.map((category: Category) => (
            <DressStyleCard
              key={category.id}
              title={category.name}
              url={`/shop#${category.slug}`}
              className="md:max-w-[684px] h-[190px] bg-cover bg-center"
              style={{ backgroundImage: `url(${category.image})` }}
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
          {thirdRow.map((category: Category) => (
            <DressStyleCard
              key={category.id}
              title={category.name}
              url={`/shop#${category.slug}`}
              className="md:max-w-[407px] h-[190px] bg-cover bg-center"
              style={{ backgroundImage: `url(${category.image})` }}
            />
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default DressStyle;