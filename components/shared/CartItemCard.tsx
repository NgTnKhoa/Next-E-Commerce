import React from "react";
import { Card, CardContent } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import Image from "next/image";
import { Button } from "../ui/button";
import { Minus, Plus, Trash2, Palette } from "lucide-react";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { CartItem } from "@/models/cartItem.model";
import MockData from "@/data/mockData";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface CartItemCardProps {
  cartItem: CartItem;
  updateQuantity: (id: number, change: number) => void;
  updateQuantityDirect: (id: number, quantity: number) => void;
  toggleItemSelection: (id: number) => void;
  removeItem: (id: number) => void;
  updateColor?: (id: number, color: string) => void;
}

const CartItemCard = ({
  cartItem: item,
  updateQuantity,
  updateQuantityDirect,
  toggleItemSelection,
  removeItem,
  updateColor,
}: CartItemCardProps) => {
  // Find the product to get available colors
  const product = MockData.products.find(p => p.name === item.name);
  const availableColors = product?.colors || [];
  const hasMultipleColors = availableColors.length > 1;
  const productSlug = product?.slug;
  return (
    <Card
      key={item.id}
      className={`py-0 transition-all ${
        item.selected ? "ring-2 ring-primary" : ""
      }`}
    >
      <CardContent className="p-6">
        <div className="flex gap-4 min-h-[140px]">
          <div className="flex items-center justify-center">
            <Checkbox
              checked={item.selected}
              onCheckedChange={() => toggleItemSelection(item.id)}
              disabled={!item.inStock}
              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
          </div>

          <div className="w-32 relative rounded-lg overflow-hidden flex-shrink-0 self-stretch">
            {productSlug ? (
              <Link href={`/products/${productSlug}`}>
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain hover:scale-105 transition-transform cursor-pointer"
                />
              </Link>
            ) : (
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-contain"
              />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <div>
                {productSlug ? (
                  <Link href={`/products/${productSlug}`}>
                    <h3 className="font-semibold truncate hover:text-primary transition-colors cursor-pointer">{item.name}</h3>
                  </Link>
                ) : (
                  <h3 className="font-semibold truncate">{item.name}</h3>
                )}
                {productSlug ? (
                  <Link href={`/products/${productSlug}`}>
                    <p className="text-sm hover:text-primary transition-colors cursor-pointer">{item.brand}</p>
                  </Link>
                ) : (
                  <p className="text-sm">{item.brand}</p>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-sm">Color:</span>
                  {hasMultipleColors && updateColor ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 px-2 text-xs"
                        >
                          <Palette className="h-3 w-3 mr-1" />
                          {item.color}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {availableColors.map((color) => (
                          <DropdownMenuItem
                            key={color}
                            onClick={() => updateColor(item.id, color)}
                            className={item.color === color ? "bg-accent" : ""}
                          >
                            {color}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <span className="text-sm">{item.color}</span>
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeItem(item.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="mb-3">
              {item.inStock ? (
                <Badge variant="default" className="text-xs">
                  In Stock
                </Badge>
              ) : (
                <Badge variant="destructive" className="text-xs">
                  Out of Stock
                </Badge>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-primary">
                    ${item.discountedPrice.toFixed(2)}
                  </span>
                  {item.discount > 0 && (
                    <span className="text-sm line-through text-gray-500">
                      ${item.price.toFixed(2)}
                    </span>
                  )}
                  {item.discount > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      -{item.discount}%
                    </Badge>
                  )}
                </div>
                <p className="text-xs">
                  Subtotal: ${(item.discountedPrice * item.quantity).toFixed(2)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateQuantity(item.id, -1)}
                  disabled={item.quantity <= 1 || !item.inStock}
                  className="h-8 w-8"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <Input
                  type="number"
                  min="1"
                  max={item.maxQuantity}
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantityDirect(item.id, parseInt(e.target.value))
                  }
                  disabled={!item.inStock}
                  className="w-12 h-8 text-center text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateQuantity(item.id, 1)}
                  disabled={item.quantity >= item.maxQuantity || !item.inStock}
                  className="h-8 w-8"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartItemCard;
