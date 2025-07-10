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

export const ProductCard = ({ product }: { product: Product }) => {
  const Price = () => {
    if (product?.discount > 0) {
      const price = product?.price - product?.discount;
      const percentage = (product?.discount / product?.price) * 100;
      return (
        <div className="flex gap-2 items-center">
          <Badge className="flex gap-4" variant="destructive">
            <div className="line-through">${product?.price}</div>
            <div>%{percentage.toFixed(2)}</div>
          </Badge>
          <h2>${price.toFixed(2)}</h2>
        </div>
      );
    }

    return <h2>${product?.price}</h2>;
  };

  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="h-full pt-0 gap-0">
        <CardHeader className="p-0">
          <div className="relative h-60 w-full">
            <Image
              className="rounded-t-lg"
              src={product?.images[0]}
              alt="product image"
              fill
              sizes="(min-width: 1000px) 30vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </CardHeader>
        <CardContent className="grid gap-1 px-4 py-2">
          <Badge variant="outline" className="w-min text-neutral-500">
            {product?.categories[0]?.name}
          </Badge>

          <h2 className="mt-2">{product.name}</h2>
          <p className="text-xs text-neutral-500 text-justify">
            {product.description}
          </p>
        </CardContent>
        <CardFooter>
          {product?.isAvailable ? (
            <Price />
          ) : (
            <Badge variant="secondary">Out of stock</Badge>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
};
