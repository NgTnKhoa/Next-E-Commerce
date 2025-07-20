"use client";

import React, { useEffect, useState } from "react";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Minus,
  Plus,
} from "lucide-react";
import { Product } from "@/models/product.model";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";

interface ProductInformationProps {
  product: Product;
}

const ProductInformation = ({ product }: ProductInformationProps) => {
  const [quantity, setQuantity] = useState(1);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const discountedPrice =
    product.price - (product.price * product.discount) / 100;

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const handleThumbnailClick = (index: number) => {
    if (carouselApi) {
      carouselApi.scrollTo(index);
    }
    setCurrentImageIndex(index);
  };

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    carouselApi.on("select", () => {
      setCurrentImageIndex(carouselApi.selectedScrollSnap());
    });
  }, [carouselApi]);

  return (
    <Card>
      <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-[4/3] relative overflow-hidden rounded-lg border">
            <Carousel className="absolute inset-0" setApi={setCarouselApi}>
              <CarouselContent className="h-full">
                {product.images.map((image, index) => (
                  <CarouselItem key={index} className="h-full">
                    <div className="relative w-full aspect-[4/3]">
                      <Image
                        src={image}
                        alt={`Image ${index + 1}`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 top-1/2 -translate-y-1/2" />
              <CarouselNext className="right-2 top-1/2 -translate-y-1/2" />
            </Carousel>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {product.images.slice(0, 5).map((image, index) => (
              <div
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`aspect-square relative rounded-lg border cursor-pointer  ${
                  currentImageIndex === index
                    ? "border-primary ring-2"
                    : "hover:border-primary"
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.name} - Thumbnail ${index + 1}`}
                  fill
                  className="object-contain"
                  sizes="80px"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {/* name */}
          <div>
            <h1 className="text-xl lg:text-2xl font-bold">{product.name}</h1>
          </div>
          {/* brand */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Brand:</span>
            <Badge variant="outline" className="text-primary">
              {product.brand}
            </Badge>
          </div>
          {/* rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500" fill="#facc15" />
              <Star className="h-4 w-4 text-yellow-500" fill="#facc15" />
              <Star className="h-4 w-4 text-yellow-500" fill="#facc15" />
              <Star className="h-4 w-4 text-yellow-500" fill="#facc15" />
              <Star className="h-4 w-4 text-yellow-500" />
            </div>
            <span className="text-sm text-muted-foreground">
              ({product.rating} out of 5)
            </span>
          </div>
          {/* price and discount */}
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xl lg:text-2xl font-bold text-primary">
                ${discountedPrice.toFixed(2)}
              </span>
              {product.discount > 0 && (
                <>
                  <span className="text-base lg:text-lg line-through text-muted-foreground">
                    ${product.price.toFixed(2)}
                  </span>
                  <Badge variant="destructive" className="text-sm">
                    -{product.discount}% OFF
                  </Badge>
                </>
              )}
            </div>
            {product.discount > 0 && (
              <p className="text-sm text-green-600 font-medium">
                You save ${(product.price - discountedPrice).toFixed(2)}
              </p>
            )}
          </div>
          <Separator />
          {/* colors */}
          {product.colors.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2 text-sm">Available Colors</h3>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map((color, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-accent px-2 py-1 text-sm"
                  >
                    {color}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          {/* quantity */}
          <div>
            <h3 className="font-semibold mb-2 text-sm">Quantity</h3>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="h-8 w-8"
              >
                <Minus className="h-3 w-3" />
              </Button>
              <Input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => {
                  const newQuantity = parseInt(e.target.value) || 1;
                  setQuantity(
                    Math.max(1, Math.min(newQuantity, product.stock))
                  );
                }}
                disabled={product.status !== "AVAILABLE"}
                className="w-12 h-8 text-center text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= product.stock}
                className="h-8 w-8"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
          {/* add to cart */}
          <div className="space-y-2">
            <Button
              size="default"
              className="w-full h-10 text-sm font-medium"
              disabled={product.status !== "AVAILABLE"}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="default" className="flex-1 h-8">
                <Heart className="h-4 w-4 mr-1" />
                <span className="text-sm">Wishlist</span>
              </Button>
              <Button variant="outline" size="default" className="flex-1 h-8">
                <Share2 className="h-4 w-4 mr-1" />
                <span className="text-sm">Share</span>
              </Button>
            </div>
          </div>
          {/* shipping and returns */}
          <Card className="py-4">
            <CardContent>
              <h3 className="font-semibold mb-2 text-sm">Shipping & Returns</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Truck className="h-3 w-3 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium">
                      Free shipping on orders over $50
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Standard delivery: 3-5 business days
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-3 w-3 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium">
                      1 year warranty included
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Manufacturer warranty covers defects
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="h-3 w-3 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium">30-day return policy</p>
                    <p className="text-xs text-muted-foreground">
                      Free returns on all orders
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductInformation;
