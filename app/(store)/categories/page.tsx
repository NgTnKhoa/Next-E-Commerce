import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import Link from "next/link";
import MockData from "@/data/mockData";
import { CategoryGrid } from "@/components/shared/CategoryGrid";
import Heading from "@/components/shared/Heading";

const Categories = () => {
  const allCategories = MockData.categories;

  return (
    <div className="px-6">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href="/">
              <Home className="h-4 w-4 mr-1" />
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Categories</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Heading
        title="All Categories"
        description="Browse through our wide range of product categories"
        className="mb-8"
      />

      <div className="mb-8">
        <CategoryGrid categories={allCategories} />
      </div>
    </div>
  );
};

export default Categories;