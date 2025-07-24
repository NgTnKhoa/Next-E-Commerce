import { Product } from "@/models/product.model";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  isFeatured: boolean;
}

export const ProductGrid = ({ products, isFeatured }: ProductGridProps) => {
  return (
    <div
      className={
        isFeatured
          ? "mb-4 gap-3 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
          : "mb-4 gap-3 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
      }
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isFeatured={isFeatured}
        />
      ))}
    </div>
  );
};
