/* eslint-disable jsx-a11y/anchor-is-valid */
import GridList from "@material-ui/core/GridList";
import { GridListTile, GridListTileBar } from "@material-ui/core";
import ProductPlaceholder from "../../images/product_placeholder.jpg";
import { ProductModel } from "../../types";
import React from "react";

const mockdata = [
  {
    _id: "63dfc53017f0c77b678b8d0c",
    name: "iPhone",
    description: "Latest iPhone ",
    category_id: "12345678910",
    image_url:
      "https://mobile.1und1.de/_catalog/images/81c45f0673671de28759bb4e43fe7961-iphone-14-pro-deep-purple-couple.png",
    price: 1200,
    availability: true,
  },
  {
    _id: "63dfc7d4507f33313c6ad7ff",
    name: "Macbook Pro",
    description: "refurbished laptop ",
    category_id: "12345678910",
    image_url:
      "https://www.gravis.de/medias/sys_master/images/images/hdb/h6f/9441324892190/143000-1-product-3x.jpg",
    price: 2500,
    availability: true,
  },
  {
    _id: "63fb703aef6b6aa8c5960eba",
    name: "Ebike",
    description: "ebike ",
    category_id: "63fb6f9a4cfddbda83b220a5",
    image_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTck9NWTDnChhCjCBszYWkFqjKR5wvFAZZD4s_KyTQmuMD1TeaDNIf1YSYmetcisgBZnyE&usqp=CAU",
    price: 2000,
    availability: true,
  },
  {
    _id: "63dfc53017f0c77b678b8d0c",
    name: "Refrigerator",
    description: "refrigerator",
    category_id: "12345678910",
    image_url:
      "https://i.otto.de/i/otto/4d7169ad-f502-5818-9e07-4c9b54f47add?h=520&w=551&sm=clamp",
    price: 400,
    availability: true,
  },
  {
    _id: "63dfc7d4507f33313c6ad7ff",
    name: "Smart TV",
    description: "Smart tv ",
    category_id: "12345678910",
    image_url:
      "https://i.otto.de/i/otto/e25fd6e2-e009-5d19-8248-271946262fa6?h=520&w=551&sm=clamp",
    price: 700,
    availability: true,
  },
  {
    _id: "63fb703aef6b6aa8c5960eba",
    name: "Playstation 5",
    description: "ps5 ",
    category_id: "63fb6f9a4cfddbda83b220a5",
    image_url:
      "https://i.otto.de/i/otto/36a0c9d4-0eb0-461d-931a-945d02f437aa?h=520&w=551&sm=clamp",
    price: 700,
    availability: true,
  },
  {
    _id: "63dfc53017f0c77b678b8d0c",
    name: "X-Box",
    description: "X-Box",
    category_id: "12345678910",
    image_url:
      "https://i.otto.de/i/otto/03b64e88-9d1e-437d-adea-046239eb796a?h=520&w=551&sm=clamp",
    price: 400,
    availability: true,
  },
  {
    _id: "63dfc7d4507f33313c6ad7ff",
    name: "Macbook Pro",
    description: "refurbished laptop ",
    category_id: "12345678910",
    image_url:
      "https://www.gravis.de/medias/sys_master/images/images/hdb/h6f/9441324892190/143000-1-product-3x.jpg",
    price: 1200,
    availability: true,
  },
  {
    _id: "63fb703aef6b6aa8c5960eba",
    name: "Ebike",
    description: "ebike ",
    category_id: "63fb6f9a4cfddbda83b220a5",
    image_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTck9NWTDnChhCjCBszYWkFqjKR5wvFAZZD4s_KyTQmuMD1TeaDNIf1YSYmetcisgBZnyE&usqp=CAU",
    price: 2000,
    availability: true,
  },
] as ProductModel[];

interface CategoryProps {
  products: ProductModel[];
}

export const TopPrducts: React.FC<CategoryProps> = ({ products }) => {
  const productCards = () => {
    if (Array.isArray(products)) {
      return products.map((item) => (
        <GridListTile
          key={item._id}
          style={{
            display: "flex",
            height: 250,
            width: 220,
            marginLeft: 10,
            marginRight: 10,
            justifyContent: "center",
            border: `solid 1px #EFEFEF`,
            borderRadius: 10,
          }}
        >
          <a
            href={`/product-details/${item._id}`}
            style={{
              textDecoration: "none",
            }}
          >
            <div style={{ height: 200, width: 220, background: "red" }}>
              image
            </div>
            <div
              style={{
                height: 50,
                display: "flex",
                justifyContent: "center",
                fontSize: 16,
                fontWeight: "600",
                margin: 0,
                padding: 0,
                color: "#505050",
              }}
            >
              ${item.price}
            </div>
          </a>
        </GridListTile>
      ));
    }
    return <></>;
  };

  return (
    <div
      style={{
        width: "96%",
        flexDirection: "column",
        background: "#fff",
        padding: "2%",
      }}
    >
      <p
        style={{ fontSize: 26, fontWeight: "700", margin: 0, marginBottom: 20 }}
      >
        Top Products
      </p>
      <GridList
        cols={2.5}
        style={{
          flexWrap: "nowrap",
          transform: "translateZ(0)",
        }}
      >
        {productCards()}
      </GridList>
    </div>
  );
};

/*
<div
              style={{
                display: "flex",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <img
                draggable={false}
                src={item.image_url}
                alt={"placeholder"}
                style={{
                  width: "80%",
                }}
              />
              <div
                style={{
                  width: "100%",
                  height: 60,
                }}
              >
                <span
                  style={{
                    display: "flex",
                    fontSize: 16,
                    fontWeight: "600",
                    margin: 0,
                    padding: 0,
                    flex: 8,
                    color: "#505050",
                  }}
                >
                  {item.name}
                </span>
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    margin: 0,
                    padding: 0,
                    flex: 4,
                    display: "flex",
                    marginTop: 10,
                    color: "#505050",
                  }}
                >
                  ${item.price}
                </span>
              </div>
            </div>
            */
