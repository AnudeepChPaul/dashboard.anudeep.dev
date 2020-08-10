import React from "react";
import styled from "styled-components";
import Head from "next/dist/next-server/lib/head";
import AppMenu from "@/components/common/menus/AppMenu";
import BannerHeader from "@/components/common/menus/Header";

const Section = styled.section`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: scroll;
  height: 100vh;
`;

export default function MenuLayout(props) {
  return (
    <>
      <Head>
        <title>{props.title || "Dashboard"}</title>
      </Head>
      <AppMenu />

      <Section>
        <BannerHeader />
        {props.children}
      </Section>
    </>
  );
}
