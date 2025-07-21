import { Product } from "@/types/product.types";
import { Review } from "@/types/review.types";
import { fallbackProductsData } from "@/lib/fallback-data";

// Legacy function - now mostly used as fallback
// Consider using direct Prisma queries in components instead
export async function getProductsData() {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/products`, { cache: 'no-store' });
    if (!res.ok) {
      console.warn('API failed, using fallback data');
      return fallbackProductsData;
    }
    return res.json();
  } catch (error) {
    console.warn('API error, using fallback data:', error);
    return fallbackProductsData;
  }
}

// Legacy exports - kept for backward compatibility
export const newArrivalsData: Product[] = fallbackProductsData.slice(0, 4);
export const topSellingData: Product[] = fallbackProductsData.slice(4, 8);
export const relatedProductData: Product[] = fallbackProductsData.slice(8, 12);

// Legacy reviews data - now replaced with database reviews
// This is kept for components that haven't been updated yet
export const reviewsData: Review[] = [
  {
    id: 1,
    user: "Alex K.",
    content:
      '"Finding jewelry that aligns with my personal style used to be a challenge until I discovered Belluxe Atelier. The range of pieces they offer is truly remarkable, catering to a variety of tastes and occasions."',
    rating: 5,
    date: "August 14, 2023",
  },
  {
    id: 2,
    user: "Sarah M.",
    content: `"I'm blown away by the quality and craftsmanship of the jewelry I received from Belluxe Atelier. From elegant earrings to statement necklaces, every piece I've bought has exceeded my expectations."`,
    rating: 5,
    date: "August 15, 2023",
  },
  {
    id: 3,
    user: "Ethan R.",
    content: `"This ring is a must-have for anyone who appreciates good design. The minimalistic yet sophisticated pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this piece."`,
    rating: 5,
    date: "August 16, 2023",
  },
  {
    id: 4,
    user: "Olivia P.",
    content: `"As a design enthusiast, I value simplicity and functionality. These earrings not only represent those principles but also feel great to wear. It's evident that the designer poured their creativity into making these pieces stand out."`,
    rating: 5,
    date: "August 17, 2023",
  },
  {
    id: 5,
    user: "Liam K.",
    content: `"This jewelry set is a fusion of comfort and creativity. The materials are premium, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and craftsmanship."`,
    rating: 5,
    date: "August 18, 2023",
  },
  {
    id: 6,
    user: "Samantha D.",
    content: `"I absolutely love this necklace! The design is unique and the materials feel so premium. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to piece."`,
    rating: 5,
    date: "August 19, 2023",
  },
];
