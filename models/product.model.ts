import { Category } from "./category.model";

export interface Product {
    id: number
    name: string;
    description: string;
    price: number;
    discount: number;
    slug: string;
    brand: string;
    categories: Category[];
    images: string[];
    isAvailable: boolean;
    createdAt: Date;
    updatedAt: Date;
}
