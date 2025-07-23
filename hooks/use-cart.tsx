"use client";

import { useState, useEffect } from "react";
import { CartItem } from "@/models/cartItem.model";

const CART_STORAGE_KEY = "ecommerce-cart";

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from localStorage on component mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save cart to localStorage whenever cartItems changes
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
      } catch (error) {
        console.error("Error saving cart to localStorage:", error);
      }
    }
  }, [cartItems, isLoading]);

  // Add item to cart
  const addToCart = (item: Omit<CartItem, "id" | "selected">) => {
    const existingItem = cartItems.find((cartItem) => 
      cartItem.name === item.name && cartItem.color === item.color
    );

    if (existingItem) {
      updateQuantity(existingItem.id, item.quantity);
    } else {
      const newItem: CartItem = {
        ...item,
        id: Date.now(), // Simple ID generation
        selected: true,
      };
      setCartItems((prev) => [...prev, newItem]);
    }
  };

  // Remove item from cart
  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Update quantity
  const updateQuantity = (id: number, change: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
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

  // Update quantity directly
  const updateQuantityDirect = (id: number, newQuantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
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
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  // Toggle select all
  const toggleSelectAll = () => {
    const allSelected = cartItems.length > 0 && cartItems.every((item) => item.selected);
    const newSelectedState = !allSelected;
    setCartItems((prev) =>
      prev.map((item) => ({ ...item, selected: newSelectedState }))
    );
  };

  // Remove selected items
  const removeSelectedItems = () => {
    setCartItems((prev) => prev.filter((item) => !item.selected));
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Get cart statistics
  const cartStats = {
    totalItems: cartItems.reduce((sum, item) => sum + item.quantity, 0),
    selectedItems: cartItems.filter((item) => item.selected),
    totalPrice: cartItems.reduce((sum, item) => {
      const price = item.discountedPrice || item.price;
      return sum + (price * item.quantity);
    }, 0),
    selectedTotalPrice: cartItems
      .filter((item) => item.selected)
      .reduce((sum, item) => {
        const price = item.discountedPrice || item.price;
        return sum + (price * item.quantity);
      }, 0),
    allSelected: cartItems.length > 0 && cartItems.every((item) => item.selected),
    someSelected: cartItems.some((item) => item.selected),
  };

  return {
    cartItems,
    isLoading,
    addToCart,
    removeItem,
    updateQuantity,
    updateQuantityDirect,
    toggleItemSelection,
    toggleSelectAll,
    removeSelectedItems,
    clearCart,
    cartStats,
  };
};
