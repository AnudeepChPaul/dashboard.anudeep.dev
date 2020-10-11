import React, { useState } from "react";
import styled from "styled-components";
import Head from "next/head";
import { postLoginCall, postRegisterUser } from "@/shared/api/Auth.api";
import { fireLoad } from "@/helpers/Loader";
import LoginView from "@/shared/components/auth/LoginView";
import RegistrationView from "@/shared/components/auth/RegistrationView";

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
  height: 25rem;
  width: 31rem;
  background-color: ${(props) => props.theme.colors.primaryShade};
  box-shadow: 0 9px 16px -16px ${(props) => props.theme.colors.contrast};
  margin: auto;
  border-radius: 2px;
  padding: 1rem;
`;

const AuthenticationPage = (props) => {
  console.log("Rendering LoginPage");

  const [mode, setMode] = useState("LOGIN");
  const [errorMsg, setErrorMsg] = useState(null);

  const doLogin = (username, password) => {
    if (!username || !password) return;
    fireLoad();

    postLoginCall(username, password)
      .then(props.onAuthSuccess)
      .catch((resp) => {
        setErrorMsg(resp.response.data.REASON);
      })
      .finally(() => fireLoad(true));
  };

  const doRegistration = (username, password) => {
    if (!username || !password) return;
    fireLoad();

    postRegisterUser(username, password)
      .then(props.onAuthSuccess)
      .catch((resp) => {
        setErrorMsg(resp.response.data.REASON);
      })
      .finally(() => fireLoad(true));
  };

  const switchToRegistrationView = () => {
    setMode("REGISTRATION");
    setErrorMsg(null);
  };

  const switchToLoginView = () => {
    setMode("LOGIN");
    setErrorMsg(null);
  };

  return (
    <>
      <Head>
        <title>Login to Dashboard</title>
      </Head>
      <LoginPageWrapper>
        <LoginFormWrap>
          {mode === "LOGIN" ? (
            <LoginView
              onLogin={doLogin}
              onRegistrationClick={switchToRegistrationView}
              errorMsg={errorMsg}
            />
          ) : (
            <RegistrationView
              onRegistration={doRegistration}
              onLoginClick={switchToLoginView}
              errorMsg={errorMsg}
            />
          )}
        </LoginFormWrap>
      </LoginPageWrapper>
    </>
  );
};

export default AuthenticationPage;
