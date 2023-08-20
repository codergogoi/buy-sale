import styled from "styled-components";

export const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin: 20px;
  height: 200px;
  border-radius: 10px;
  width: 170px;
`;

export const ProductPriceDiv = styled.div`
  display: flex;
  flex-direction: column;
  background: #484eff;
  border-radius: 0px 0px 10px 10px;
  color: #fff;
  padding: 2%;
  padding-left: 5%;
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
