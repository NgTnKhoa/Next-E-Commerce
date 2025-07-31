import { Product } from "@/models/product.model";

export interface ProductFilters {
  colors: string[];
  brands: string[];
  priceRange: [number, number];
  category?: string;
  searchQuery?: string;
}

export const filterProducts = (
  products: Product[],
  filters: ProductFilters
): Product[] => {
  return products.filter((product) => {
    // Color filter
    const colorMatch =
      filters.colors.length === 0 ||
      product.colors.some((color) => filters.colors.includes(color));

    // Brand filter
    const brandMatch =
      filters.brands.length === 0 || filters.brands.includes(product.brand);

    // Price filter (using discounted price if available)
    const productPrice = product.discount > 0
      ? product.price - (product.price * product.discount) / 100
      : product.price;
    const priceMatch =
      productPrice >= filters.priceRange[0] &&
      productPrice <= filters.priceRange[1];

    // Category filter
    const categoryMatch =
      !filters.category ||
      product.categoryNames.some((cat) =>
        cat.toLowerCase() === filters.category?.toLowerCase()
      );

    // Search query filter
    const searchMatch =
      !filters.searchQuery ||
      product.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(filters.searchQuery.toLowerCase());

    return colorMatch && brandMatch && priceMatch && categoryMatch && searchMatch;
  });
};

export const getUniqueColors = (products: Product[]): string[] => {
  const colors = new Set<string>();
  products.forEach((product) => {
    product.colors.forEach((color) => colors.add(color));
  });
  return Array.from(colors).sort();
};

export const getUniqueBrands = (products: Product[]): string[] => {
  const brands = new Set<string>();
  products.forEach((product) => {
    brands.add(product.brand);
  });
  return Array.from(brands).sort();
};

export const getPriceRange = (products: Product[]): [number, number] => {
  if (products.length === 0) return [0, 1000];
  
  const prices = products.map((product) => {
    return product.discount > 0
      ? product.price - (product.price * product.discount) / 100
      : product.price;
  });
  
  const minPrice = Math.floor(Math.min(...prices));
  const maxPrice = Math.ceil(Math.max(...prices));
  
  return [minPrice, maxPrice];
};
