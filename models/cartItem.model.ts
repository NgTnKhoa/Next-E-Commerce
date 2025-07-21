export interface CartItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  discountedPrice: number;
  discount: number;
  quantity: number;
  image: string;
  color: string;
  inStock: boolean;
  maxQuantity: number;
  selected: boolean;
}
