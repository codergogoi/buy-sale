import axios from "axios";
import { BASE_URL } from "../utils/AppConst";
import { RegisterModel } from "../types";
import { axiosAuth } from "./common";

export const LoginAPI = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      message: "error occured",
    };
  }
};

export const RegisterApi = async ({
  email,
  phone,
  password,
}: RegisterModel) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/register`, {
      email: email,
      password: password,
      phone: phone,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      message: "error occured",
    };
  }
};

export const GetVerificationCode = async (token: string) => {
  const auth = axiosAuth();
  const response = await auth.get(`${BASE_URL}/users/verify`);
  return response.data;
};

export const VerifyCode = async (token: string, code: string) => {
  const auth = axiosAuth();
  const response = await auth.post(`${BASE_URL}/users/verify`, {
    code: Number(code),
  });
  return response.status;
};

export const GetProfile = async (token: string) => {
  const auth = axiosAuth();
  const response = await auth.get(`${BASE_URL}/users/profile`);
  return response.data;
};
