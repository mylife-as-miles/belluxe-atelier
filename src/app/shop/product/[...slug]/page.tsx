import prisma from "@/lib/prisma";
import ProductListSec from "@/components/common/ProductListSec";
import BreadcrumbProduct from "@/components/product-page/BreadcrumbProduct";
import Header from "@/components/product-page/Header";
import Tabs from "@/components/product-page/Tabs";
import { Product } from "@/types/product.types";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    select: { id: true },
  });
  return products.map((product) => ({
    slug: [product.id.toString()],
  }));
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const productData = await prisma.product.findUnique({
    where: {
      id: params.slug[0],
    },
  });

  if (!productData?.title) {
    notFound();
  }

  // Filter out the current product from related products and get up to 4 random ones
  const relatedProducts = await prisma.product.findMany({
    where: {
      NOT: {
        id: productData.id,
      },
    },
    take: 4,
  });

  return (
    <main>
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbProduct title={productData?.title ?? "product"} />
        <section className="mb-11">
          <Header data={productData} />
        </section>
        <Tabs />
      </div>
      {relatedProducts.length > 0 && (
        <div className="mb-[50px] sm:mb-20">
          <ProductListSec title="You might also like" data={relatedProducts} />
        </div>
      )}
    </main>
  );
}