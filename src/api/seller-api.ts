import { SellerProgramInput } from "../types";
import { BASE_URL } from "../utils/AppConst";
import { axiosAuth } from "./common";

export const JoinSellerProgramAPI = async (input: SellerProgramInput) => {
  try {
    console.log(JSON.stringify(input));
    const auth = axiosAuth();
    const response = await auth.post(`${BASE_URL}/users/become-seller`, {
      ...input,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      message: "error occured",
    };
  }
};
