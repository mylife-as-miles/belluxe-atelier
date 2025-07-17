import ProductListSec from "@/components/common/ProductListSec";
import Brands from "@/components/homepage/Brands";
import DressStyle from "@/components/homepage/DressStyle";
import Header from "@/components/homepage/Header";
import Reviews from "@/components/homepage/Reviews";
import { Product } from "@/types/product.types";
import { Review } from "@/types/review.types";

import ProductListSec from "@/components/common/ProductListSec";
import Brands from "@/components/homepage/Brands";
import DressStyle from "@/components/homepage/DressStyle";
import Header from "@/components/homepage/Header";
import Reviews from "@/components/homepage/Reviews";
import { Product } from "@/types/product.types";
import { Review } from "@/types/review.types";

export const newArrivalsData: Product[] = [
  {
    id: 1,
    title: "Classic Chronograph",
    srcUrl: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1000&h=1000&fit=crop",
    gallery: [
      "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1000&h=1000&fit=crop",
      "https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=1000&h=1000&fit=crop",
      "https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg?auto=compress&cs=tinysrgb&w=1000&h=1000&fit=crop"
    ],
    price: 1200,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.5,
    category: 'watches',
    subcategory: 'classic',
  },
  {
    id: 2,
    title: "Rose Gold Drop Earrings",
    srcUrl: "https://images.unsplash.com/photo-1629224316810-9d8805b95e76?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxlYXJyaW5nc3xlbnwwfHx8fDE3NTI3MjA0NDd8MA&ixlib=rb-4.1.0&q=85",
    gallery: ["https://images.unsplash.com/photo-1629224316810-9d8805b95e76?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxlYXJyaW5nc3xlbnwwfHx8fDE3NTI3MjA0NDd8MA&ixlib=rb-4.1.0&q=85"],
    price: 450,
    discount: {
      amount: 0,
      percentage: 20,
    },
    rating: 4.8,
    category: 'earrings',
    subcategory: 'dangles',
  },
  {
    id: 3,
    title: "Elegant Layered Necklace",
    srcUrl: "https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwxfHxuZWNrbGFjZXxlbnwwfHx8fDE3NTI3MjA0NjN8MA&ixlib=rb-4.1.0&q=85",
    gallery: ["https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwxfHxuZWNrbGFjZXxlbnwwfHx8fDE3NTI3MjA0NjN8MA&ixlib=rb-4.1.0&q=85"],
    price: 320,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.6,
    category: 'necklaces',
    subcategory: 'layered',
  },
  {
    id: 4,
    title: "Gold Statement Rings Set",
    srcUrl: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwyfHxyaW5nc3xlbnwwfHx8fDE3NTI3MjA0NTR8MA&ixlib=rb-4.1.0&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwyfHxyaW5nc3xlbnwwfHx8fDE3NTI3MjA0NTR8MA&ixlib=rb-4.1.0&q=85",
      "https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwxfHxyaW5nc3xlbnwwfHx8fDE3NTI3MjA0NTR8MA&ixlib=rb-4.1.0&q=85"
    ],
    price: 680,
    discount: {
      amount: 0,
      percentage: 15,
    },
    rating: 4.7,
    category: 'rings',
    subcategory: 'statement-rings',
  },
];

export const topSellingData: Product[] = [
  {
    id: 5,
    title: "Silver Leaf Earrings",
    srcUrl: "https://images.unsplash.com/photo-1693212793204-bcea856c75fe?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwyfHxlYXJyaW5nc3xlbnwwfHx8fDE3NTI3MjA0NDd8MA&ixlib=rb-4.1.0&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1693212793204-bcea856c75fe?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwyfHxlYXJyaW5nc3xlbnwwfHx8fDE3NTI3MjA0NDd8MA&ixlib=rb-4.1.0&q=85",
      "https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg"
    ],
    price: 280,
    discount: {
      amount: 0,
      percentage: 25,
    },
    rating: 4.9,
    category: 'earrings',
    subcategory: 'studs',
  },
  {
    id: 6,
    title: "Luxury Pearl Necklace",
    srcUrl: "https://images.unsplash.com/photo-1685970731571-72ede0cb26ea?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwyfHxuZWNrbGFjZXxlbnwwfHx8fDE3NTI3MjA0NjN8MA&ixlib=rb-4.1.0&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1685970731571-72ede0cb26ea?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwyfHxuZWNrbGFjZXxlbnwwfHx8fDE3NTI3MjA0NjN8MA&ixlib=rb-4.1.0&q=85",
      "https://images.pexels.com/photos/1035683/pexels-photo-1035683.jpeg"
    ],
    price: 1850,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.8,
    category: 'necklaces',
    subcategory: 'pendants',
  },
  {
    id: 7,
    title: "Vintage Automatic Watch",
    srcUrl: "https://images.pexels.com/photos/1034063/pexels-photo-1034063.jpeg?auto=compress&cs=tinysrgb&w=1000&h=1000&fit=crop",
    gallery: ["https://images.pexels.com/photos/1034063/pexels-photo-1034063.jpeg?auto=compress&cs=tinysrgb&w=1000&h=1000&fit=crop"],
    price: 2400,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.5,
    category: 'watches',
    subcategory: 'vintage',
  },
  {
    id: 8,
    title: "Delicate Chain Bracelet",
    srcUrl: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxqZXdlbHJ5fGVufDB8fHx8MTc1MjcwODQ2Mnww&ixlib=rb-4.1.0&q=85",
    gallery: ["https://images.unsplash.com/photo-1611652022419-a9419f74343d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxqZXdlbHJ5fGVufDB8fHx8MTc1MjcwODQ2Mnww&ixlib=rb-4.1.0&q=85"],
    price: 320,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.4,
    category: 'bracelets',
    subcategory: 'chain-bracelets',
  },
];

