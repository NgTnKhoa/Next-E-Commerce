import { CartItem } from "@/models/cartItem.model";
import CartItemCard from "./CartItemCard";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

interface CartItemListProps {
  cartItems: CartItem[];
  updateQuantity: (id: number, change: number) => void;
  updateQuantityDirect: (id: number, quantity: number) => void;
  toggleItemSelection: (id: number) => void;
  removeItem: (id: number) => void;
  toggleSelectAll: () => void;
  removeSelectedItems: () => void;
}

const CartItemList = ({
  cartItems,
  updateQuantity,
  updateQuantityDirect,
  toggleItemSelection,
  removeItem,
  toggleSelectAll,
  removeSelectedItems,
}: CartItemListProps) => {
  const allSelected =
    cartItems.length > 0 && cartItems.every((item) => item.selected);
  const someSelected = cartItems.some((item) => item.selected);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-gray-500">
            {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in your
            cart
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="select-all"
              checked={allSelected}
              onCheckedChange={toggleSelectAll}
            />
            <Label htmlFor="select-all" className="text-sm font-medium">
              Select All ({cartItems.length})
            </Label>
          </div>
          {someSelected && (
            <Button
              variant="outline"
              size="sm"
              onClick={removeSelectedItems}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Remove Selected
            </Button>
          )}
        </div>
      </div>
      <div className="mt-4 space-y-4">
        {cartItems.map((item) => (
          <CartItemCard
            key={item.id}
            cartItem={item}
            updateQuantity={updateQuantity}
            updateQuantityDirect={updateQuantityDirect}
            toggleItemSelection={toggleItemSelection}
            removeItem={removeItem}
          />
        ))}
      </div>
    </div>
  );
};

export default CartItemList;
