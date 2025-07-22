"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Trash2, ShoppingBag, ArrowLeft, Home } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { CartItem } from "@/models/cartItem.model";
import CartItemCard from "@/components/shared/CartItemCard";
import OrderInformation from "@/components/shared/OrderInformation";

interface PromoCode {
  code: string;
  discount: number;
}

// Mock cart data - in a real app, this would come from state management or API
const mockCartItems: CartItem[] = [
  {
    id: 1,
    name: "MacBook Pro 16",
    brand: "Apple",
    price: 2499.0,
    discountedPrice: 2249.1,
    discount: 10,
    quantity: 1,
    image: "/product/laptop/apple-macbook-pro/apple-macbook-pro-1.jpg",
    color: "Space Gray",
    inStock: true,
    maxQuantity: 5,
    selected: true,
  },
  {
    id: 2,
    name: "Wireless Bluetooth Headphones",
    brand: "Sony",
    price: 299.99,
    discountedPrice: 249.99,
    discount: 17,
    quantity: 2,
    image: "/product/accessory/bluetooth-headphones/bluetooth-headphones-1.jpg",
    color: "Black",
    inStock: true,
    maxQuantity: 10,
    selected: true,
  },
  {
    id: 3,
    name: "Gaming Mouse Pro",
    brand: "Logitech",
    price: 89.99,
    discountedPrice: 79.99,
    discount: 11,
    quantity: 1,
    image: "/product/accessory/wireless-mouse/wireless-mouse-1.jpg",
    color: "RGB Black",
    inStock: false,
    maxQuantity: 0,
    selected: false,
  },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);

  const selectedItems = cartItems.filter((item) => item.selected);

  const allSelected =
    cartItems.length > 0 && cartItems.every((item) => item.selected);
  const someSelected = cartItems.some((item) => item.selected);

  const updateQuantity = (id: number, change: number) => {
    setCartItems((items) =>
      items.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(
            1,
            Math.min(item.maxQuantity, item.quantity + change)
          );
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const updateQuantityDirect = (id: number, newQuantity: number) => {
    setCartItems((items) =>
      items.map((item) => {
        if (item.id === id) {
          const quantity = Math.max(
            1,
            Math.min(item.maxQuantity, newQuantity || 1)
          );
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const toggleItemSelection = (id: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const toggleSelectAll = () => {
    const newSelectedState = !allSelected;
    setCartItems((items) =>
      items.map((item) => ({ ...item, selected: newSelectedState }))
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const removeSelectedItems = () => {
    setCartItems((items) => items.filter((item) => !item.selected));
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "save5") {
      setAppliedPromo({ code: "SAVE5", discount: 0.05 });
      alert("Promo code applied! 5% discount added.");
    } else {
      alert("Invalid promo code. Try 'SAVE5' for 5% off!");
    }
  };

  return (
    <div>
      <Breadcrumb className="mb-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href="/">
              <Home className="h-4 w-4 mr-1" />
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Shopping Cart</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingBag className="h-24 w-24 mx-auto text-gray-600 mb-6" />
          <h2 className="text-2xl font-bold mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Button asChild size="lg">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Link>
          </Button>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
                <p className="text-gray-500">
                  {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in
                  your cart
                </p>
              </div>
              {cartItems.length > 0 && (
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
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  updateQuantity={updateQuantity}
                  updateQuantityDirect={updateQuantityDirect}
                  toggleItemSelection={toggleItemSelection}
                  removeItem={removeItem}
                />
              ))}

              <div className="pt-4">
                <Button variant="outline" asChild>
                  <Link href="/">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            </div>

            <OrderInformation
              selectedItems={selectedItems}
              appliedPromo={appliedPromo}
              setPromoCode={setPromoCode}
              promoCode={promoCode}
              applyPromoCode={applyPromoCode}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
