"use client";

import { CategoryGrid } from "@/components/shared/CategoryGrid";
import Heading from "@/components/shared/Heading";
import { ProductGrid } from "@/components/shared/ProductGrid";
import { ProductSkeletonGrid } from "@/components/shared/ProductSkeletonGrid";
import Slider from "@/components/shared/Slider";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MockData from "@/data/mockData";
import { Category } from "@/models/category.model";
import { Product } from "@/models/product.model";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const banners = [
    {
      id: 1,
      image: "/slider/slider-1.jpg",
    },
    {
      id: 2,
      image: "/slider/slider-2.jpg",
    },
    {
      id: 3,
      image: "/slider/slider-3.jpg",
    },
  ];

  const featuredCategories: Category[] = MockData.featuredCategories;
  const featuredProducts: Product[] = MockData.featuredProducts;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="px-6">
      {/* Search Bar */}
      <div className="my-8 max-w-2xl mx-auto">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search products, categories, brands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit" disabled={!searchTerm.trim()}>
            Search
          </Button>
        </form>
      </div>

      <Slider images={banners.map((obj) => obj.image)} />
      <Separator className="my-6" />
      
      {/* Featured Categories Section */}
      <Heading
        title="Featured Categories"
        description="Explore our categories to find what you need."
      />
      <CategoryGrid categories={featuredCategories} />
      <Separator className="my-6" />
      
      {/* Featured Products Section */}
      <Heading
        title="Featured Products"
        description="Below is a list of products we have available for you."
      />
      
      {featuredProducts.length > 0 ? (
        <ProductGrid products={featuredProducts} isFeatured={true} />
      ) : (
        <ProductSkeletonGrid />
      )}
    </div>
  );
};

export default Home;
