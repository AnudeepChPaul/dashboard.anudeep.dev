import React from "react";
import styled from "styled-components";

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Header = styled.h1`
  margin: 0;
  margin-right: 2rem;
  color: ${(props) => props.theme.colors.secondary};
`;

const SubHeader = styled.h4`
  margin: 0;
  margin-right: 0.5rem;
  font-weight: 100;
`;

const WelcomeArea = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.colors.primaryShade};
`;

const DashHeader = (props) => {
  const date = new Date();

  return (
    <HeaderWrapper>
      <WelcomeArea>
        <Header>Welcome back, Anudeep</Header>
        <SubHeader>{date.getDay() + ", "}</SubHeader>
        <SubHeader>{date.getMonth()}</SubHeader>{" "}
        <SubHeader>{date.getFullYear()}</SubHeader>
      </WelcomeArea>
    </HeaderWrapper>
  );
};

export default DashHeader;
