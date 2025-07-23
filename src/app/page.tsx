import ProductListSec from "@/components/common/ProductListSec";
import Brands from "@/components/homepage/Brands";
import DressStyle from "@/components/homepage/DressStyle";
import Header from "@/components/homepage/Header";
import Reviews from "@/components/homepage/Reviews";
import { Product, ProductCategory } from "@/types/product.types";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  // Fetch products directly from database
  const productsRaw = await prisma.product.findMany({
    include: {
      category: true,
      subcategory: true,
      reviews: true,
    },
    orderBy: {
      createdAt: 'desc', // Get newest products first
    },
  });

  // Transform database products to match Product type
  const products: Product[] = productsRaw.map((product: any) => ({
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

  const newArrivalsData = products.slice(0, 4);
  const topSellingData = products.slice(4, 8);

  // Fetch reviews from database
  const reviewsFromDb = await prisma.review.findMany({
    take: 6,
    orderBy: {
      id: 'desc',
    },
  });
  return (
    <>
      <Header />
      <Brands />
      <main className="my-[50px] sm:my-[72px]">
        <ProductListSec
          title="NEW ARRIVALS"
          data={newArrivalsData}
          viewAllLink="/shop#new-arrivals"
        />
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          <hr className="h-[1px] border-t-black/10 my-10 sm:my-16" />
        </div>
        <div className="mb-[50px] sm:mb-20">
          <ProductListSec
            title="top selling"
            data={topSellingData}
            viewAllLink="/shop#top-selling"
          />
        </div>
        <div className="mb-[50px] sm:mb-20">
          <DressStyle />
        </div>
        <Reviews data={reviewsFromDb} />
      </main>
    </>
  );
}