import { Suspense } from "react";
import MockData from "@/data/mockData";
import { Category } from "@/models/category.model";
import { Product } from "@/models/product.model";
import SearchContent from "@/components/shared/SearchContent";
import { ProductSkeletonGrid } from "@/components/shared/ProductSkeletonGrid";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const allCategories: Category[] = MockData.categories;
  const allProducts: Product[] = MockData.products;
  const resolvedSearchParams = await searchParams;
  const initialQuery = resolvedSearchParams.q || "";

  return (
    <div className="px-6">
      <div className="flex items-center justify-center mb-6 w-full min-h-12 relative">
        <Link href="/" className="absolute left-0">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Search Results</h1>
      </div>

      <Suspense fallback={<ProductSkeletonGrid />}>
        <SearchContent
          initialQuery={initialQuery}
          allCategories={allCategories}
          allProducts={allProducts}
        />
      </Suspense>
    </div>
  );
};

export default SearchPage;
