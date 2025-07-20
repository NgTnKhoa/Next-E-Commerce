"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/models/product.model";
import { Star } from "lucide-react";

interface RelatedProductsProps {
  product: Product;
  relatedProducts: Product[];
}

const RelatedProducts = ({
  product,
  relatedProducts,
}: RelatedProductsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Related Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {relatedProducts
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
                        (relatedProduct.price * relatedProduct.discount) / 100
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
  );
};

export default RelatedProducts;
