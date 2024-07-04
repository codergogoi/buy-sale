import { RowDiv } from "../../components/Misc/misc.styled";
import { Container } from "../../utils/globalstyled";
import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";
import { DealsCard } from "./DealsCard";
import banner from "../../images/banner.png";

const DealsPage = () => {
  const items = [
    {
      name: "Summer Sale!",
      description: "Grab your favorite items at a discounted price!",
      img: banner,
    },
    {
      name: "Biggest Sale Ever!",
      description: "Buy at 50% off! with all the items in the store!",
      img: banner,
    },
    {
      name: "Summer Sale!",
      description: "Huge discounts on all items! Grab them now!",
      img: banner,
    },
  ];

  return (
    <Carousel
      sx={{
        width: "80%",
        paddingLeft: "10%",
        paddingRight: "10%",
        marginBottom: 10,
      }}
    >
      {items.map((item, i) => (
        <DealsCard deal={item} />
      ))}
    </Carousel>
  );
};

export default DealsPage;
