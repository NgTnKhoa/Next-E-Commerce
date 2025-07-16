"use client";
import React from "react";
import { Separator } from "../ui/separator";
import { Slider } from "../ui/slider";
import { Label } from "../ui/label";
import { Filter } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import ExpandableList from "./ExpandableList";

interface FiltersProps {
  colors: string[];
  brands: string[];
}

const Filters = ({ colors, brands }: FiltersProps) => {
  return (
    <div>
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
            <Checkbox className="cursor-pointer" id={color} />
            <Label
              htmlFor={color}
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
            <Checkbox className="cursor-pointer" id={brand} />
            <Label
              htmlFor={brand}
              className="text-md font-normal cursor-pointer"
            >
              {brand}
            </Label>
          </div>
        )}
      />
      <Separator className="my-2" />
      <Label className="text-md font-semibold my-2">Price</Label>
      <div className="flex itms-ecenter my-1 gap-2 justify-between">
        <Label htmlFor="min-price" className="text-sm">
          Min
        </Label>
        <Label htmlFor="max-price" className="text-sm">
          Max
        </Label>
      </div>
      <Slider defaultValue={[50]} max={100} step={1} />
    </div>
  );
};

export default Filters;
