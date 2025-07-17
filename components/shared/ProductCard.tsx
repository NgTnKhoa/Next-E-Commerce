import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Product } from "@/models/product.model";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  isFeatured: boolean;
}

export const ProductCard = ({ product, isFeatured }: ProductCardProps) => {
  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="h-full pt-0 pb-2 gap-0">
        <CardHeader className="p-0 relative h-50 w-full">
          <Image
            className="rounded-t-lg object-contain"
            src={product.images[0]}
            alt={product.name}
            fill
          />
          {product.discount > 0 && (
            <div className="absolute bottom-2 left-4 flex flex-wrap gap-1 z-10">
              <Badge
                variant="destructive"
                className="text-xs px-1  shadow-sm rounded-full"
              >
                -{product.discount}%
              </Badge>
            </div>
          )}
        </CardHeader>
        <CardContent className="px-4">
          {isFeatured &&
            product.categoryNames.map((categoryName) => (
              <div key={categoryName} className="pt-2">
                <Badge variant="outline" className="text-neutral-500 mr-1">
                  {categoryName}
                </Badge>
              </div>
            ))}
          <div className="flex flex-col items-start gap-1 pt-2">
            <h2 className="text-md font-semibold">{product.name}</h2>
            <p className="text-xs text-neutral-500 line-clamp-2 wrap-anywhere">
              {product.description}
            </p>
          </div>
        </CardContent>
        <CardFooter className="mt-auto px-4">
          <div className="flex items-start py-1 gap-2">
            <div>
              <span className="text-md font-semibold">
                ${product.price.toFixed(2)}
              </span>
            </div>
            {product.discount > 0 && (
              <div>
                <span className="text-xs font-normal text-neutral-400 line-through">
                  ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                </span>
              </div>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
