import { BASE_URL, PRODUCT_URL, TRANSACTION_URL } from "../utils/AppConst";
import { CreateProductInput, ResponseModel } from "../types";
import { axiosAuth } from "./common";
import axios from "axios";

export const FetchCartItemsApi = async (
  token: string
): Promise<ResponseModel> => {
  try {
    const auth = axiosAuth();
    const response = await auth.get(`${BASE_URL}/cart`);
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      message: "error occured",
    };
  }
};

export const FetchOrderItemsApi = async (token: string) => {
  try {
    // const auth = axiosAuth(token);
    const response = await axios.get(`${TRANSACTION_URL}/orders`);
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      message: "error occured",
    };
  }
};

export const FetchCategories = async () => {
  try {
    const response = await axios.get(`${PRODUCT_URL}/categories`);
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      message: "error occured",
    };
  }
};

export const FetchSellerProducts = async () => {
  const auth = axiosAuth();
  try {
    const response = await auth.get(`${PRODUCT_URL}/seller/products`);
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      message: "error occured",
    };
  }
};

export const FetchSellerOrders = async () => {
  const auth = axiosAuth();
  try {
    const response = await auth.get(`${PRODUCT_URL}/seller/orders`);
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      message: "error occured",
    };
  }
};

export const FetchSellerOrderById = async (id: number) => {
  const auth = axiosAuth();
  try {
    const response = await auth.get(`${PRODUCT_URL}/seller/orders/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      message: "error occured",
    };
  }
};

export const FetchProducts = async () => {
  try {
    const response = await axios.get(`${PRODUCT_URL}/products`);
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      message: "error occured",
    };
  }
};

export const FetchProduct = async (id: string) => {
  try {
    const response = await axios.get(`${PRODUCT_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      message: "error occured",
    };
  }
};

export const CreateProduct = async (input: CreateProductInput) => {
  try {
    const api = axiosAuth();
    const response = await api.post(`${PRODUCT_URL}/seller/products`, {
      ...input,
    });
    return response.status;
  } catch (error) {
    console.log(error);
    return {
      message: "error occured",
    };
  }
};

export const EditProduct = async (id: number, input: CreateProductInput) => {
  try {
    const api = axiosAuth();
    const response = await api.put(`${PRODUCT_URL}/seller/products/${id}`, {
      ...input,
    });
    return response.status;
  } catch (error) {
    console.log(error);
    return {
      message: "error occured",
    };
  }
};

export const DeleteProduct = async (id: number) => {
  try {
    const api = axiosAuth();
    const response = await api.delete(`${PRODUCT_URL}/seller/products/${id}`);
    return response.status;
  } catch (error) {
    console.log(error);
    return {
      message: "error occured",
    };
  }
};
