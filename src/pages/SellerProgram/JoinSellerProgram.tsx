/* eslint-disable jsx-a11y/anchor-is-valid */
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CenterBox, ColDiv, RowDiv } from "../../components/Misc/misc.styled";
import { Lbl } from "../../components/Labels";
import { AppCSS, Spacer, TapButton, TxtInput } from "../../components";

import { useState } from "react";

import { Container } from "../../utils/globalstyled";
import { Checkbox, FormControlLabel } from "@mui/material";
import { JoinSellerProgramAPI } from "../../api/seller-api";
import { toast } from "react-toastify";

interface SellerProgramProps {}

const JoinSellerProgram: React.FC<SellerProgramProps> = ({}) => {
  const navigate = useNavigate();

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");

  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [confirmAccountNumber, setConfirmAccountNumber] = useState("");
  const [swiftCode, setSwiftCode] = useState("");

  const [regularPayout, setRegularPayout] = useState(true);

  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");
  const [country, setCountry] = useState("");

  const onTapJoinProgram = async () => {
    const { token, message } = await JoinSellerProgramAPI({
      first_name,
      last_name,
      phone_number,
      bankAccountNumber: +bankAccountNumber,
      swiftCode,
      paymentType: regularPayout ? "regular" : "weekly",
    });
    if (message === "become seller") {
      // TODO: This should be status code
      if (token) {
        localStorage.setItem("token", token);
      }
      toast("Successfully joined seller program!", {
        type: "success",
        style: {
          width: "400px",
        },
      });
      navigate("/manage-products");
    } else {
      console.log(`Error: ${message}`);
    }
  };

  const onboardingSellerProgram = () => {
    return (
      <CenterBox
        style={{
          background: "#fff",
          padding: 50,
          boxShadow: "1px 1px 5px 1px #DBDBDB",
          borderRadius: 5,
        }}
      >
        <Spacer size={1} direction="col" />
        <RowDiv
          style={{
            display: "row",

            justifyContent: "space-around",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <RowDiv>
            <Lbl title={`Become a Seller`} size={32} bold={600} />
          </RowDiv>
        </RowDiv>
        <Spacer size={1} direction="col" />
        {/* Selected Action row */}
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
              marginRight: "50px",
            }}
          >
            <Spacer size={1} direction="col" />

            <ColDiv>
              <Lbl title="First Name" color={AppCSS.GRAY_DARK} size={13} />
              <TxtInput
                value={first_name}
                placeholder="First Name"
                onChange={setFirstName}
              />
            </ColDiv>
            <Spacer size={1} direction="row" />
            <ColDiv>
              <Lbl title="Last Name" color={AppCSS.GRAY_DARK} size={13} />
              <TxtInput
                value={last_name}
                placeholder="Last Name"
                onChange={setLastName}
              />
            </ColDiv>

            <ColDiv>
              <Lbl title="Phone Number" color={AppCSS.GRAY_DARK} size={13} />

              <TxtInput
                value={phone_number}
                placeholder="Phone Number"
                onChange={setPhoneNumber}
              />
            </ColDiv>
            <Spacer size={2} direction="col" />

            <ColDiv>
              <Lbl
                title="Bank Account Number"
                color={AppCSS.GRAY_DARK}
                size={13}
              />
              <TxtInput
                value={bankAccountNumber}
                placeholder="Bank Account Number"
                onChange={setBankAccountNumber}
              />
            </ColDiv>

            <ColDiv>
              <Lbl
                title="Confirmed Account Number"
                color={AppCSS.GRAY_DARK}
                size={13}
              />

              <TxtInput
                value={confirmAccountNumber}
                placeholder="Confirm Account Number"
                onChange={setConfirmAccountNumber}
              />
            </ColDiv>
            <ColDiv>
              <Lbl title="Swift Code" color={AppCSS.GRAY_DARK} size={13} />

              <TxtInput
                value={swiftCode}
                placeholder="Swift Code"
                onChange={setSwiftCode}
              />
            </ColDiv>

            <RowDiv
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-around",
              }}
            ></RowDiv>
          </ColDiv>
          <ColDiv
            style={{
              alignItems: "center",
            }}
          >
            <ColDiv
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <RowDiv
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-around",
                }}
              >
                <Lbl
                  title="Seller Address"
                  color={AppCSS.GRAY_DARK}
                  size={13}
                />
              </RowDiv>
              <ColDiv>
                <TxtInput
                  value={addressLine1}
                  placeholder="Address Line1"
                  onChange={setAddressLine1}
                />
              </ColDiv>
              <RowDiv
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-around",
                }}
              >
                <Lbl
                  title="Additional Address"
                  color={AppCSS.GRAY_DARK}
                  size={13}
                />
              </RowDiv>
              <ColDiv>
                <TxtInput
                  value={addressLine2}
                  placeholder="Address Line2"
                  onChange={setAddressLine2}
                />
              </ColDiv>
              <Spacer size={1} direction="col" />
            </ColDiv>
            <Spacer size={1} direction="col" />
            <ColDiv>
              <Lbl title="City Name" color={AppCSS.GRAY_DARK} size={13} />

              <TxtInput
                value={city}
                placeholder="City Name"
                onChange={setCity}
              />
            </ColDiv>
            <Spacer size={1} direction="row" />
            <ColDiv>
              <Lbl title="Post Code" color={AppCSS.GRAY_DARK} size={13} />

              <TxtInput
                value={postCode}
                placeholder="Post Code"
                onChange={setPostCode}
              />
            </ColDiv>
            <ColDiv>
              <Lbl title="Country" color={AppCSS.GRAY_DARK} size={13} />

              <TxtInput
                value={country}
                placeholder="Country"
                onChange={setCountry}
              />
            </ColDiv>

            <Spacer size={1} direction="col" />
            <RowDiv
              style={{
                justifyContent: "flex-start",
                flexDirection: "row",
                margin: 0,
              }}
            >
              <FormControlLabel
                style={{
                  color: "#979797",
                }}
                control={
                  <Checkbox
                    onChange={(e) => setRegularPayout(e.target.checked)}
                    sx={{
                      color: "#dc2342",
                      "&.Mui-checked": {
                        color: "#dc2342",
                      },
                    }}
                    checked={regularPayout}
                  />
                }
                label=""
              />
              <p
                style={{
                  textAlign: "left",
                  wordWrap: "break-word",
                  whiteSpace: "normal",
                  fontSize: "0.8rem",
                }}
              >
                Regular Payout
              </p>
            </RowDiv>
            <Spacer />
            <TapButton
              title="Join Program"
              onTap={() => onTapJoinProgram()}
              bgColor={AppCSS.RED}
              width={240}
              height={38}
            />
          </ColDiv>
        </RowDiv>
      </CenterBox>
    );
  };

  return (
    <Container
      style={{
        width: "80%",
        paddingTop: 20,
      }}
    >
      {onboardingSellerProgram()}
    </Container>
  );
};

export default JoinSellerProgram;
