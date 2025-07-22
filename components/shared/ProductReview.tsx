"use client";

import { Product } from "@/models/product.model";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Star, ThumbsUp, User } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Review } from "@/models/review.model";

interface ProductReviewProps {
  product: Product;
}

const ProductReview = ({ product }: ProductReviewProps) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [userReviews] = useState<Review[]>([]);
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
            {allReviews.map((review: Review) => (
              <div key={review.id} className="border-b pb-4 last:border-b-0">
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
  );
};

export default ProductReview;
