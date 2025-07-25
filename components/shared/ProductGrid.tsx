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
          ? "mb-4 gap-3 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4"
          : "mb-4 gap-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5"
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
