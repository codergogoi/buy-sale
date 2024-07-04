/* eslint-disable jsx-a11y/anchor-is-valid */
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CenterBox, ColDiv, RowDiv } from "../../components/Misc/misc.styled";
import { Lbl } from "../../components/Labels";
import { AppCSS, Spacer, TapButton, TxtInput } from "../../components";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import PlaceholderIcon from "../../images/product_placeholder.jpg";

import { useEffect, useState } from "react";

import { useAppSelector } from "../../state/hooks";
import { Container } from "../../utils/globalstyled";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { CategoryModel, ProductModel } from "../../types";
import {
  LblProductDesc,
  LblProductPrice,
  LblProductTitle,
  ProductCard,
  ProductPriceDiv,
} from "./seller.styled";
import { AddProductPopup } from "./AddProductPopup";
import {
  FetchCategories,
  FetchSellerOrders,
  FetchSellerProducts,
} from "../../api/product-api";
import {
  sellerCategories,
  setOrders,
  setSellerProducts,
} from "../../state/reducers/productSlice";
import { EditProductPopup } from "./EditProductPopup";
import { OrderTable } from "./OrdersTable";
import { OrderModel } from "../../types/models/order-model";

interface ProductViewProps {}

const ProductView: React.FC<ProductViewProps> = ({}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<ProductModel>();

  const productReducer = useAppSelector((state) => state.productReducer);

  const { sellerProducts, categories, currentSellerOrders } = productReducer;

  const profile = useAppSelector((state) => state.userReducer.userProfile);

  const [currentTab, setCurrentTab] = useState("1");

  useEffect(() => {
    onFetchProducts();
    onFetchCategories();
    onFetchOrders();
  }, [profile.token]);

  const onFetchProducts = async () => {
    const { data, message } = await FetchSellerProducts();
    if (data) {
      dispatch(setSellerProducts(data as ProductModel[]));
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

  const onFetchOrders = async () => {
    const { data, message } = await FetchSellerOrders();
    if (data) {
      dispatch(setOrders(data as OrderModel[]));
    } else {
      console.log(`Error: ${message}`);
    }
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  const ImagePlaceHolder = (imageName?: string) => {
    if (imageName) {
      return imageName !== "" ? imageName : PlaceholderIcon;
    }
    return PlaceholderIcon;
  };

  const productCardRow = (products: ProductModel[]) => {
    if (Array.isArray(products)) {
      return products.map((item) => {
        const title = item.name ? item.name : "default Name";
        return (
          <ProductCard
            key={item.id}
            onClick={() => {
              setCurrentProduct(item);
              setOpen(false);
              setEditOpen(true);
            }}
            style={{
              backgroundImage: `url("${ImagePlaceHolder(item?.image_url)}")`,
              backgroundSize: "contain",
              border: "1px solid #D8D8D8",
            }}
          >
            <ProductPriceDiv>
              <p style={{ margin: 0, fontWeight: "600" }}>{title}</p>
              <p>{item.id}</p>
              <p style={{ margin: 0, fontWeight: "300" }}>
                {`$${item.price.toFixed(2)}`}
              </p>
            </ProductPriceDiv>
          </ProductCard>
        );
      });
    }
  };

  // fetch products related to users
  const productView = () => {
    return (
      <div
        style={{
          background: "#fff",
          padding: 10,
        }}
      >
        <div
          style={{
            width: "100%",
            padding: 0,
            margin: 0,
            overflow: "auto",
          }}
        >
          <RowDiv style={{ justifyContent: "flex-end" }}>
            <TapButton
              onTap={() => setOpen(true)}
              title="Add Product"
              width={120}
              height={40}
              radius={20}
              bgColor={AppCSS.ORANGE}
            />
          </RowDiv>
        </div>

        <CenterBox
          style={{
            width: "100%",
            height: 600,
            overflow: "auto",
            background: "#fff",
          }}
        >
          <Grid container spacing={2}>
            {productCardRow(sellerProducts)}
          </Grid>
        </CenterBox>
      </div>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "flex-start",
        flexDirection: "column",
        background: "#fff",
        boxShadow: "1px 1px 5px 1px #DBDBDB",
        padding: 10,
        borderRadius: 10,
      }}
    >
      <TabContext value={currentTab}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          <TabList onChange={handleChange} aria-label="">
            <Tab
              style={{
                background: currentTab === "1" ? AppCSS.ORANGE : AppCSS.WHITE,
                color: currentTab === "1" ? AppCSS.WHITE : AppCSS.BLACK,
              }}
              label="Manage Products"
              value="1"
            />
            <Tab
              style={{
                background: currentTab === "2" ? AppCSS.ORANGE : AppCSS.WHITE,
                color: currentTab === "2" ? AppCSS.WHITE : AppCSS.BLACK,
              }}
              label="Orders"
              value="2"
            />
          </TabList>
        </Box>
        <TabPanel
          style={{
            width: "100%",
            margin: 0,
            padding: 0,
          }}
          value="1"
        >
          {productView()}
        </TabPanel>
        <TabPanel value="2">
          <OrderTable
            orders={
              Array.isArray(currentSellerOrders) ? currentSellerOrders : []
            }
          />
        </TabPanel>
      </TabContext>
      <EditProductPopup
        product={currentProduct}
        open={editOpen}
        categories={categories}
        onClose={() => {
          onFetchProducts();
          setEditOpen(false);
        }}
      />
      <AddProductPopup
        open={open}
        categories={categories}
        onClose={() => {
          onFetchProducts();
          setOpen(false);
        }}
      />
    </div>
  );
};

export default ProductView;
