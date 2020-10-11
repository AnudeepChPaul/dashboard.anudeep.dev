import React from "react";
import styled from "styled-components";
import Head from "next/dist/next-server/lib/head";
import AppMenu from "@/shared/components/menus/AppMenu";
import BannerHeader from "@/shared/components/menus/Header";
import {getBrandAnimation, getLightZoomAnimation, getSlideInFromTop, getTapAnimation,} from "@/helpers/Themes";

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
      <AppMenu brandAnimation={getBrandAnimation()}
               buttonHoverAnimation={getLightZoomAnimation()}
               buttonTapAnimation={getTapAnimation()}
               slideIn={getSlideInFromTop()}/>

      <Section>
        <BannerHeader/>
        {props.children}
      </Section>
    </>
  );
}
