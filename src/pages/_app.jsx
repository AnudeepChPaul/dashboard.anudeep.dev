import React from "react";
import PropTypes from "prop-types";
import styled, { ThemeProvider } from "styled-components";
import theme from "../helpers/Themes";
import Router from "next/router";
import { wrapper } from "@/redux/store";

import "./app.scss";
import { fireLoad, initializeLoadingEventSubscribers } from "@/helpers/Loader";
import App from "next/app";
import dynamic from "next/dynamic";
import { validateToken } from "@/shared/api/Auth.api";
import { setAuthenticationHeaders } from "@/shared/api";

const fonts = [
  "Open Sans",
  "Montserrat",
  "sans-serif",
  "-apple-system",
  "BlinkMacSystemFont",
  "Segoe UI",
  "Roboto",
  "Arial",
];

const Main = styled.main`
  font-size: 16px;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  height: 100vh;
  overflow: hidden;

  * {
    font-family: ${fonts.join(",")};
    font-weight: 400;
    border-radius: 3px;
    -webkit-font-smoothing: antialiased;
  }
`;

`https://www.manh.com/sites/default/files/favicon.ico
https://www.smartapp.com/favicon.ico`;

const AuthenticationPage = dynamic(() => import("@/shared/components/auth/Authentication"));

const userAuth = process.env.NEXT_PUBLIC_NO_LOGIN === "true";

class MyApp extends App {
  state = {
    userAuthenticated: userAuth,
  };

  componentDidMount() {
    initializeLoadingEventSubscribers();

    Router.events.on("routeChangeStart", () => fireLoad());
    Router.events.on("routeChangeComplete", () => fireLoad(true));
    Router.events.on("routeChangeError", () => fireLoad(true));

    if (Router.pathname === "/_error") {
      return Router.push("/dashboard");
    }

    fireLoad();
    setAuthenticationHeaders();

    !this.state.userAuthenticated &&
      validateToken()
        .then((resp) => {
          if (!resp.validToken) {
            return;
          }

          setAuthenticationHeaders();
          this.setState({
            userAuthenticated: true,
          });
        })
        .catch(() => {
          fireLoad(true);
        });
  }

  onAuthSuccess(e) {
    this.setState({
      userAuthenticated: true,
    });
    localStorage.setItem("token", e.USER.token);
    localStorage.setItem("username", e.USER.username);

    setAuthenticationHeaders();

    if (Router.pathname === "/_error") {
      Router.push("/dashboard");
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        {!this.state.userAuthenticated ? (
          <AuthenticationPage onAuthSuccess={(evt) => this.onAuthSuccess(evt)} />
        ) : (
          <Main>
            <Component {...pageProps} />
          </Main>
        )}
      </ThemeProvider>
    );
  }
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export function reportWebVitals(metric) {
  // //console.log(metric);
}

export default wrapper.withRedux(MyApp);
