import { ReactNode, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Container } from "../../utils/globalstyled";
import DealsPage from "../Deals";
import { Stack } from "@mui/material";
import { RowDiv } from "../../components/Misc/misc.styled";
import { CategorySlider } from "../Category/CategorySlider";
import { useAppSelector } from "../../state/hooks";
import { ProductModel, UserModel } from "../../types";
import { userLogin } from "../../state/reducers/userSlice";
import { FetchProducts } from "../../api/product-api";
import { setProducts } from "../../state/reducers/productSlice";
import { TopPrducts } from "../TopProducts";
import { Spacer } from "../../components";

interface LandingPageProps {
  dashboard?: ReactNode;
}

const LandingPage: React.FC<LandingPageProps> = ({ dashboard }) => {
  // final container to track progress
  const dispatch = useDispatch();

  const productReducer = useAppSelector((state) => state.productReducer);

  const { products } = productReducer;

  useEffect(() => {
    onFetchProducts();
    const userData = localStorage.getItem("userData");
    if (userData !== null) {
      const auth = JSON.parse(userData) as unknown as UserModel;
      dispatch(userLogin(auth));
    }
  }, []);

  const onFetchProducts = async () => {
    const { data, msg } = await FetchProducts();
    if (data) {
      dispatch(setProducts(data as ProductModel[]));
    } else {
      console.log(`Error: ${msg}`);
    }
  };

  return (
    <Stack spacing={3} style={{ alignItems: "center" }}>
      <DealsPage />
      <CategorySlider products={products} />
      <TopPrducts products={products} />
    </Stack>
  );
};

export default LandingPage;
