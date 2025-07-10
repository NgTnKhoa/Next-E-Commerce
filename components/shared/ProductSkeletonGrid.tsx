import { ProductSkeletonCard } from "./ProductSkeletonCard";

export const ProductSkeletonGrid = () => {
  return (
    <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
      {[...Array(4)].map(() => (
        <ProductSkeletonCard key={Math.random()} />
      ))}
    </div>
  );
};
