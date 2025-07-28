"use client";

import { CategoryGrid } from "@/components/shared/CategoryGrid";
import Heading from "@/components/shared/Heading";
import { ProductGrid } from "@/components/shared/ProductGrid";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import MockData from "@/data/mockData";
import { Category } from "@/models/category.model";
import { Product } from "@/models/product.model";
import React, { useState, useMemo, useEffect } from "react";
import { Search, X, ArrowLeft } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const allCategories: Category[] = MockData.categories;
  const allProducts: Product[] = MockData.products;

  // Initialize search term from URL params
  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchTerm(query);
    }
  }, [searchParams]);

  // Search filtering logic
  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) {
      return {
        categories: [],
        products: [],
        hasResults: false
      };
    }

    const searchLower = searchTerm.toLowerCase();
    
    const filteredCategories = allCategories.filter(category =>
      category.name.toLowerCase().includes(searchLower) ||
      category.description.toLowerCase().includes(searchLower)
    );

    const filteredProducts = allProducts.filter(product =>
      product.name.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower) ||
      product.brand.toLowerCase().includes(searchLower) ||
      product.categoryNames.some(cat => cat.toLowerCase().includes(searchLower))
    );

    return {
      categories: filteredCategories,
      products: filteredProducts,
      hasResults: filteredCategories.length > 0 || filteredProducts.length > 0
    };
  }, [searchTerm, allCategories, allProducts]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    router.push('/search');
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    router.push(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  return (
    <div className="px-6">
      {/* Header with back button */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Search</h1>
      </div>
      
      {/* Search Bar */}
      <div className="mb-8 max-w-2xl mx-auto">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search products, categories, brands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-10"
              autoFocus
            />
            {searchTerm && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Button type="submit" disabled={!searchTerm.trim()}>
            Search
          </Button>
        </form>
        
        {/* Search Status */}
        {searchTerm && (
          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {searchResults.hasResults 
                ? `Found ${searchResults.categories.length + searchResults.products.length} results for "${searchTerm}"`
                : `No results found for "${searchTerm}"`
              }
            </span>
            {searchTerm && (
              <Button variant="outline" size="sm" onClick={clearSearch}>
                Clear Search
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Search Suggestions - Show when no search term */}
      {!searchTerm && (
        <div className="mb-8 p-4 bg-muted rounded-lg max-w-2xl mx-auto">
          <h4 className="text-sm font-medium mb-2">Popular searches:</h4>
          <div className="flex flex-wrap gap-2">
            {["smartphones", "laptops", "accessories", "gaming", "tablets", "wearables", "smart home"].map((suggestion) => (
              <Badge 
                key={suggestion}
                variant="outline" 
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Results or No Search Term */}
      {!searchTerm ? (
        <div className="text-center py-12">
          <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">Start searching</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Enter a search term above or click on a popular search suggestion
          </p>
        </div>
      ) : (
        <>
          <Separator className="my-6" />
          
          {/* Categories Section */}
          {searchResults.categories.length > 0 && (
            <>
              <Heading
                title="Categories"
                description={`${searchResults.categories.length} categories found`}
              />
              <CategoryGrid categories={searchResults.categories} />
              <Separator className="my-6" />
            </>
          )}
          
          {/* Products Section */}
          <Heading
            title="Products"
            description={searchResults.products.length > 0 
              ? `${searchResults.products.length} products found`
              : "No products match your search criteria"
            }
          />
          
          {/* Search Results or No Results */}
          {!searchResults.hasResults ? (
            <div className="text-center py-12">
              <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No results found</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Try adjusting your search terms or browse our categories
              </p>
              <div className="mt-4 space-x-2">
                <Button onClick={clearSearch}>
                  Try New Search
                </Button>
                <Link href="/">
                  <Button variant="outline">
                    Browse All Products
                  </Button>
                </Link>
              </div>
            </div>
          ) : searchResults.products.length > 0 ? (
            <ProductGrid products={searchResults.products} isFeatured={false} />
          ) : null}
          
          {/* Additional Search Suggestions */}
          {searchResults.hasResults && (
            <div className="mt-8 p-4 bg-muted rounded-lg">
              <h4 className="text-sm font-medium mb-2">Related searches:</h4>
              <div className="flex flex-wrap gap-2">
                {["smartphones", "laptops", "accessories", "gaming", "tablets"].map((suggestion) => (
                  <Badge 
                    key={suggestion}
                    variant="outline" 
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchPage;
