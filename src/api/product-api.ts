import { BASE_URL, PRODUCT_URL, TRANSACTION_URL } from "../utils/AppConst";
import { ResponseModel } from "../types";
import { axiosAuth, handleResponse } from "./common";
import axios from "axios";

export const FetchCartItemsApi = async (
  token: string
): Promise<ResponseModel> => {
  try {
    const auth = axiosAuth(token);
    const response = await auth.get(`${BASE_URL}/cart`);
    return handleResponse(response);
  } catch (error) {
    console.log(error);
    return {
      msg: "error occured",
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
      msg: "error occured",
    };
  }
};

export const FetchCategories = async () => {
  try {
    const response = await axios.get(`${PRODUCT_URL}/category`);
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      msg: "error occured",
    };
  }
};

export const FetchSellerProducts = async (token: string) => {
  const auth = axiosAuth(token);
  try {
    const response = await auth.get(`${PRODUCT_URL}/seller_products`);
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      msg: "error occured",
    };
  }
};

export const FetchProducts = async () => {
  try {
    const response = await axios.get(`${PRODUCT_URL}/product`);
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      msg: "error occured",
    };
  }
};

export const FetchProduct = async (id: string) => {
  try {
    const response = await axios.get(`${PRODUCT_URL}/product/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      msg: "error occured",
    };
  }
};
