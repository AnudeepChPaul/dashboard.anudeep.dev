import React, { useState } from "react";
import styled from "styled-components";
import Head from "next/head";
import InputField from "@/components/common/inputs/fields/InputField";
import Button from "@/components/common/inputs/buttons/Button";
import PlainTextButton from "@/components/common/inputs/buttons/PlainTextButton";
import { postLoginCall } from "@/api/Auth.api";
import { fireLoad } from "@/helpers/Loader";

const DisplayFlex = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const LoginPageWrapper = styled(DisplayFlex)`
  height: 100vh;
  width: 100vw;
  background-image: linear-gradient(
    0deg,
    ${(props) => props.theme.colors.primary},
    ${(props) => props.theme.colors.primary} 50%,
    ${(props) => props.theme.colors.contrast} 50%,
    ${(props) => props.theme.colors.contrast}
  );
  position: absolute;
  z-index: 5;
`;

const LoginFormWrap = styled(DisplayFlex)`
  height: 22rem;
  width: 31rem;
  background-color: ${(props) => props.theme.colors.primaryShade};
  box-shadow: 0 9px 16px -16px ${(props) => props.theme.colors.contrast};
  margin: auto;
  border-radius: 2px;
  padding: 1rem;
`;

const LoginForm = styled(DisplayFlex)`
  width: 100%;
  height: 9rem;
  align-items: flex-start;
  justify-content: center;
  padding: 1rem;
`;

const LoginBanner = styled.div`
  width: 100%;
  height: 3rem;
  font-size: 1.6rem;
  text-align: center;
  padding: 1rem 1rem 0;
`;

const FooterWrapper = styled(DisplayFlex)`
  width: 100%;
  height: 2.25rem;
  font-size: 1.6rem;
  text-align: center;
  padding: 1rem 1rem 0;
  justify-content: space-between;

  ${Button} {
    width: 9rem;
  }
`;

const LoginPage = (props) => {
  console.log("Rendering LoginPage");
  const [values, setValues] = useState({ username: "", password: "" });

  const handleChange = (evt) => {
    setValues({ ...values, [evt.target.name]: evt.target.value });
  };

  const doLogin = () => {
    if (!values.username || !values.password) return;
    fireLoad();

    postLoginCall(values.username, values.password)
      .then(props.onAuthSuccess)
      .finally(() => fireLoad(true));
  };

  const fieldProps = {
    height: "2.25rem",
    width: "75%",
    whileHover: { width: "80%" },
    margin: "0 0 1rem",
  };

  return (
    <>
      <Head>
        <title>Login to Dashboard</title>
      </Head>
      <LoginPageWrapper>
        <LoginFormWrap>
          <LoginBanner>
            <span>Login To Dashbaord</span>
          </LoginBanner>
          <LoginForm>
            <InputField
              placeholder={"Username"}
              {...fieldProps}
              name="username"
              value={values.username}
              onChange={handleChange}
              onKeyDown={(evt) => {
                if (evt.key.toLowerCase() === "enter") {
                  evt.preventDefault();
                  doLogin();
                }
              }}
              focus={true}
            />
            <InputField
              placeholder={"Password"}
              {...fieldProps}
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onKeyDown={(evt) => {
                if (evt.key.toLowerCase() === "enter") {
                  evt.preventDefault();
                  doLogin();
                }
              }}
            />
          </LoginForm>
          <FooterWrapper>
            <PlainTextButton text={"Forgot Password ?"} color="contrast" />
            <Button
              backColor={"info"}
              color={"primary"}
              onClick={doLogin}
              type="submit"
              fontSize={"1rem"}
              disabled={!values.username || !values.password}
            >
              Login
            </Button>
          </FooterWrapper>
        </LoginFormWrap>
      </LoginPageWrapper>
    </>
  );
};

export default LoginPage;
