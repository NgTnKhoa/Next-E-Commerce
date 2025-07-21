"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowLeft,
  Home,
  Tag,
  Truck,
  Shield,
  CreditCard,
  Check,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { CartItem } from "@/models/cartItem.model";
import CartItemCard from "@/components/shared/CartItemCard";

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

  // Get selected items for calculations
  const selectedItems = cartItems.filter((item) => item.selected);

  // Calculate totals only for selected items
  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.discountedPrice * item.quantity,
    0
  );
  const totalSavings = selectedItems.reduce(
    (sum, item) => sum + (item.price - item.discountedPrice) * item.quantity,
    0
  );
  const shippingCost = subtotal > 50 ? 0 : 9.99;
  const promoDiscount = appliedPromo ? subtotal * appliedPromo.discount : 0;
  const tax = (subtotal - promoDiscount + shippingCost) * 0.08; // 8% tax
  const total = subtotal - promoDiscount + shippingCost + tax;

  // Check if all items are selected
  const allSelected =
    cartItems.length > 0 && cartItems.every((item) => item.selected);
  const someSelected = cartItems.some((item) => item.selected);

  // Handle quantity change
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

  // Handle direct quantity input
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

  // Toggle item selection
  const toggleItemSelection = (id: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  // Select/deselect all items
  const toggleSelectAll = () => {
    const newSelectedState = !allSelected;
    setCartItems((items) =>
      items.map((item) => ({ ...item, selected: newSelectedState }))
    );
  };

  // Remove item from cart
  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  // Remove selected items
  const removeSelectedItems = () => {
    setCartItems((items) => items.filter((item) => !item.selected));
  };

  // Apply promo code
  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "save5") {
      setAppliedPromo({ code: "SAVE5", discount: 0.05 });
      alert("Promo code applied! 5% discount added.");
    } else {
      alert("Invalid promo code. Try 'SAVE5' for 5% off!");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  <Home className="h-4 w-4 mr-1" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Shopping Cart</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Empty Cart */}
        <div className="text-center py-16">
          <ShoppingBag className="h-24 w-24 mx-auto text-gray-300 mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
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
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumb */}
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

      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
            <p className="text-gray-500">
              {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in your
              cart
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
        {/* Cart Items */}
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

          {/* Continue Shopping */}
          <div className="pt-4">
            <Button variant="outline" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Promo Code
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={applyPromoCode} disabled={!promoCode.trim()}>
                  Apply
                </Button>
              </div>
              {appliedPromo && (
                <div className="flex items-center gap-2 text-green-600 text-sm">
                  <Tag className="h-4 w-4" />
                  <span>Code "{appliedPromo.code}" applied!</span>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>
                  Subtotal (
                  {selectedItems.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                  selected items)
                </span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {totalSavings > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Total Savings</span>
                  <span>-${totalSavings.toFixed(2)}</span>
                </div>
              )}

              {appliedPromo && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Promo Discount ({appliedPromo.code})</span>
                  <span>-${promoDiscount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>
                  {shippingCost > 0 ? `$${shippingCost.toFixed(2)}` : "FREE"}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>

              {selectedItems.length === 0 && (
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500">No items selected</p>
                </div>
              )}

              {selectedItems.length > 0 && (
                <>
                  {/* Shipping Info */}
                  <div className="mt-4 p-3 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <Truck className="h-4 w-4" />
                      <span>
                        {shippingCost > 0
                          ? `Add $${(50 - subtotal).toFixed(
                              2
                            )} more for free shipping`
                          : "Free shipping applied!"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Shield className="h-4 w-4" />
                      <span>Secure checkout guaranteed</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Button
                    size="lg"
                    className="w-full mt-4"
                    disabled={
                      selectedItems.some((item) => !item.inStock) ||
                      selectedItems.length === 0
                    }
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Proceed to Checkout ({selectedItems.length} items)
                  </Button>

                  {selectedItems.some((item) => !item.inStock) && (
                    <p className="text-sm text-red-600 text-center">
                      Please remove out-of-stock items from selection to
                      continue
                    </p>
                  )}
                </>
              )}
            </CardContent>
          </Card>
          <div className="text-center text-sm text-gray-600">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Shield className="h-4 w-4" />
              <span>Secure SSL Encryption</span>
            </div>
            <p>Your payment information is protected</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;
