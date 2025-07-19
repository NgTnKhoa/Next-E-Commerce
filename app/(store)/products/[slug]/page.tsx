"use client";

import React, { useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Product } from "@/models/product.model";
import MockData from "@/data/mockData";
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
  MessageCircle,
  ThumbsUp,
  User,
  Home,
} from "lucide-react";

interface ProductDetailsProps {
  params: {
    slug: string;
  };
}

const ProductDetails = ({ params }: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [userReview, setUserReview] = useState({
    rating: 0,
    comment: "",
    name: "",
  });
  const [userReviews, setUserReviews] = useState<any[]>([]);

  // Find the product by slug
  const product = MockData.products.find(
    (p: Product) => p.slug === params.slug
  );

  if (!product) {
    notFound();
  }

  // Calculate discounted price
  const discountedPrice =
    product.price - (product.price * product.discount) / 100;

  // Handle quantity change
  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  // Handle review submission
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      userReview.rating === 0 ||
      !userReview.comment.trim() ||
      !userReview.name.trim()
    ) {
      alert("Please fill in all fields and provide a rating.");
      return;
    }

    const newReview = {
      id: Date.now(),
      user: userReview.name,
      rating: userReview.rating,
      comment: userReview.comment,
      date: new Date().toLocaleDateString(),
      verified: false,
    };

    setUserReviews((prev) => [newReview, ...prev]);
    setUserReview({ rating: 0, comment: "", name: "" });
    setShowReviewForm(false);
    alert("Thank you for your review! It has been submitted successfully.");
  };

  // Handle star rating click
  const handleStarClick = (rating: number) => {
    setUserReview((prev) => ({ ...prev, rating }));
  };

  // Mock reviews data - combine with user reviews
  const allReviews = [
    ...userReviews,
    {
      id: 1,
      user: "John Doe",
      rating: 5,
      comment: "Excellent product! Great quality and fast shipping.",
      date: "2024-01-15",
      verified: true,
    },
    {
      id: 2,
      user: "Jane Smith",
      rating: 4,
      comment: "Very good product, would recommend to others.",
      date: "2024-01-10",
      verified: true,
    },
    {
      id: 3,
      user: "Mike Johnson",
      rating: 5,
      comment: "Perfect! Exactly as described and works perfectly.",
      date: "2024-01-08",
      verified: false,
    },
  ];

  // Mock specifications data
  const specifications = [
    { label: "Brand", value: product.brand },
    { label: "Model", value: product.name },
    { label: "Status", value: product.status },
    { label: "Rating", value: `${product.rating}/5` },
    { label: "Featured", value: product.featured ? "Yes" : "No" },
    { label: "Colors Available", value: product.colors.join(", ") },
    { label: "Created Date", value: product.createdDate.toLocaleDateString() },
    { label: "Last Updated", value: product.updatedDate.toLocaleDateString() },
  ];

  // Generate star rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          className="h-4 w-4 fill-yellow-400/50 text-yellow-400"
        />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }

    return stars;
  };

  return (
    <div>
      {/* Breadcrumb - Full Width at Top */}
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <Home className="h-4 w-4 mr-1" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {product.categoryNames.length > 0 && (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={`/categories/${product.categoryNames[0].toLowerCase()}`}
                  >
                    {product.categoryNames[0]}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )}
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images - Takes 1/2 of the width */}
        <div className="space-y-3">
          <div className="aspect-[4/3] relative overflow-hidden rounded-lg border bg-gray-50">
            <Carousel className="w-full h-full">
              <CarouselContent>
                {product.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative w-full h-full">
                      <Image
                        src={image}
                        alt={`${product.name} - Image ${index + 1}`}
                        fill
                        className="object-contain"
                        priority={index === 0}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-5 gap-1">
            {product.images.slice(0, 5).map((image, index) => (
              <div
                key={index}
                className="aspect-square relative overflow-hidden rounded border cursor-pointer hover:border-primary transition-colors"
              >
                <Image
                  src={image}
                  alt={`${product.name} - Thumbnail ${index + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Information - Takes 1/2 of the width */}
        <div className="space-y-3">
          {/* Product Title and Brand */}
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-muted-foreground">Brand:</span>
              <Badge variant="outline" className="text-primary">
                {product.brand}
              </Badge>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm text-muted-foreground">Categories:</span>
              <div className="flex gap-2 flex-wrap">
                {product.categoryNames.map((category, index) => (
                  <Badge key={index} variant="secondary">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 pb-2">
            <div className="flex items-center">
              {renderStars(product.rating)}
            </div>
            <span className="text-sm text-muted-foreground">
              ({product.rating} out of 5)
            </span>
          </div>

          {/* Price */}
          <div className="space-y-1 pb-3 border-b">
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

          {/* Colors */}
          {product.colors.length > 0 && (
            <div className="py-2">
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

          {/* Quantity Selector */}
          <div className="py-2">
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
              <span className="w-12 text-center font-medium text-sm">{quantity}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuantityChange(1)}
                className="h-8 w-8"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2 py-1">
            <span className="text-sm text-muted-foreground">Status:</span>
            <Badge
              variant={product.status === "AVAILABLE" ? "default" : "secondary"}
              className="px-2 py-1 text-sm"
            >
              {product.status}
            </Badge>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-3">
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

          {/* Shipping & Return Information */}
          <Card className="mt-4">
            <CardContent className="p-3">
              <h3 className="font-semibold mb-2 text-sm">Shipping & Returns</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Truck className="h-3 w-3 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium">Free shipping on orders over $50</p>
                    <p className="text-xs text-muted-foreground">Standard delivery: 3-5 business days</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-3 w-3 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium">1 year warranty included</p>
                    <p className="text-xs text-muted-foreground">Manufacturer warranty covers defects</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="h-3 w-3 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium">30-day return policy</p>
                    <p className="text-xs text-muted-foreground">Free returns on all orders</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Product Details and Reviews Section */}
      <div className="mt-12 space-y-8">
        {/* Product Description */}
        <Card>
          <CardHeader>
            <CardTitle>Product Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </CardContent>
        </Card>

        {/* Product Specifications */}
        <Card>
          <CardHeader>
            <CardTitle>Product Specifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {specifications.map((spec, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                >
                  <span className="text-sm font-medium text-muted-foreground">
                    {spec.label}
                  </span>
                  <span className="text-sm font-semibold">{spec.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Customer Reviews */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Customer Reviews ({allReviews.length})
              </div>
              <Button
                onClick={() => setShowReviewForm(!showReviewForm)}
                variant="outline"
                size="sm"
              >
                {showReviewForm ? "Cancel" : "Write a Review"}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Review Form */}
              {showReviewForm && (
                <div className="border rounded-lg p-6 bg-gray-50">
                  <h3 className="font-semibold mb-4">Write Your Review</h3>
                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="reviewer-name">Your Name</Label>
                      <Input
                        id="reviewer-name"
                        type="text"
                        value={userReview.name}
                        onChange={(e) =>
                          setUserReview((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        placeholder="Enter your name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Rating</Label>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => handleStarClick(star)}
                            className="focus:outline-none"
                          >
                            <Star
                              className={`h-6 w-6 transition-colors ${
                                star <= userReview.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300 hover:text-yellow-400"
                              }`}
                            />
                          </button>
                        ))}
                        <span className="ml-2 text-sm text-muted-foreground">
                          {userReview.rating > 0
                            ? `${userReview.rating} out of 5 stars`
                            : "Click to rate"}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="review-comment">Your Review</Label>
                      <textarea
                        id="review-comment"
                        value={userReview.comment}
                        onChange={(e) =>
                          setUserReview((prev) => ({
                            ...prev,
                            comment: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                        rows={4}
                        placeholder="Share your experience with this product..."
                        required
                      />
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button type="submit" className="flex-1">
                        Submit Review
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowReviewForm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              {/* Review Summary */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">
                    {product.rating}
                  </div>
                  <div className="flex items-center justify-center">
                    {renderStars(product.rating)}
                  </div>
                  <div className="text-sm text-muted-foreground">out of 5</div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">
                    Based on {allReviews.length} customer reviews
                  </p>
                </div>
              </div>

              {/* Individual Reviews */}
              <div className="space-y-4">
                {allReviews.map((review: any) => (
                  <div
                    key={review.id}
                    className="border-b pb-4 last:border-b-0"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium">{review.user}</span>
                          {review.verified && (
                            <Badge variant="secondary" className="text-xs">
                              Verified Purchase
                            </Badge>
                          )}
                          {userReviews.some((ur) => ur.id === review.id) && (
                            <Badge variant="outline" className="text-xs">
                              Your Review
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center">
                            {renderStars(review.rating)}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {review.date}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {review.comment}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
                            <ThumbsUp className="h-4 w-4" />
                            <span>Helpful</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Products */}
        <Card>
          <CardHeader>
            <CardTitle>Related Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {MockData.products
                .filter(
                  (p) =>
                    p.id !== product.id &&
                    p.categoryNames.some((cat) =>
                      product.categoryNames.includes(cat)
                    )
                )
                .slice(0, 4)
                .map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    href={`/products/${relatedProduct.slug}`}
                  >
                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="aspect-square relative mb-2">
                        <Image
                          src={relatedProduct.images[0]}
                          alt={relatedProduct.name}
                          fill
                          className="object-contain rounded-md"
                        />
                      </div>
                      <h3 className="font-medium text-sm mb-1 line-clamp-2">
                        {relatedProduct.name}
                      </h3>
                      <div className="flex items-center gap-1 mb-1">
                        <div className="flex items-center">
                          {renderStars(relatedProduct.rating)}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          ({relatedProduct.rating})
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-primary">
                          $
                          {(
                            relatedProduct.price -
                            (relatedProduct.price * relatedProduct.discount) /
                              100
                          ).toFixed(2)}
                        </span>
                        {relatedProduct.discount > 0 && (
                          <span className="text-xs line-through text-muted-foreground">
                            ${relatedProduct.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetails;
