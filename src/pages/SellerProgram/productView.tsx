/* eslint-disable jsx-a11y/anchor-is-valid */
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ColDiv, RowDiv } from "../../components/Misc/misc.styled";
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
import { FetchCategories, FetchSellerProducts } from "../../api/product-api";
import {
  sellerCategories,
  setSellerProducts,
} from "../../state/reducers/productSlice";

interface ProductViewProps {}

const ProductView: React.FC<ProductViewProps> = ({}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const productReducer = useAppSelector((state) => state.productReducer);

  const { sellerProducts, categories } = productReducer;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [confirmAccountNumber, setConfirmAccountNumber] = useState("");
  const [swiftCode, setSwiftCode] = useState("");

  const [regularPayout, setRegularPayout] = useState(true);

  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");
  const [country, setCountry] = useState("");

  const profile = useAppSelector((state) => state.userReducer.userProfile);

  const [value, setValue] = useState("1");

  useEffect(() => {
    onFetchProducts();
    onFetchCategories();
  }, [profile.token]);

  const onFetchProducts = async () => {
    const { data, msg } = await FetchSellerProducts(profile.token);
    if (data) {
      dispatch(setSellerProducts(data as ProductModel[]));
    } else {
      console.log(`Error: ${msg}`);
    }
  };

  const onFetchCategories = async () => {
    const { data, msg } = await FetchCategories();
    if (data) {
      dispatch(sellerCategories(data as CategoryModel[]));
    } else {
      console.log(`Error: ${msg}`);
    }
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
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
            key={item._id}
            onClick={() => setOpen(true)}
            style={{
              backgroundImage: `url("${ImagePlaceHolder(item?.image_url)}")`,
              backgroundSize: "contain",
              border: "1px solid #D8D8D8",
            }}
          >
            <ProductPriceDiv>
              <LblProductTitle style={{ fontWeight: "600" }}>
                {title}
              </LblProductTitle>
              <LblProductDesc>{item.description}</LblProductDesc>
              <LblProductPrice style={{ fontWeight: "300" }}>
                {`$${item.price.toFixed(2)}`}
              </LblProductPrice>
            </ProductPriceDiv>
          </ProductCard>
        );
      });
    }
  };

  const displayCurrentItems = () => {
    if (Array.isArray(sellerProducts)) {
      return sellerProducts.map((item) => (
        <Accordion
          key={item._id}
          elevation={0}
          style={{
            display: "flex",
            flexDirection: "column",
            margin: 0,
          }}
        >
          <AccordionDetails>
            <Grid container spacing={2}>
              {productCardRow(sellerProducts)}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ));
    }
    return <></>;
  };

  // fetch products related to users
  const productView = () => {
    return (
      <ColDiv>
        <ColDiv
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
            />
          </RowDiv>
        </ColDiv>

        {/* Selected Action row */}
        <div
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            height: "calc(100vh - 180px)",
            overflow: "auto",
          }}
        >
          <div
            style={{
              maxWidth: "160px",
              flexDirection: "column",
              overflowY: "scroll",
            }}
          ></div>

          <ColDiv
            style={{
              width: "98%",
              display: "flex",
              margin: "50px",
            }}
          >
            {displayCurrentItems()}
          </ColDiv>
        </div>
      </ColDiv>
    );
  };

  const salesView = () => {
    return <ColDiv>Sales View</ColDiv>;
  };

  const payoutView = () => {
    return <ColDiv>Payout View</ColDiv>;
  };

  return (
    <Container
      style={{
        width: "80%",
        paddingTop: 20,
      }}
    >
      <ColDiv>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="">
              <Tab label="Manage Products" value="1" />
              <Tab label="Sales Report" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">{productView()}</TabPanel>
          <TabPanel value="2">Sales Report</TabPanel>
        </TabContext>
      </ColDiv>
      <AddProductPopup
        open={open}
        categories={categories}
        onContinue={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      />
    </Container>
  );
};

export default ProductView;
