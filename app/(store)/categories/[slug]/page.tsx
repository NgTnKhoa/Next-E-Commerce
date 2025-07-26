import Heading from "@/components/shared/Heading";
import { ProductGrid } from "@/components/shared/ProductGrid";
import { ProductSkeletonGrid } from "@/components/shared/ProductSkeletonGrid";
import { Category } from "@/models/category.model";
import { Product } from "@/models/product.model";
import React from "react";
import CategoryList from "@/components/shared/CategoryList";
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

interface CategoryDetailsProps {
  params: Promise<{ slug: string }>;
}

const CategoryDetails = async ({ params }: CategoryDetailsProps) => {
  const { slug } = await params;
  const categories: Category[] = MockData.categories;
  const category = categories.find((cat) => cat.slug === slug);
  const products: Product[] = category
    ? MockData.products.filter((product) =>
        product.categoryNames.includes(category.name)
      )
    : [];
  const colors = [...new Set(products.flatMap((p) => p.colors ?? []))];
  const brands = [
    ...new Set(products.flatMap((p) => (p.brand ? [p.brand] : []))),
  ];

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
            <DropdownMenuItem>Featured</DropdownMenuItem>
            <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
            <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
            <DropdownMenuItem>Name: A to Z</DropdownMenuItem>
            <DropdownMenuItem>Name: Z to A</DropdownMenuItem>
            <DropdownMenuItem>Newest First</DropdownMenuItem>
            <DropdownMenuItem>Best Rating</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-1 overflow-hidden gap-6">
          <aside className="hidden lg:block w-[10vw]">
            <CategoryList categories={categories} slug={slug} />
            <Filters colors={colors} brands={brands} />
          </aside>
          <main className="flex-1 min-w-0">
            {products.length > 0 ? (
              <ProductGrid
                products={products.filter((product) =>
                  product.categoryNames.find(
                    (categoryName) => categoryName === category?.name
                  )
                )}
                isFeatured={false}
              />
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
