/* eslint-disable jsx-a11y/anchor-is-valid */
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CenterBox, ColDiv, RowDiv } from "../../components/Misc/misc.styled";
import { Lbl } from "../../components/Labels";
import { AppCSS, Spacer, TapButton, TxtInput } from "../../components";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import { useEffect, useState } from "react";

import { useAppSelector } from "../../state/hooks";
import { Container } from "../../utils/globalstyled";
import { Checkbox, FormControlLabel } from "@mui/material";
import { JoinSellerProgramAPI } from "../../api/seller-api";
import ProductView from "./productView";
import { toast } from "react-toastify";

interface SellerProgramProps {}

const ManageProducts: React.FC<SellerProgramProps> = ({}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const onTapJoinProgram = async () => {
    const { data, msg } = await JoinSellerProgramAPI({
      firstName,
      lastName,
      phoneNumber,
      bankAccountNumber,
      swiftCode,
      paymentType: regularPayout ? "regular" : "weekly",
      address: {
        addressLine1,
        addressLine2,
        city,
        postCode,
        country,
      },
    });
    if (data) {
      console.log(JSON.stringify(data));
      toast("Successfully joined seller program!", {
        type: "success",
        style: {
          width: "400px",
        },
      });
    } else {
      console.log(`Error: ${msg}`);
    }
  };

  return (
    <Container
      style={{
        width: "90%",
        paddingLeft: "5%",
        paddingRight: "5%",
        paddingTop: "2%",
      }}
    >
      <ProductView />
    </Container>
  );
};

export default ManageProducts;
