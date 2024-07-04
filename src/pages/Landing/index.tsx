import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import DealsPage from "../Deals";
import { Stack } from "@mui/material";
import { CategorySlider } from "../Category/CategorySlider";
import { useAppSelector } from "../../state/hooks";
import { CategoryModel, ProductModel } from "../../types";
import { FetchCategories, FetchProducts } from "../../api/product-api";
import {
  sellerCategories,
  setProducts,
} from "../../state/reducers/productSlice";
import { TopPrducts } from "../TopProducts";

interface LandingPageProps {
  dashboard?: ReactNode;
}

const LandingPage: React.FC<LandingPageProps> = ({ dashboard }) => {
  // final container to track progress
  const dispatch = useDispatch();

  const productReducer = useAppSelector((state) => state.productReducer);

  const { products, categories } = productReducer;

  useEffect(() => {
    onFetchCategories();
    onFetchProducts();
  }, []);

  const onFetchProducts = async () => {
    const { data, message } = await FetchProducts();
    if (data) {
      dispatch(setProducts(data as ProductModel[]));
    } else {
      console.log(`Error: ${message}`);
    }
  };

  const onFetchCategories = async () => {
    const { data, message } = await FetchCategories();
    if (data) {
      dispatch(sellerCategories(data as CategoryModel[]));
    } else {
      console.log(`Error: ${message}`);
    }
  };

  return (
    <Stack spacing={3} style={{ alignItems: "center" }}>
      <DealsPage />
      <CategorySlider cats={categories} />
      <TopPrducts products={products} />
    </Stack>
  );
};

export default LandingPage;
