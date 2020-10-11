import styled from "styled-components";
import {motion} from "framer-motion";
import React from "react";
import Router from "next/router";
import Button from "../inputs/buttons/Button";

const Header = styled.div`
  height: 2rem;
  background-color: ${(props) => props.theme.colors.contrast};
  color: ${(props) => props.theme.colors.primary};
  box-shadow: ${(props) => props.theme.boxShadow(0, 2, 3, -2)};
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
  flex: 1;
  border-radius: 0px;

  * {
    user-select: none;
  }
`;
const HeaderInner = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 0px;
  color: ${(props) => props.theme.colors.primary};
`;
const BrandLogo = styled(motion.div)`
  width: max-content;
  font-size: 1.6rem;
  * {
    cursor: pointer;
  }
`;
const MenuItemsWrapper = styled(motion.div)`
  height: calc(100% - 4rem);
  color: ${(props) => props.theme.colors.primary};

  font-size: ${(props) => props.fontSize || "1.1rem"};

  button {
    user-select: none;
    margin: auto;
    margin-top: 1rem;
  }
`;
const Menu = styled.div`
  width: 15rem;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.contrast};
  border-radius: 0px;
  box-shadow: ${(props) => props.theme.boxShadow(0, 0, 25, -9)};

  ${Header} {
    border-radius: 0px;
  }
`;

;

function AppMenu(props) {
  const onClickMenuItems = (el) => {
    Router.pathname !== el.menuUrl && Router.push(el.menuUrl);
  };

  return (
    <Menu>
      <Header>
        <HeaderInner animate={props.slideIn.animate} style={props.slideIn.style}>
          <BrandLogo animate={props.brandAnimation}>
            <span>{props.header || "ACP"}</span>
          </BrandLogo>
        </HeaderInner>
      </Header>
      <MenuItemsWrapper>
        {[
          {
            text: "Dashboard",
            menuUrl: "/dashboard",
            icon: "dash-icon-pie-chart",
            iconSize: "1.3rem",
          },
          {
            text: "Configurations",
            menuUrl: "/settings",
            icon: "dash-icon-settings",
            iconSize: "1.3rem",
          },
          {
            text: "Tasks",
            menuUrl: "/tasks",
            icon: "dash-icon-tasks",
            badgeCount: 2,
            iconSize: "1.3rem",
          },
        ].map((el, index) => (
          <Button
            animate={{opacity: 1, y: 0}}
            style={{opacity: 0, y: "-100%"}}
            whileHover={props.buttonHoverAnimation}
            whileTap={props.buttonTapAnimation}
            key={index}
            onClick={() => onClickMenuItems(el)}
            icon={el.icon}
            fontSize={el.fontSize}
            iconSize={el.iconSize}
            badgeCount={el.badgeCount}
            backColor={"transparent"}
            color={"primary"}
          >
            <span>{el.text}</span>
          </Button>
        ))}
      </MenuItemsWrapper>
    </Menu>
  );
}

export default AppMenu;
