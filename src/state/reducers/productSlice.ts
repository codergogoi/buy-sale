import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductModel, CartModel, CategoryModel } from "../../types";
import { OrderModel, SellerOrderModel } from "../../types/models/order-model";

export interface ProductState {
  products: ProductModel[];
  sellerProducts: ProductModel[];
  categories: CategoryModel[];
  currentProduct: ProductModel;
  currentSellerOrders: OrderModel[];
  sellerOrderInfo: SellerOrderModel;
}

const initialState: ProductState = {
  products: {} as ProductModel[],
  categories: {} as CategoryModel[],
  sellerProducts: {} as ProductModel[],
  currentProduct: {} as ProductModel,
  currentSellerOrders: {} as OrderModel[],
  sellerOrderInfo: {} as SellerOrderModel,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<ProductModel[]>) {
      state.products = action.payload;
    },
    setSellerProducts(state, action: PayloadAction<ProductModel[]>) {
      state.sellerProducts = action.payload;
    },
    sellerCategories(state, action: PayloadAction<CategoryModel[]>) {
      state.categories = action.payload;
    },
    setProduct(state, action: PayloadAction<ProductModel>) {
      state.currentProduct = action.payload;
    },
    setOrders(state, action: PayloadAction<OrderModel[]>) {
      state.currentSellerOrders = action.payload;
    },
    setSellerOrder(state, action: PayloadAction<SellerOrderModel>) {
      state.sellerOrderInfo = action.payload;
    },
  },
});
export const {
  setSellerProducts,
  sellerCategories,
  setProducts,
  setProduct,
  setOrders,
  setSellerOrder,
} = productSlice.actions;
export default productSlice.reducer;
