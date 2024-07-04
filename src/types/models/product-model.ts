export interface CartModel {
  item_id: string;
  cart_id: string;
  product_id: string;
  name: string;
  price: string;
  image_url: string;
  item_qty: number;
}

export interface ProductModel {
  id: number;
  name: string;
  description: string;
  category_id: string;
  image_url: string;
  price: number;
  stock: number;
  availability: boolean;
}
