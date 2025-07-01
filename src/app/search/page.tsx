import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";

export default function SearchPage() {
  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <Breadcrumb className="mb-5 sm:mb-9">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Search</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="text-center py-20">
          <h1
            className={cn([
              integralCF.className,
              "font-bold text-[32px] md:text-[40px] text-black uppercase mb-5 md:mb-6",
            ])}
          >
            Search Watches
          </h1>
          <p className="text-black/60 mb-8">
            Use the search bar in the navigation to find your perfect timepiece.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-black text-white px-8 py-3 rounded-full hover:bg-black/80 transition-all"
          >
            Browse All Watches
          </Link>
        </div>
      </div>
    </main>
  );
}