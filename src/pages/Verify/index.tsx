/* eslint-disable jsx-a11y/anchor-is-valid */
import { useDispatch } from "react-redux";
import { redirect, useNavigate } from "react-router-dom";
import { CenterBox, ColDiv, RowDiv } from "../../components/Misc/misc.styled";
import { Lbl } from "../../components/Labels";
import { AppCSS, Spacer, TapButton, TxtInput } from "../../components";

import { useEffect, useState } from "react";
import { LoginContainer } from "./login.styled";
import { toast } from "react-toastify";
import {
  GetProfile,
  GetVerificationCode,
  VerifyCode,
} from "../../api/user-api";
import { MuiOtpInput } from "mui-one-time-password-input";
import { AxiosError } from "axios";
import { UserModel } from "../../types";
import { userLogin } from "../../state/reducers/userSlice";

interface LoginProps {}

const VerifyPage: React.FC<LoginProps> = ({}) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const dispatch = useDispatch();

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
      const status = await VerifyCode(token as string, otp);

      if (status === 200) {
        toast("Phone number verified successfully!", {
          type: "success",
          style: {
            width: "400px",
          },
        });
        await FetchProfile();
        navigate("/");
      }
    } catch (error: unknown) {
      const err = error as AxiosError;
      console.log(err);
      if (err.response?.status) {
        if (err.response?.status > 400) {
          toast("Verification failed due to invalid code!", {
            type: "error",
            style: {
              width: "400px",
            },
          });
        } else if (err.response?.status === 400) {
          toast("user already verified!", {
            type: "success",
            style: {
              width: "400px",
            },
          });
          await FetchProfile();
          navigate("/");
        }
      }
    }
  };

  const FetchProfile = async () => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      const { user, message } = await GetProfile(token as string);
      if (user) {
        const auth = user as UserModel;
        dispatch(userLogin(auth));
      } else {
        console.log(`Error: ${message}`);
      }
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
