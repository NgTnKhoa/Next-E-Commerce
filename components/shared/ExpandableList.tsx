"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { ChevronDown } from "lucide-react";

interface ExpandableListProps<T> {
  items: T[];
  limit?: number;
  renderItem: (item: T, index: number) => React.ReactNode;
}

const ExpandableList = <T,>({
  items,
  limit = 3,
  renderItem,
}: ExpandableListProps<T>) => {
  const [expanded, setExpanded] = useState(false);
  const visibleItems = expanded ? items : items.slice(0, limit);

  return (
    <div className="flex flex-col gap-2">
      {visibleItems.map(renderItem)}
      {items.length > limit && !expanded && (
        <div className="flex items-center">
          <div className="w-6 flex">
            <ChevronDown className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <Label
              onClick={() => setExpanded(true)}
              className="text-lg font-medium underline-offset-4 hover:underline block md:text-base cursor-pointer"
            >
              More
            </Label>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpandableList;
