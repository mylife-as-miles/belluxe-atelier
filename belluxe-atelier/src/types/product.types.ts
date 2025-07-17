export interface Discount {
  amount: number;
  percentage: number;
}

export interface Product {
  id: number;
  title: string;
  srcUrl: string;
  gallery: string[];
  price: number;
  discount: Discount;
  rating: number;
  category: string;
  subcategory: string;
}