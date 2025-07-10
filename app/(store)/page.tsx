import Heading from "@/components/shared/Heading";
import { ProductGrid } from "@/components/shared/ProductGrid";
import { ProductSkeletonGrid } from "@/components/shared/ProductSkeletonGrid";
import Slider from "@/components/shared/Slider";
import { Separator } from "@/components/ui/separator";
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
  const categories: Category[] = [
    {
      id: 1,
      name: "Category 1",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: "Category 2",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      name: "Category 3",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 4,
      name: "Category 4",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  const products: Product[] = [
    {
      id: 1,
      name: "Product 1",
      description: "Description for Product 1",
      brand: "Brand A",
      categories: categories,
      slug: "product-1",
      price: 29.99,
      discount: 5.0,
      images: ["/slider/slider-1.jpg"],
      isAvailable: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: "Product 2",
      description: "Description for Product 2",
      brand: "Brand B",
      categories: categories,
      slug: "product-2",
      price: 49.99,
      discount: 10.0,
      images: ["/slider/slider-2.jpg"],
      isAvailable: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      name: "Product 3",
      description: "Description for Product 3",
      brand: "Brand C",
      categories: categories,
      slug: "product-3",
      price: 19.99,
      discount: 0.0,
      images: ["/slider/slider-3.jpg"],
      isAvailable: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 4,
      name: "Product 4",
      description: "Description for Product 4",
      brand: "Brand D",
      categories: categories,
      slug: "product-4",
      price: 39.99,
      discount: 15.0,
      images: ["/slider/slider-3.jpg"],
      isAvailable: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  return (
    <div>
      <Slider images={banners.map((obj) => obj.image)} />
      <Separator className="my-8" />
      <Heading
        title="Products"
        description="Below is a list of products we have available for you."
      />
      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <ProductSkeletonGrid />
      )}
    </div>
  );
};

export default Home;
