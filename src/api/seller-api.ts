import { ResponseModel, SellerProgramInput } from "../types";
import { BASE_URL } from "../utils/AppConst";
import { axiosAuth, handleResponse } from "./common";

export const JoinSellerProgramAPI = async (
  token: string,
  input: SellerProgramInput
): Promise<ResponseModel> => {
  try {
    console.log(JSON.stringify(input));
    const auth = axiosAuth(token);
    const response = await auth.post(`${BASE_URL}/join`, {
      ...input,
    });
    return handleResponse(response);
  } catch (error) {
    console.log(error);
    return {
      msg: "error occured",
    };
  }
};
