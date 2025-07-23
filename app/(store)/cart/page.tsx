"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ShoppingBag, ArrowLeft, Home } from "lucide-react";
import CartContent from "@/components/shared/CartContent";
import { useCart } from "@/hooks/use-cart";

const Cart = () => {
  const { cartItems, isLoading } = useCart();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

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
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">
            {"Looks like you haven't added any items to your cart yet."}
          </p>
          <Button asChild size="lg">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Link>
          </Button>
        </div>
      ) : (
        <CartContent />
      )}
    </div>
  );
};

export default Cart;
