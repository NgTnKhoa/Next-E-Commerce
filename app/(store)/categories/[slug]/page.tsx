import Heading from "@/components/shared/Heading";
import { ProductGrid } from "@/components/shared/ProductGrid";
import { ProductSkeletonGrid } from "@/components/shared/ProductSkeletonGrid";
import { Category } from "@/models/category.model";
import { Product } from "@/models/product.model";
import React from "react";
import CategoryList from "@/components/shared/CategoryList";
import Filters from "@/components/shared/Filters";
import MockData from "@/data/mockData";

interface CategoryDetailsProps {
  params: { slug: string };
}

const CategoryDetails = ({ params }: CategoryDetailsProps) => {
  const { slug } = params;
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
    <div>
      <Heading
        title={
          categories.find((category) => category.slug === slug)?.name ||
          "Category"
        }
        description="Below is a list of products we have available for you."
      />
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-1 overflow-hidden">
          <aside className="hidden lg:block w-[12vw] p-4">
            <CategoryList categories={categories} slug={slug} />
            <Filters colors={colors} brands={brands} />
          </aside>
          <main className="flex-1 min-w-0 p-4">
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
