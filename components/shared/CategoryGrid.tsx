import { Category } from "@/models/category.model";
import { CategoryCard } from "./CategoryCard";

interface CategoryGridProps {
  categories: Category[];
}

export const CategoryGrid = ({ categories }: CategoryGridProps) => {
  return (
    <div className="mb-4 gap-3 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
};
