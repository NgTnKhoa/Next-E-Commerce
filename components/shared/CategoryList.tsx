"use client";

import { Category } from "@/models/category.model";
import React, { useEffect, useState } from "react";
import CategoryItem from "./CategoryItem";
import { Label } from "../ui/label";
import { usePathname } from "next/navigation";
import { Separator } from "../ui/separator";
import { ChevronDown, Logs } from "lucide-react";
import Link from "next/link";

interface CategoryListProps {
  categories: Category[];
  slug: string;
}

const LOCAL_KEY = "category-list-show-all";

const CategoryList = ({ categories, slug }: CategoryListProps) => {
  const pathname = usePathname();
  const [showAll, setShowAll] = useState(false);
  const visibleCategories = showAll ? categories : categories.slice(0, 5);

  useEffect(() => {
    if (!pathname.startsWith("/categories/")) {
      sessionStorage.removeItem(LOCAL_KEY);
      setShowAll(false);
      return;
    }

    const saved = sessionStorage.getItem(LOCAL_KEY);
    if (saved === "true") {
      setShowAll(true);
    }
  }, [pathname]);

  const handleShowAll = () => {
    sessionStorage.setItem(LOCAL_KEY, "true");
    setShowAll(true);
  };

  return (
    <div className="my-4">
      <Link
        href={`/categories`}
        className="text-lg font-semibold my-1 block md:text-base"
      >
        <div className="flex items-center">
          <div className="w-6 flex">
            <Logs className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <Label className="text-lg font-semibold">All Categories</Label>
          </div>
        </div>
      </Link>
      <Separator className="my-2" />
      {visibleCategories.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          isActive={category.slug === slug}
        />
      ))}
      {!showAll && categories.length > 5 && (
        <div className="flex items-center">
          <div className="w-6 flex">
            <ChevronDown className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <Label
              onClick={handleShowAll}
              className="text-lg font-medium underline-offset-4 hover:underline block md:text-base cursor-pointer"
            >
              More
            </Label>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
