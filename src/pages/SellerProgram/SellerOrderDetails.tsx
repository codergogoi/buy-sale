/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/BorderColor";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import { AppCSS, Lbl, Spacer, TapButton, TxtInput } from "../../components";
import { ColDiv, RowDiv } from "../../components/Misc/misc.styled";
import { FetchSellerOrderById } from "../../api/product-api";
import { useAppSelector } from "../../state/hooks";
import { setSellerOrder } from "../../state/reducers/productSlice";
import { SellerOrderModel } from "../../types/models/order-model";

interface DashboardProps {}

export const SellerOrderDetails: React.FC<DashboardProps> = ({}) => {
  let { id } = useParams();

  const productReducer = useAppSelector((state) => state.productReducer);

  const { sellerOrderInfo } = productReducer;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [cityName, setCityName] = useState("");
  const [stateName, setStateName] = useState("");
  const [email, setEmail] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (id) {
      onFetchOrder();
    }
  }, [id]);

  const onFetchOrder = async () => {
    try {
      const data = await FetchSellerOrderById(Number(id));
      if (data) {
        dispatch(setSellerOrder(data.data as SellerOrderModel));
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onTapUpdateProfile = () => {
    setIsEdit(false);
  };

  const CustomerDetails = () => {
    return (
      <Accordion style={{ borderRadius: 10 }}>
        <AccordionSummary
          style={{
            background: AppCSS.ORANGE,
            color: AppCSS.WHITE,
            borderRadius: 10,
            margin: 2,
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            <Lbl title="Customer Details" color={AppCSS.WHITE} bold={600} />
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <RowDiv
            style={{
              display: "row",
              justifyContent: "space-around",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <ColDiv
              style={{
                width: "60%",
                marginRight: "100px",
              }}
            >
              <Spacer size={1} direction="col" />
              <RowDiv
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-around",
                }}
              >
                <ColDiv>
                  <Lbl
                    title="Customer Name"
                    color={AppCSS.GRAY_DARK}
                    size={13}
                  />
                  <TxtInput
                    disable={true}
                    value={`${sellerOrderInfo.customer_name}`}
                    placeholder="Customer Name"
                    onChange={() => {}}
                  />
                </ColDiv>
              </RowDiv>
              <ColDiv>
                <Lbl
                  title="Customer Phone"
                  color={AppCSS.GRAY_DARK}
                  size={13}
                />
                <TxtInput
                  disable={true}
                  value={`${sellerOrderInfo.customer_phone}`}
                  placeholder="Customer Phone"
                  onChange={() => {}}
                />
              </ColDiv>
              <ColDiv>
                <Lbl title="Email" color={AppCSS.GRAY_DARK} size={13} />

                <TxtInput
                  value={`${sellerOrderInfo.customer_email}`}
                  placeholder="Email"
                  onChange={() => {}}
                  disable
                />
              </ColDiv>
              <Spacer size={1} direction="col" />
            </ColDiv>
            <ColDiv
              style={{
                width: "60%",
                marginRight: "50px",
                alignItems: "center",
              }}
            >
              <ColDiv>
                <RowDiv
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-around",
                  }}
                >
                  <Lbl title="Address" color={AppCSS.GRAY_DARK} size={13} />
                </RowDiv>

                <TxtInput
                  value={`${sellerOrderInfo.customer_address}`}
                  disable={true}
                  placeholder="Street Address"
                  onChange={() => {}}
                />
              </ColDiv>
              <RowDiv
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-around",
                }}
              >
                <ColDiv>
                  <Lbl title="City Name" color={AppCSS.GRAY_DARK} size={13} />

                  <TxtInput
                    disable={!isEdit}
                    value={cityName}
                    placeholder="City Name"
                    onChange={setCityName}
                  />
                </ColDiv>
                <Spacer size={1} direction="row" />
                <ColDiv>
                  <Lbl title="State Name" color={AppCSS.GRAY_DARK} size={13} />

                  <TxtInput
                    disable={!isEdit}
                    value={stateName}
                    placeholder="State Name"
                    onChange={setStateName}
                  />
                </ColDiv>
              </RowDiv>

              <Spacer size={2} direction="col" />
              <RowDiv style={{ justifyContent: "flex-end" }}>
                <TapButton
                  title="Proceed to Delivery"
                  onTap={() => onTapUpdateProfile()}
                  bgColor={AppCSS.ORANGE}
                  width={220}
                  height={38}
                  radius={30}
                />
              </RowDiv>
            </ColDiv>
          </RowDiv>
        </AccordionDetails>
      </Accordion>
    );
  };

  const productPrice = () => {
    if (sellerOrderInfo.price) {
      return sellerOrderInfo?.price.toFixed(2);
    }
    return 0;
  };

  const OrderDetails = () => {
    return (
      <Accordion style={{ borderRadius: 10 }} defaultExpanded={true}>
        <AccordionSummary
          style={{
            background: AppCSS.ORANGE,
            color: AppCSS.WHITE,
            borderRadius: 10,
            margin: 2,
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            <Lbl title="Order Details" color={AppCSS.WHITE} bold={600} />
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <RowDiv
            style={{
              display: "row",
              justifyContent: "space-around",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <ColDiv
              style={{
                width: "60%",
                marginRight: "100px",
              }}
            >
              <Spacer size={1} direction="col" />
              <RowDiv
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-around",
                }}
              >
                <ColDiv>
                  <Lbl
                    title="Order Ref Number"
                    color={AppCSS.GRAY_DARK}
                    size={13}
                  />
                  <TxtInput
                    disable={true}
                    value={`${sellerOrderInfo.order_ref_number}`}
                    onChange={() => {}}
                    placeholder="ORDER REF NUMBER"
                  />
                </ColDiv>
                <Spacer size={1} direction="row" />
                <ColDiv>
                  <Lbl
                    title="Order Amount"
                    color={AppCSS.GRAY_DARK}
                    size={13}
                  />
                  <TxtInput
                    disable={true}
                    value={`$ ${productPrice()}`}
                    placeholder="Damaged By"
                    onChange={() => {}}
                  />
                </ColDiv>
              </RowDiv>
              <RowDiv
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-around",
                }}
              >
                <ColDiv>
                  <Lbl
                    title="Order Status"
                    color={AppCSS.GRAY_DARK}
                    size={13}
                  />
                  <TxtInput
                    disable={true}
                    value={`${
                      sellerOrderInfo.order_status === 0 ? "PENDING" : "PAID"
                    }`}
                    placeholder="Damaged Date"
                    onChange={() => {}}
                  />
                </ColDiv>
                <Spacer size={2} direction="col" />
                <ColDiv>
                  <Lbl
                    title="Order Item ID"
                    color={AppCSS.GRAY_DARK}
                    size={13}
                  />
                  <TxtInput
                    disable={true}
                    value={`${sellerOrderInfo.order_item_id}`}
                    placeholder="Order Item Id"
                    onChange={() => {}}
                  />
                </ColDiv>
              </RowDiv>
              <Spacer size={1} direction="col" />
            </ColDiv>
            <ColDiv
              style={{
                width: "60%",
                marginRight: "50px",
                alignItems: "center",
              }}
            >
              <ColDiv>
                <RowDiv
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-around",
                  }}
                >
                  <ColDiv>
                    <Lbl
                      title="Product Name"
                      color={AppCSS.GRAY_DARK}
                      size={13}
                    />
                    <TxtInput
                      disable={true}
                      value={`${sellerOrderInfo.name}`}
                      onChange={() => {}}
                      placeholder="product Name"
                    />
                  </ColDiv>
                  <Spacer size={1} direction="row" />
                  <ColDiv>
                    <Lbl
                      title="Product Id"
                      color={AppCSS.GRAY_DARK}
                      size={13}
                    />
                    <TxtInput
                      disable={true}
                      value={`$ ${sellerOrderInfo.product_id}`}
                      placeholder="Product Id"
                      onChange={() => {}}
                    />
                  </ColDiv>
                </RowDiv>
              </ColDiv>

              <Spacer size={2} direction="col" />
            </ColDiv>
          </RowDiv>
        </AccordionDetails>
      </Accordion>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        background: AppCSS.GRAY_MILD,
        justifyContent: "center",
        flex: 1,
        paddingTop: 20,
        paddingBottom: 20,
      }}
    >
      <ColDiv
        style={{
          width: "80%",
        }}
      >
        {OrderDetails()}
        {CustomerDetails()}
      </ColDiv>
    </div>
  );
};
