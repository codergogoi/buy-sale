/* eslint-disable jsx-a11y/anchor-is-valid */
import { useDispatch } from "react-redux";
import { redirect, useNavigate } from "react-router-dom";
import { CenterBox, ColDiv, RowDiv } from "../../components/Misc/misc.styled";
import { Lbl } from "../../components/Labels";
import { AppCSS, Spacer, TapButton, TxtInput } from "../../components";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { LoginAPI, RegisterApi } from "../../api/user-api";
import { CartModel, UserModel } from "../../types";
import { userLogin } from "../../state/reducers/userSlice";
import { FetchCartItemsApi } from "../../api/product-api";
import { useAppSelector } from "../../state/hooks";
import { Container } from "../../utils/globalstyled";
import { Box, Stack, Tab } from "@mui/material";
import ProductPlaceholder from "../../images/product_placeholder.jpg";
import { CollectPaymentApi } from "../../api/payment-api";
import { MakePayment } from "../Payment";
import { TabContext, TabList, TabPanel } from "@mui/lab";

interface CartProps {}

interface PaymentCredential {
  secret: string;
  publishableKey: string;
}

const CartPage: React.FC<CartProps> = ({}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentTab, setCurrentTab] = useState("");

  const [cartItems, setCartItems] = useState<CartModel[]>([]);
  const [appFee, setAppFee] = useState(0);
  const [productPrice, setProductPrice] = useState(0);
  const [paymentCredential, setPaymentCredential] = useState<
    PaymentCredential | false
  >(false);

  const userReducer = useAppSelector((state) => state.userReducer);

  const profile = userReducer.userProfile;

  useEffect(() => {
    onGetCartItems();
  }, []);

  const getTotal = () => {
    return appFee + productPrice;
  };

  const onInitPayment = async () => {
    const { data, message } = await CollectPaymentApi(profile.token);
    if (data) {
      console.log(data);
      const credential = data as PaymentCredential;
      setPaymentCredential(credential);
    } else {
      console.log(`Error: ${message}`);
    }
  };

  const onGetCartItems = async () => {
    const { data, message } = await FetchCartItemsApi(profile.token);
    if (data) {
      setAppFee(Number(data.appFee));
      const items = data.cartItems as CartModel[];
      if (Array.isArray(items)) {
        const totalAmount = items.reduce(
          (sum, item) => sum + Number(item.price) * item.item_qty,
          0
        );
        setProductPrice(totalAmount);
      }
      setCartItems(items);
    } else {
      console.log(`Error: ${message}`);
    }
  };

  const displayCart = () => {
    return cartItems.map((item) => {
      return (
        <RowDiv
          style={{
            justifyContent: "flex-start",
            border: "1px solid #EDEDED",
            margin: 5,
            padding: 10,
          }}
        >
          <div style={{ flex: 2 }}>
            <img
              draggable={false}
              src={ProductPlaceholder}
              alt={"placeholder"}
              style={{
                height: 140,
                width: 140,
              }}
            />
          </div>
          <div
            style={{
              justifyContent: "space-around",
              alignItems: "center",
              height: "100%",
              flexDirection: "column",
              flex: 6,
            }}
          >
            <p
              style={{
                fontSize: 32,
                fontWeight: "600",
                margin: 0,
                padding: 0,
                marginBottom: 20,
              }}
            >
              {item.name}
            </p>
            <a
              style={{ fontSize: 16, textDecoration: "none", color: "#006492" }}
              href="#"
            >
              View product details
            </a>
          </div>
          <div
            style={{
              display: "flex",
              flex: 2,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p
              style={{
                fontSize: 30,
                fontWeight: "600",
              }}
            >
              {item.item_qty}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flex: 2,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p
              style={{
                fontSize: 30,
                fontWeight: "600",
              }}
            >
              ${Number(item.price).toFixed(2)}
            </p>
          </div>
        </RowDiv>
      );
    });
  };

  const cartOption = () => {
    return (
      <Stack
        style={{
          flexDirection: "row",
          width: "100%",
          display: "flex",
        }}
      >
        <Stack
          style={{
            flex: 9,
            padding: 10,
            marginRight: 50,
          }}
        >
          {displayCart()}
        </Stack>
        <ColDiv
          style={{
            flex: 3,
            backgroundColor: "#fff",
            margin: 10,
            border: "1px solid #EDEDED",
            padding: 20,
            height: 260,
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <TapButton
              title="Place Order"
              color={AppCSS.WHITE}
              bgColor={AppCSS.ORANGE}
              onTap={() => onInitPayment()}
              width={220}
              radius={30}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <p>Product price</p>
            <p>${productPrice.toFixed(2)}</p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <p>Tax & Fee</p>
            <p>${appFee.toFixed(2)}</p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              fontSize: 25,
              fontWeight: "700",
            }}
          >
            <p>Total Amount</p>
            <p>${getTotal().toFixed(2)}</p>
          </div>
        </ColDiv>
      </Stack>
    );
  };

  const paymentOption = () => {
    if (paymentCredential) {
      return (
        <MakePayment
          totalAmount={getTotal()}
          clientSecret={paymentCredential.secret}
          pk={paymentCredential.publishableKey}
          onSuccess={(paymentId: string) => {
            console.log("payment was successful!");
            navigate(`/post-order?id=${paymentId}`);
          }}
          onFailed={() => {
            console.log("payment was not successful!");
            navigate("/failed-order");
          }}
        />
      );
    }
    return <></>;
  };

  // return (
  //   <Container
  //     style={{
  //       width: "80%",
  //       paddingTop: 20,
  //     }}
  //   >
  //     {paymentCredential ? paymentOption() : cartOption()}
  //   </Container>
  // );

  const onChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  const loginToView = (option: string) => {
    return (
      <CenterBox
        style={{
          width: "320px",
          background: "#fff",
          padding: 50,
        }}
      >
        <p
          style={{
            fontSize: 32,
            fontWeight: "600",
            margin: 0,
            padding: 50,
            marginBottom: 10,
          }}
        >
          Login to View Cart Items
        </p>
        <TapButton
          title="Login"
          bgColor={AppCSS.ORANGE}
          radius={30}
          height={52}
          width={220}
          onTap={() => navigate("/login")}
        />
      </CenterBox>
    );
  };

  const displayCartAndOrders = () => {
    if (profile.token) {
      return (
        <TabContext value={currentTab}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              justifyContent: "flex-start",
              width: "100%",
            }}
          >
            <TabList onChange={onChangeTab} aria-label="">
              <Tab
                style={{
                  background: currentTab === "1" ? AppCSS.ORANGE : AppCSS.WHITE,
                  color: currentTab === "1" ? AppCSS.WHITE : AppCSS.BLACK,
                }}
                label="Cart"
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
          ></TabPanel>
          <TabPanel
            style={{
              width: "100%",
              margin: 0,
              padding: 0,
            }}
            value="2"
          >
            {loginToView("Order")}
          </TabPanel>
        </TabContext>
      );
    } else {
      return loginToView("Cart");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "flex-start",
        flexDirection: "column",
        padding: 10,
        borderRadius: 10,
      }}
    >
      <CenterBox
        style={{
          width: "1100px",
          height: "600px",
          background: "#fff",
          padding: 50,
          boxShadow: "1px 1px 5px 1px #DBDBDB",
          borderRadius: 5,
        }}
      >
        {displayCartAndOrders()}
      </CenterBox>
    </div>
  );
};

export default CartPage;
