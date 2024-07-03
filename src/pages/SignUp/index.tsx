/* eslint-disable jsx-a11y/anchor-is-valid */
import { useDispatch } from "react-redux";
import { redirect, useNavigate } from "react-router-dom";
import { CenterBox, ColDiv, RowDiv } from "../../components/Misc/misc.styled";
import { Lbl } from "../../components/Labels";
import { AppCSS, Spacer, TapButton, TxtInput } from "../../components";

import { useEffect, useState } from "react";
import { LoginContainer } from "./login.styled";
import { toast } from "react-toastify";
import { LoginAPI, RegisterApi } from "../../api/user-api";
import { UserModel } from "../../types";
import { userLogin } from "../../state/reducers/userSlice";

interface LoginProps {}

const SignupPage: React.FC<LoginProps> = ({}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const onTapSignup = async () => {
    if (email === "" || password === "" || phone === "") {
      toast("Please enter required fields", {
        type: "error",
        style: {
          width: "400px",
        },
      });
      return;
    }
    const { token, message } = await RegisterApi({
      email,
      phone,
      password,
    });

    if (token) {
      localStorage.setItem("token", token);
      navigate("/verify");
    } else {
      console.log(`Error: ${message}`);
    }
  };

  const signupView = () => {
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
        <RowDiv>
          <Lbl title="New User Registration" size={18} bold={600} />
        </RowDiv>
        <Spacer size={4} direction="col" />
        <ColDiv>
          <TxtInput placeholder="Email address" onChange={setEmail} />
          <Spacer size={2} direction="col" />
          <TxtInput placeholder="Phone" onChange={setPhone} />
          <Spacer size={2} direction="col" />
          <TxtInput
            type="password"
            placeholder="Password"
            onChange={setPassword}
            onPressEnter={() => {
              onTapSignup();
            }}
          />
        </ColDiv>
        <Spacer size={2} direction="col" />

        <RowDiv
          style={{
            justifyContent: "space-between",
          }}
        >
          <TapButton
            onTap={() => navigate("/login")}
            title="Already has account?"
            color={AppCSS.ORANGE}
            bgColor={AppCSS.WHITE}
          />
          <Spacer size={2} direction="row" />

          <TapButton
            onTap={onTapSignup}
            title="Signup"
            bgColor={AppCSS.ORANGE}
            radius={30}
          />
        </RowDiv>
      </CenterBox>
    );
  };

  return <LoginContainer>{signupView()}</LoginContainer>;
};

export default SignupPage;
