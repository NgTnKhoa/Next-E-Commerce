import { Category } from "./category.model";

export interface Product {
  id: number;
  categoryNames: string[];
  name: string;
  slug: string;
  description: string;
  images: string[];
  price: number;
  discount: number;
  brand: string;
  status: string;
  featured: boolean;
  colors: string[];
  rating: number;
  createdDate: Date;
  updatedDate: Date;
}
