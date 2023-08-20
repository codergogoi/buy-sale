import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductModel, CartModel, CategoryModel } from "../../types";

export interface ProductState {
  products: ProductModel[];
  sellerProducts: ProductModel[];
  categories: CategoryModel[];
  currentProduct: ProductModel;
}

const initialState: ProductState = {
  products: {} as ProductModel[],
  categories: {} as CategoryModel[],
  sellerProducts: {} as ProductModel[],
  currentProduct: {} as ProductModel,
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
  },
});
export const { setSellerProducts, sellerCategories, setProducts, setProduct } =
  productSlice.actions;
export default productSlice.reducer;
