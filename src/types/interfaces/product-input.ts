export interface CreateProductInput {
  name: string;
  description: string;
  category_id: number;
  image_url: string;
  price: number;
  stock: number;
}