export const relatedProductData: Product[] = [
  {
    id: 12,
    title: "Heart Pendant Necklace",
    srcUrl: "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwzfHxuZWNrbGFjZXxlbnwwfHx8fDE3NTI3MjA0NjN8MA&ixlib=rb-4.1.0&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwzfHxuZWNrbGFjZXxlbnwwfHx8fDE3NTI3MjA0NjN8MA&ixlib=rb-4.1.0&q=85",
      "https://images.pexels.com/photos/906056/pexels-photo-906056.jpeg"
    ],
    price: 420,
    discount: {
      amount: 0,
      percentage: 20,
    },
    rating: 4.6,
    category: 'necklaces',
    subcategory: 'pendants',
  },
  {
    id: 13,
    title: "Tassel Drop Earrings",
    srcUrl: "https://images.pexels.com/photos/1721937/pexels-photo-1721937.jpeg",
    gallery: [
      "https://images.pexels.com/photos/1721937/pexels-photo-1721937.jpeg",
      "https://images.pexels.com/photos/458766/pexels-photo-458766.jpeg"
    ],
    price: 180,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.3,
    category: 'earrings',
    subcategory: 'dangles',
  },
  {
    id: 14,
    title: "Wedding Ring Set",
    srcUrl: "https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwxfHxyaW5nc3xlbnwwfHx8fDE3NTI3MjA0NTR8MA&ixlib=rb-4.1.0&q=85",
    gallery: ["https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwxfHxyaW5nc3xlbnwwfHx8fDE3NTI3MjA0NTR8MA&ixlib=rb-4.1.0&q=85"],
    price: 2800,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.9,
    category: 'rings',
    subcategory: 'engagement-rings',
  },
  {
    id: 15,
    title: "Luxury Jewelry Set",
    srcUrl: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHxqZXdlbHJ5fGVufDB8fHx8MTc1MjcwODQ2Mnww&ixlib=rb-4.1.0&q=85",
    gallery: ["https://images.unsplash.com/photo-1617038220319-276d3cfab638?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHxqZXdlbHJ5fGVufDB8fHx8MTc1MjcwODQ2Mnww&ixlib=rb-4.1.0&q=85"],
    price: 1500,
    discount: {
      amount: 0,
      percentage: 30,
    },
    rating: 4.7,
    category: 'jewelry-sets',
    subcategory: 'jewelry-sets',
  },
];

export const reviewsData: Review[] = [
  {
    id: 1,
    user: "Alex K.",
    content:
      '"Finding watches that align with my personal style used to be a challenge until I discovered Belluxe Atelier. The range of timepieces they offer is truly remarkable, catering to a variety of tastes and occasions."',
    rating: 5,
    date: "August 14, 2023",
  },
  {
    id: 2,
    user: "Sarah M.",
    content: `"I'm blown away by the quality and craftsmanship of the watches I received from Belluxe Atelier. From sport watches to elegant dress pieces, every timepiece I've bought has exceeded my expectations."`,
    rating: 5,
    date: "August 15, 2023",
  },
  {
    id: 3,
    user: "Ethan R.",
    content: `"This watch is a must-have for anyone who appreciates good design. The minimalistic yet sophisticated pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this timepiece."`,
    rating: 5,
    date: "August 16, 2023",
  },
  {
    id: 4,
    user: "Olivia P.",
    content: `"As a design enthusiast, I value simplicity and functionality. This watch not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this timepiece stand out."`,
    rating: 5,
    date: "August 17, 2023",
  },
  {
    id: 5,
    user: "Liam K.",
    content: `"This watch is a fusion of comfort and creativity. The materials are premium, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and horology."`,
    rating: 5,
    date: "August 18, 2023",
  },
  {
    id: 6,
    user: "Samantha D.",
    content: `"I absolutely love this watch! The design is unique and the materials feel so premium. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to timepiece."`,
    rating: 5,
    date: "August 19, 2023",
  },
];

export default function Home() {
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
        <Reviews data={reviewsData} />
      </main>
    </>
  );
}