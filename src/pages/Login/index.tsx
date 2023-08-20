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

const LoginPage: React.FC<LoginProps> = ({}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onTapLogin = async () => {
    if (email === "" || password === "") {
      toast("Please enter email address and password!", {
        type: "error",
        style: {
          width: "400px",
        },
      });
      return;
    }
    const { data, msg } = await LoginAPI(email, password);
    if (data) {
      const auth = data as UserModel;
      if (auth.token) {
        localStorage.setItem("token", auth.token);
      }
      dispatch(userLogin(auth));
      navigate("/");
    } else {
      console.log(`Error: ${msg}`);
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
        <RowDiv>
          <Lbl title="Sign in" size={30} bold={600} />
        </RowDiv>
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
          Are You New User ?
          <TapButton
            title="Create an account"
            color={AppCSS.ORANGE}
            bgColor="none"
            isLeft
            onTap={() => navigate("/signup")}
            width={150}
          />
        </RowDiv>
        <ColDiv>
          <TxtInput placeholder="Email address" onChange={setEmail} />
          <Spacer size={2} direction="col" />
          <TxtInput
            type="password"
            placeholder="Password"
            onChange={setPassword}
            onPressEnter={() => {
              onTapLogin();
            }}
          />
        </ColDiv>

        <RowDiv
          style={{
            justifyContent: "space-between",
          }}
        >
          <TapButton
            onTap={() => {}}
            title="Forgot Password"
            bgColor={AppCSS.WHITE}
            color={AppCSS.ORANGE}
            isLeft={true}
          />
          <Spacer size={2} direction="row" />
          <TapButton
            onTap={onTapLogin}
            title="Sign In"
            bgColor={AppCSS.ORANGE}
            radius={30}
          />
        </RowDiv>
        <Spacer size={1} direction="col" />
      </CenterBox>
    );
  };

  return <LoginContainer>{loginView()}</LoginContainer>;
};

export default LoginPage;
