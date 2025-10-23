export type Discount = {
  amount: number;
  percentage: number;
};

export type ProductCategory = "fashion-bags";

export type ProductSubcategory = {
  "fashion-bags":
    | "tote-bags"
    | "shoulder-bags"
    | "crossbody-bags"
    | "clutches"
    | "backpacks";
};

export type Specification = {
  key: string;
  value: string;
};

export type FAQ = {
  question: string;
  answer: string;
};

export type Product = {
  id: string;
  title: string;
  srcUrl: string;
  gallery?: string[];
  price: number;
  discount: Discount;
  rating: number;
  stock: number;
  category: ProductCategory;
  subcategory: string;
  description?: string | null;
  colors?: string[];
  specifications?: Specification[];
  faqs?: FAQ[];
  reviews?: {
    id: number;
    user: string;
    content: string;
    rating: number;
    date: string;
  }[];
};
