import { prisma } from "@/lib/prisma";
import ProductListSec from "@/components/common/ProductListSec";
import BreadcrumbProduct from "@/components/product-page/BreadcrumbProduct";
import Header from "@/components/product-page/Header";
import Tabs from "@/components/product-page/Tabs";
import { Product, ProductCategory } from "@/types/product.types";
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
      id: parseInt(params.slug[0]),
    },
    include: {
      category: true,
      subcategory: true,
      reviews: true,
    },
  });

  if (!productData?.title) {
    notFound();
  }

  // Transform database product to match Product type
  const transformedProduct: Product = {
    ...productData,
    id: productData.id.toString(),
    gallery: JSON.parse(productData.gallery),
    discount: JSON.parse(productData.discount),
    colors: JSON.parse(productData.colors || "[]"),
    specifications: JSON.parse(productData.specifications || "[]"),
    faqs: JSON.parse(productData.faqs || "[]"),
    category: productData.category.name as ProductCategory,
    subcategory: productData.subcategory?.name || "",
    reviews: productData.reviews || [],
  };

  // Filter out the current product from related products and get up to 4 random ones
  const relatedProductsRaw = await prisma.product.findMany({
    where: {
      NOT: {
        id: productData.id,
      },
    },
    include: {
      category: true,
      subcategory: true,
    },
    take: 4,
  });

  const relatedProducts: Product[] = relatedProductsRaw.map(product => ({
    ...product,
    id: product.id.toString(),
    gallery: JSON.parse(product.gallery),
    discount: JSON.parse(product.discount),
    colors: JSON.parse(product.colors || "[]"),
    specifications: JSON.parse(product.specifications || "[]"),
    faqs: JSON.parse(product.faqs || "[]"),
    category: product.category.name as ProductCategory,
    subcategory: product.subcategory?.name || "",
  }));

  return (
    <main>
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbProduct title={productData?.title ?? "product"} />
        <section className="mb-11">
          <Header data={transformedProduct} />
        </section>
        <Tabs product={transformedProduct} />
      </div>
      {relatedProducts.length > 0 && (
        <div className="mb-[50px] sm:mb-20">
          <ProductListSec title="You might also like" data={relatedProducts} />
        </div>
      )}
    </main>
  );
}