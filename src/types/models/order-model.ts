export interface OrderModel {
  id: number;
  order_id: number;
  product_id: number;
  name: string;
  image_url: string;
  seller_id: number;
  price: number;
  qty: number;
  CreatedAt: string;
  UpdatedAt: string;
}

export interface SellerOrderModel {
  order_ref_number: number;
  order_status: number;
  created_at: string;
  order_item_id: number;
  product_id: number;
  name: string;
  image_url: string;
  price: number;
  qty: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
}
