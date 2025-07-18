export type Discount = {
  amount: number;
  percentage: number;
};

export type ProductCategory =
  | "watches"
  | "earrings"
  | "necklaces"
  | "bracelets"
  | "rings"
  | "anklets"
  | "brooches-pins"
  | "body-jewelry"
  | "jewelry-sets";

export type ProductSubcategory = {
  watches: "sport" | "luxury" | "smart" | "classic" | "mens" | "womens";
  earrings: "studs" | "hoops" | "dangles" | "huggies" | "ear-cuffs";
  necklaces: "pendants" | "chains" | "layered" | "chokers";
  bracelets:
    | "bangles"
    | "cuffs"
    | "charm-bracelets"
    | "chain-bracelets"
    | "beaded";
  rings:
    | "statement-rings"
    | "stacking-rings"
    | "promise-rings"
    | "engagement-rings"
    | "midi-rings";
  anklets: "chain-anklets" | "beaded-anklets" | "layered-anklets";
  "brooches-pins": "vintage" | "floral";
  "body-jewelry": "waist-beads" | "nose-rings" | "belly-chains";
  "jewelry-sets": "jewelry-sets";
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
};
