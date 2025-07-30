import { CategoryGrid } from "@/components/shared/CategoryGrid";
import Heading from "@/components/shared/Heading";
import { ProductGrid } from "@/components/shared/ProductGrid";
import { ProductSkeletonGrid } from "@/components/shared/ProductSkeletonGrid";
import SearchBar from "@/components/shared/SearchBar";
import Slider from "@/components/shared/Slider";
import { Separator } from "@/components/ui/separator";
import MockData from "@/data/mockData";
import { Category } from "@/models/category.model";
import { Product } from "@/models/product.model";
import React from "react";

const Home = () => {
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

  return (
    <div className="px-6">
      <SearchBar />

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
