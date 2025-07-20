"use client";

import React, { useState, use, useRef, useEffect } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Product } from "@/models/product.model";
import MockData from "@/data/mockData";
import { Star, MessageCircle, ThumbsUp, User, Home } from "lucide-react";
import ProductInformation from "@/components/shared/ProductInformation";

interface ProductDetailsProps {
  params: { slug: string };
}

const ProductDetails = ({ params }: ProductDetailsProps) => {
  const { slug } = params;
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [userReviews, setUserReviews] = useState<any[]>([]);

  const product = MockData.products.find(
    (p: Product) => p.slug === slug
  );

  if (!product) {
    notFound();
  }

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

  return (
    <div>
      <div className="mb-4">
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

      <ProductInformation product={product} />

      <div className="mt-12 space-y-8">
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

        <Card>
          <CardHeader>
            <CardTitle>Product Specifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <h1>Product Specifications</h1>
            </div>
          </CardContent>
        </Card>

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
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">
                    {product.rating}
                  </div>
                  <div className="flex items-center justify-center">
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star
                        key={index}
                        className={`h-4 w-4 ${
                          index < product.rating
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">out of 5</div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">
                    Based on {allReviews.length} customer reviews
                  </p>
                </div>
              </div>

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
                            {Array.from({ length: 5 }, (_, index) => (
                              <Star
                                key={index}
                                className={`h-4 w-4 ${
                                  index < review.rating
                                    ? "text-yellow-500"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
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
                          {Array.from({ length: 5 }, (_, index) => (
                            <Star
                              key={index}
                              className={`h-4 w-4 ${
                                index < relatedProduct.rating
                                  ? "text-yellow-500"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
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
