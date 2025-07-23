"use client";

import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import OrderContent from "./OrderContent";
import { useState } from "react";
import { useCart } from "@/hooks/use-cart";
import CartItemList from "./CartItemList";

interface PromoCode {
  code: string;
  discount: number;
}

const CartContent = () => {
  const {
    cartItems,
    updateQuantity,
    updateQuantityDirect,
    toggleItemSelection,
    removeItem,
    toggleSelectAll,
    removeSelectedItems,
    cartStats,
  } = useCart();

  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "save5") {
      setAppliedPromo({ code: "SAVE5", discount: 0.05 });
      alert("Promo code applied! 5% discount added.");
    } else {
      alert("Invalid promo code. Try 'SAVE5' for 5% off!");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        <CartItemList
          cartItems={cartItems}
          updateQuantity={updateQuantity}
          updateQuantityDirect={updateQuantityDirect}
          toggleItemSelection={toggleItemSelection}
          removeItem={removeItem}
          toggleSelectAll={toggleSelectAll}
          removeSelectedItems={removeSelectedItems}
        />

        <div className="pt-4">
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>

      <OrderContent
        selectedItems={cartStats.selectedItems}
        appliedPromo={appliedPromo}
        setPromoCode={setPromoCode}
        promoCode={promoCode}
        applyPromoCode={applyPromoCode}
      />
    </div>
  );
};

export default CartContent;
