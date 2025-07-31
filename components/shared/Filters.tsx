"use client";
import React, { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { Slider } from "../ui/slider";
import { Label } from "../ui/label";
import { Filter, ChevronDown, Logs, ChevronRight } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import ExpandableList from "./ExpandableList";
import { Category } from "@/models/category.model";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface FiltersProps {
  colors: string[];
  brands: string[];
  categories: Category[];
  slug: string;
  selectedColors?: string[];
  selectedBrands?: string[];
  priceRange?: [number, number];
  onColorChange?: (colors: string[]) => void;
  onBrandChange?: (brands: string[]) => void;
  onPriceChange?: (range: [number, number]) => void;
  minPrice?: number;
  maxPrice?: number;
}

const LOCAL_KEY = "category-list-show-all";

const Filters = ({
  colors,
  brands,
  categories,
  slug: currentSlug,
  selectedColors = [],
  selectedBrands = [],
  priceRange = [0, 1000],
  onColorChange,
  onBrandChange,
  onPriceChange,
  minPrice = 0,
  maxPrice = 1000,
}: FiltersProps) => {
  const pathname = usePathname();
  const [showAllCategories, setShowAllCategories] = useState(false);

  const visibleCategories = showAllCategories
    ? categories
    : categories?.slice(0, 5);

  const handleColorChange = (color: string, checked: boolean) => {
    if (!onColorChange) return;
    
    let newColors;
    if (checked) {
      newColors = [...selectedColors, color];
    } else {
      newColors = selectedColors.filter(c => c !== color);
    }
    onColorChange(newColors);
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (!onBrandChange) return;
    
    let newBrands;
    if (checked) {
      newBrands = [...selectedBrands, brand];
    } else {
      newBrands = selectedBrands.filter(b => b !== brand);
    }
    onBrandChange(newBrands);
  };

  const handlePriceChange = (values: number[]) => {
    if (!onPriceChange || values.length !== 2) return;
    onPriceChange([values[0], values[1]]);
  };

  useEffect(() => {
    if (!pathname.startsWith("/categories/")) {
      sessionStorage.removeItem(LOCAL_KEY);
      setShowAllCategories(false);
      return;
    }

    const saved = sessionStorage.getItem(LOCAL_KEY);
    if (saved === "true") {
      setShowAllCategories(true);
    }
  }, [pathname]);

  const handleShowAllCategories = () => {
    sessionStorage.setItem(LOCAL_KEY, "true");
    setShowAllCategories(true);
  };

  return (
    <div>
      {categories && (
        <div className="mb-4">
          <Link
            href="/categories"
            className="text-lg font-semibold my-1 block md:text-base"
          >
            <div className="flex items-center">
              <div className="w-6 flex">
                <Logs className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <Label className="text-lg font-semibold cursor-pointer">All Categories</Label>
              </div>
            </div>
          </Link>
          <Separator className="my-2" />
          {visibleCategories.map((category) => (
            <div key={category.id} className="flex items-center">
              <div className="w-4 flex">
                {category.slug === currentSlug && (
                  <ChevronRight className="w-4 h-4" />
                )}
              </div>
              <div className="flex-1">
                <Link
                  href={`/categories/${category.slug}`}
                  className={`text-lg underline-offset-4 ${
                    category.slug === currentSlug
                      ? "font-medium cursor-default"
                      : "hover:underline"
                  } my-1 block md:text-base`}
                >
                  {category.name}
                </Link>
              </div>
            </div>
          ))}
          {!showAllCategories && categories.length > 5 && (
            <div className="flex items-center">
              <div className="w-6 flex">
                <ChevronDown className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <Label
                  onClick={handleShowAllCategories}
                  className="text-lg font-medium underline-offset-4 hover:underline block md:text-base cursor-pointer"
                >
                  More
                </Label>
              </div>
            </div>
          )}
          <Separator className="my-4" />
        </div>
      )}

      <div className="flex items-center">
        <div className="w-6 flex">
          <Filter className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <Label className="text-lg font-semibold">Filters</Label>
        </div>
      </div>
      <Label className="text-md font-semibold my-2">Colors</Label>
      <ExpandableList
        items={colors}
        renderItem={(color) => (
          <div key={color} className="flex items-center gap-3">
            <Checkbox 
              className="cursor-pointer" 
              id={`color-${color}`}
              checked={selectedColors.includes(color)}
              onCheckedChange={(checked) => handleColorChange(color, checked === true)}
            />
            <Label
              htmlFor={`color-${color}`}
              className="text-md font-normal cursor-pointer"
            >
              {color}
            </Label>
          </div>
        )}
      />
      <Separator className="my-2" />
      <Label className="text-md font-semibold my-2">Brands</Label>
      <ExpandableList
        items={brands}
        renderItem={(brand) => (
          <div key={brand} className="flex items-center gap-3">
            <Checkbox 
              className="cursor-pointer" 
              id={`brand-${brand}`}
              checked={selectedBrands.includes(brand)}
              onCheckedChange={(checked) => handleBrandChange(brand, checked === true)}
            />
            <Label
              htmlFor={`brand-${brand}`}
              className="text-md font-normal cursor-pointer"
            >
              {brand}
            </Label>
          </div>
        )}
      />
      <Separator className="my-2" />
      <Label className="text-md font-semibold my-2">Price</Label>
      <div className="flex items-center my-1 gap-2 justify-between">
        <Label htmlFor="min-price" className="text-sm">
          ${priceRange[0]}
        </Label>
        <Label htmlFor="max-price" className="text-sm">
          ${priceRange[1]}
        </Label>
      </div>
      <Slider 
        value={priceRange} 
        onValueChange={handlePriceChange}
        max={maxPrice} 
        min={minPrice}
        step={10}
        className="my-2"
      />
    </div>
  );
};

export default Filters;
