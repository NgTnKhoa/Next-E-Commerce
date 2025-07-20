import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Product } from "@/models/product.model";
import MockData from "@/data/mockData";
import { Home } from "lucide-react";
import ProductInformation from "@/components/shared/ProductInformation";
import ProductReview from "@/components/shared/ProductReview";
import RelatedProducts from "@/components/shared/RelatedProducts";
import Link from "next/link";

interface ProductDetailsProps {
  params: { slug: string };
}

const ProductDetails = ({ params }: ProductDetailsProps) => {
  const { slug } = params;

  const product = MockData.products.find((p: Product) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href="/">
              <Home className="h-4 w-4 mr-1" />
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {product.categoryNames.length > 0 && (
            <>
              <BreadcrumbItem>
                <Link
                  href={`/categories/${product.categoryNames[0].toLowerCase()}`}
                >
                  {product.categoryNames[0]}
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          )}
          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <ProductInformation product={product} />

      <div className="mt-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Product Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{product.description}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Product Specifications</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Product Specifications</p>
          </CardContent>
        </Card>

        <ProductReview product={product} />

        <RelatedProducts
          product={product}
          relatedProducts={MockData.products}
        />
      </div>
    </div>
  );
};

export default ProductDetails;
