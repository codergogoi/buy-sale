import axios from "axios";
import { BASE_URL } from "../utils/AppConst";
import { ResponseModel, RegisterModel } from "../types";
import { axiosAuth, handleResponse } from "./common";

export const LoginAPI = async (
  email: string,
  password: string
): Promise<ResponseModel> => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      email,
      password,
    });
    return handleResponse(response);
  } catch (error) {
    console.log(error);
    return {
      msg: "error occured",
    };
  }
};

export const RegisterApi = async ({
  email,
  phone,
  password,
}: RegisterModel): Promise<ResponseModel> => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, {
      email: email,
      password: password,
      phone: phone,
    });
    return handleResponse(response);
  } catch (error) {
    console.log(error);
    return {
      msg: "error occured",
    };
  }
};

export const GetVerificationCode = async (
  token: string
): Promise<ResponseModel> => {
  const auth = axiosAuth(token);
  const response = await auth.get(`${BASE_URL}/verify`);
  return handleResponse(response);
};

export const VerifyCode = async (
  token: string,
  code: string
): Promise<ResponseModel> => {
  const auth = axiosAuth(token);
  const response = await auth.post(`${BASE_URL}/verify`, {
    code,
  });
  return handleResponse(response);
};
