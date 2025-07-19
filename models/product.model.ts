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
  stock: number;
  status: string;
  featured: boolean;
  colors: string[];
  rating: number;
  createdDate: Date;
  updatedDate: Date;
}
