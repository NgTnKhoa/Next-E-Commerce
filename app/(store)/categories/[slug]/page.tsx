"use client";

import Heading from "@/components/shared/Heading";
import { ProductGrid } from "@/components/shared/ProductGrid";
import { ProductSkeletonGrid } from "@/components/shared/ProductSkeletonGrid";
import { Category } from "@/models/category.model";
import { Product } from "@/models/product.model";
import React, { useEffect, useState } from "react";
import Filters from "@/components/shared/Filters";
import MockData from "@/data/mockData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { filterProducts, getUniqueColors, getUniqueBrands, getPriceRange } from "@/lib/product-filters";

interface CategoryDetailsProps {
  params: Promise<{ slug: string }>;
}

const CategoryDetails = ({ params }: CategoryDetailsProps) => {
  const [slug, setSlug] = useState<string>("");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState<string>("featured");

  useEffect(() => {
    params.then(({ slug: paramSlug }) => {
      setSlug(paramSlug);
    });
  }, [params]);

  const categories: Category[] = MockData.categories;
  const category = categories.find((cat) => cat.slug === slug);
  
  // Get all products for this category
  const categoryProducts: Product[] = category
    ? MockData.products.filter((product) =>
        product.categoryNames.includes(category.name)
      )
    : [];

  // Get filter options
  const availableColors = getUniqueColors(categoryProducts);
  const availableBrands = getUniqueBrands(categoryProducts);
  const [minPrice, maxPrice] = getPriceRange(categoryProducts);

  // Initialize price range
  useEffect(() => {
    if (categoryProducts.length > 0) {
      setPriceRange([minPrice, maxPrice]);
    }
  }, [minPrice, maxPrice, categoryProducts.length]);

  // Apply filters
  const filteredProducts = filterProducts(categoryProducts, {
    colors: selectedColors,
    brands: selectedBrands,
    priceRange,
    category: category?.name,
  });

  // Apply sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        const priceA = a.discount > 0 ? a.price - (a.price * a.discount) / 100 : a.price;
        const priceB = b.discount > 0 ? b.price - (b.price * b.discount) / 100 : b.price;
        return priceA - priceB;
      case "price-high":
        const priceA2 = a.discount > 0 ? a.price - (a.price * a.discount) / 100 : a.price;
        const priceB2 = b.discount > 0 ? b.price - (b.price * b.discount) / 100 : b.price;
        return priceB2 - priceA2;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "newest":
        return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
      case "rating":
        return b.rating - a.rating;
      default:
        return b.featured ? 1 : -1;
    }
  });

  if (!slug) {
    return <ProductSkeletonGrid />;
  }

  return (
    <div className="px-6">
      <div className="flex items-end justify-between mb-4">
        <Heading
          className="my-0"
          title={
            categories.find((category) => category.slug === slug)?.name ||
            "Category"
          }
          description="Below is a list of products we have available for you."
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              Sort by
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => setSortBy("featured")}>Featured</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("price-low")}>Price: Low to High</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("price-high")}>Price: High to Low</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("name-asc")}>Name: A to Z</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("name-desc")}>Name: Z to A</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("newest")}>Newest First</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("rating")}>Best Rating</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-1 overflow-hidden gap-6">
          <aside className="hidden lg:block w-[10vw]">
            <Filters 
              colors={availableColors} 
              brands={availableBrands} 
              categories={categories} 
              slug={slug}
              selectedColors={selectedColors}
              selectedBrands={selectedBrands}
              priceRange={priceRange}
              onColorChange={setSelectedColors}
              onBrandChange={setSelectedBrands}
              onPriceChange={setPriceRange}
              minPrice={minPrice}
              maxPrice={maxPrice}
            />
          </aside>
          <main className="flex-1 min-w-0">
            {sortedProducts.length > 0 ? (
              <div>
                <div className="mb-4 text-sm text-muted-foreground">
                  Showing {sortedProducts.length} of {categoryProducts.length} products
                </div>
                <ProductGrid
                  products={sortedProducts}
                  isFeatured={false}
                />
              </div>
            ) : categoryProducts.length > 0 ? (
              <div className="text-center py-8">
                <p className="text-lg font-medium">No products match your filters</p>
                <p className="text-muted-foreground">Try adjusting your filters to see more results</p>
              </div>
            ) : (
              <ProductSkeletonGrid />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetails;
