import { Category } from "@/models/category.model";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface CategoryItemProps {
  category: Category;
  isActive: boolean;
}
const CategoryItem = ({ category, isActive }: CategoryItemProps) => {
  return (
    <div className="flex items-center">
      <div className="w-4 flex">
        {isActive && <ChevronRight className="w-4 h-4" />}
      </div>
      <div className="flex-1">
        <Link
          href={`/categories/${category.slug}`}
          className={`text-lg underline-offset-4 ${
            isActive ? "font-medium cursor-default" : "hover:underline"
          } my-1 block md:text-base`}
        >
          {category.name}
        </Link>
      </div>
    </div>
  );
};

export default CategoryItem;
