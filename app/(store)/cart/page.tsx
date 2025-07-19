"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
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
} from "lucide-react";

// Types
interface CartItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  discountedPrice: number;
  discount: number;
  quantity: number;
  image: string;
  color: string;
  inStock: boolean;
  maxQuantity: number;
}

interface PromoCode {
  code: string;
  discount: number;
}

// Mock cart data - in a real app, this would come from state management or API
const mockCartItems = [
  {
    id: 1,
    name: "MacBook Pro 16",
    brand: "Apple",
    price: 2499.00,
    discountedPrice: 2249.10,
    discount: 10,
    quantity: 1,
    image: "/product/laptop/apple-macbook-pro/1.jpg",
    color: "Space Gray",
    inStock: true,
    maxQuantity: 5,
  },
  {
    id: 2,
    name: "Wireless Bluetooth Headphones",
    brand: "Sony",
    price: 299.99,
    discountedPrice: 249.99,
    discount: 17,
    quantity: 2,
    image: "/product/accessory/bluetooth-headphones/1.jpg",
    color: "Black",
    inStock: true,
    maxQuantity: 10,
  },
  {
    id: 3,
    name: "Gaming Mouse Pro",
    brand: "Logitech",
    price: 89.99,
    discountedPrice: 79.99,
    discount: 11,
    quantity: 1,
    image: "/product/accessory/wireless-mouse/1.jpg",
    color: "RGB Black",
    inStock: false,
    maxQuantity: 0,
  },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.discountedPrice * item.quantity), 0);
  const totalSavings = cartItems.reduce((sum, item) => sum + ((item.price - item.discountedPrice) * item.quantity), 0);
  const shippingCost = subtotal > 50 ? 0 : 9.99;
  const promoDiscount = appliedPromo ? subtotal * 0.05 : 0; // 5% discount for demo
  const tax = (subtotal - promoDiscount + shippingCost) * 0.08; // 8% tax
  const total = subtotal - promoDiscount + shippingCost + tax;

  // Handle quantity change
  const updateQuantity = (id: number, change: number) => {
    setCartItems(items =>
      items.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(1, Math.min(item.maxQuantity, item.quantity + change));
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  // Remove item from cart
  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
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

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
        <p className="text-gray-600">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="w-24 h-24 relative rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.brand}</p>
                        <p className="text-sm text-gray-600">Color: {item.color}</p>
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

                    {/* Stock Status */}
                    <div className="mb-3">
                      {item.inStock ? (
                        <Badge variant="default" className="text-xs">In Stock</Badge>
                      ) : (
                        <Badge variant="destructive" className="text-xs">Out of Stock</Badge>
                      )}
                    </div>

                    {/* Price and Quantity */}
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-primary">${item.discountedPrice.toFixed(2)}</span>
                          {item.discount > 0 && (
                            <span className="text-sm line-through text-gray-500">${item.price.toFixed(2)}</span>
                          )}
                          {item.discount > 0 && (
                            <Badge variant="destructive" className="text-xs">-{item.discount}%</Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-600">
                          Subtotal: ${(item.discountedPrice * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      {/* Quantity Controls */}
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
                        <span className="w-8 text-center font-medium text-sm">{item.quantity}</span>
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

        {/* Order Summary */}
        <div className="space-y-6">
          {/* Promo Code */}
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

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
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
                <span>{shippingCost > 0 ? `$${shippingCost.toFixed(2)}` : 'FREE'}</span>
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

              {/* Shipping Info */}
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <Truck className="h-4 w-4" />
                  <span>{shippingCost > 0 ? `Add $${(50 - subtotal).toFixed(2)} more for free shipping` : 'Free shipping applied!'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="h-4 w-4" />
                  <span>Secure checkout guaranteed</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Button size="lg" className="w-full mt-4" disabled={cartItems.some(item => !item.inStock)}>
                <CreditCard className="h-4 w-4 mr-2" />
                Proceed to Checkout
              </Button>

              {cartItems.some(item => !item.inStock) && (
                <p className="text-sm text-red-600 text-center">
                  Please remove out-of-stock items to continue
                </p>
              )}
            </CardContent>
          </Card>

          {/* Security Info */}
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