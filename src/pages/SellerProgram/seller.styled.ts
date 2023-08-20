import styled from "styled-components";

export const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin: 5px;
  height: 250px;
  border-radius: 10px;
  width: 170px;
`;

export const ProductPriceDiv = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 60px;
  width: 96%;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 0px 0px 10px 10px;
  color: #fff;
  padding: 1%;
  padding-left: 3%;
`;

export const LblProductPrice = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: left;
  font-size: 13pt;
  font-weight: "lighter";
  color: #fff;
  width: 90%;
  text-align: left;
`;
export const LblProductTitle = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: left;
  font-size: 1.2rem;
  font-weight: "100";
  color: #fff;
  width: 90%;
  text-align: left;
`;

export const LblProductDesc = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: left;
  font-size: 0.8rem;
  font-weight: "100";
  color: #fff;
  width: 90%;
  text-align: left;
`;
