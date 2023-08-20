import { combineReducers } from "redux";
import userReducer from "./userSlice";
import productReducer from "./productSlice";

export const rootReducer = combineReducers({ userReducer, productReducer });
