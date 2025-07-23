import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Shield, Tag, Truck } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CartItem } from "@/models/cartItem.model";

interface OrderContentProps {
  selectedItems: CartItem[];
  appliedPromo: { code: string; discount: number } | null;
  setPromoCode: React.Dispatch<React.SetStateAction<string>>;
  promoCode: string;
  applyPromoCode: () => void;
}

const OrderContent = ({
  selectedItems,
  appliedPromo,
  setPromoCode,
  promoCode,
  applyPromoCode,
}: OrderContentProps) => {
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
  const tax = (subtotal - promoDiscount + shippingCost) * 0.08;
  const total = subtotal - promoDiscount + shippingCost + tax;

  return (
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
              <span>{`Code "${appliedPromo.code}" applied!`}</span>
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
                  Please remove out-of-stock items from selection to continue
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
  );
};

export default OrderContent;
