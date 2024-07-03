/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./Landing";
import { NavBar } from "../components";
import LoginPage from "./Login";
import CartPage from "./Cart";
import { PostOrder } from "./Cart/PostOrder";
import { FailedOrder } from "./Cart/FailedOrder";
import OrderPage from "./Order";
import SellerProgramPage from "./SellerProgram";
import { ProductDetails } from "./ProductDetail";
import SignupPage from "./SignUp";
import VerifyPage from "./Verify";
import ManageProducts from "./SellerProgram";
import JoinSellerProgram from "./SellerProgram/JoinSellerProgram";
import { SellerOrderDetails } from "./SellerProgram/SellerOrderDetails";
import { Profile } from "./Profile";

interface RouteManagerProps {}

export const RouteManager: React.FC<RouteManagerProps> = ({}) => {
  // const {
  //   auth: { userType, provider, serviceType },
  //   loadingState,
  // } = StateData();

  return (
    <BrowserRouter>
      {/* <ShowLoader loaderModel={loadingState} /> */}
      <NavBar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/post-order" element={<PostOrder />} />
        <Route path="/failed-order" element={<FailedOrder />} />
        <Route path="/seller-program" element={<JoinSellerProgram />} />
        <Route path="/manage-products" element={<ManageProducts />} />
        <Route path="/seller-order/:id" element={<SellerOrderDetails />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/" element={<LandingPage />} />
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
};
