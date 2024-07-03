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
