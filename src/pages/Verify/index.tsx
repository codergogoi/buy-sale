/* eslint-disable jsx-a11y/anchor-is-valid */
import { useDispatch } from "react-redux";
import { redirect, useNavigate } from "react-router-dom";
import { CenterBox, ColDiv, RowDiv } from "../../components/Misc/misc.styled";
import { Lbl } from "../../components/Labels";
import { AppCSS, Spacer, TapButton, TxtInput } from "../../components";

import { useEffect, useState } from "react";
import { LoginContainer } from "./login.styled";
import { toast } from "react-toastify";
import { GetVerificationCode, VerifyCode } from "../../api/user-api";
import { MuiOtpInput } from "mui-one-time-password-input";
import { AxiosError } from "axios";

interface LoginProps {}

const VerifyPage: React.FC<LoginProps> = ({}) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  useEffect(() => {
    getVerificationCode();
  }, []);

  const getVerificationCode = async () => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      const { data } = await GetVerificationCode(token);
      if (data) {
        toast("Enter the code sent your phone number!", {
          type: "success",
          style: {
            width: "400px",
          },
        });
      }
    }
  };

  const handleChange = (val: string) => {
    setOtp(val);
  };

  const onSubmit = async () => {
    const token = localStorage.getItem("token");
    if (otp === "") {
      toast("Please enter you otp!", {
        type: "error",
        style: {
          width: "400px",
        },
      });
      return;
    }
    try {
      const { msg } = await VerifyCode(token as string, otp);
      if (msg === "Error: user already verified!") {
        toast("user already verified!", {
          type: "success",
          style: {
            width: "400px",
          },
        });
        navigate("/");
      }
      if (msg === "success") {
        toast("Phone number verified successfully!", {
          type: "success",
          style: {
            width: "400px",
          },
        });
        navigate("/");
      } else {
        toast("Verification failed!", {
          type: "error",
          style: {
            width: "400px",
          },
        });
      }
    } catch (error: unknown) {
      console.log("err", error as AxiosError);
    }
  };

  const loginView = () => {
    return (
      <CenterBox
        style={{
          maxWidth: "360px",
          background: "#fff",
          padding: 50,
          boxShadow: "1px 1px 5px 1px #DBDBDB",
          borderRadius: 5,
        }}
      >
        <RowDiv
          style={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            color: "#2E2C34",
            fontSize: "14px",
          }}
        >
          <p
            style={{
              fontSize: 16,
            }}
          >
            Verify your phone
          </p>
        </RowDiv>
        <Spacer size={2} direction="col" />
        <ColDiv>
          <MuiOtpInput value={otp} length={6} onChange={handleChange} />
          <Spacer size={2} direction="col" />
        </ColDiv>
        <RowDiv
          style={{
            justifyContent: "center",
          }}
        >
          <TapButton
            onTap={onSubmit}
            title="Submit"
            bgColor={AppCSS.ORANGE}
            width={180}
            radius={30}
          />
        </RowDiv>
      </CenterBox>
    );
  };

  return <LoginContainer>{loginView()}</LoginContainer>;
};

export default VerifyPage;
