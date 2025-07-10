import { Product } from "@/models/product.model";
import { ProductCard } from "./ProductCard";

export const ProductGrid = ({ products }: { products: Product[] }) => {
  return (
    <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};
