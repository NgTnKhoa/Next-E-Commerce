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

interface ProductDetailsProps {
  params: { slug: string };
}

const ProductDetails = ({ params }: ProductDetailsProps) => {
  const { slug } = params;

  const product = MockData.products.find(
    (p: Product) => p.slug === slug
  );

  if (!product) {
    notFound();
  }

  

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

        <ProductReview product={product} />

        <RelatedProducts product={product} relatedProducts={MockData.products} />
      </div>
    </div>
  );
};

export default ProductDetails;
