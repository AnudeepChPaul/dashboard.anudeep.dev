// import PropTypes from "prop-types";
import styled from "styled-components";
import { motion } from "framer-motion";
import React from "react";
import SquaredButton from "@/components/common/inputs/buttons/SquaredButton";
import InputField from "@/components/common/inputs/fields/InputField";

const Header = styled(motion.header)`
  height: 2rem;
  max-height: 2rem;
  background-color: ${(props) => props.theme.colors.primaryShade};
  color: ${(props) => props.theme.colors.primary};
  box-shadow: ${(props) => props.theme.boxShadow(0, 4, 25, -16)};
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 1rem;
  flex: 1;
  position: sticky;
  top: 0px;
  z-index: 1;
  border-radius: 0px;

  * {
    user-select: none;
  }

  ${InputField} {
    border-radius: 0px;
  }
`;

const HeaderInner = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const headerAnimation = {
  animate: { opacity: 1, y: 0 },
  actual: { y: "-100%", opacity: 0 },
};

const Menu = styled.menu`
  user-select: none;
  margin-block-start: 0px;
  margin-block-end: 0px;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0px;
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SelectWrapper = styled(motion.div)`
  height: 100%;
  background-color: transparent;
  color: ${(props) => props.theme.colors.secondary};
  border: none;
  outline: none;
  float: right;
  padding: 0 1rem;
  position: relative;

  select {
    width: 6rem;
    border-radius: 0;
    height: 100%;
    color: ${(props) => props.theme.colors.secondary};
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 1rem;
    cursor: pointer;

    option {
      border-radius: 0;
      height: 3rem;
      font-weight: bolder;
      color: ${(props) => props.theme.colors.secondary};
    }
  }
`;

const BannerHeader = function (props) {
  //console.log("Rendering BannerHeader");
  return (
    <Header>
      <HeaderInner
        animate={headerAnimation.animate}
        style={{ justifyContent: "space-between", ...headerAnimation.actual }}
      >
        <InputField
          type={"text"}
          placeholder={"Search"}
          whileHover={{ width: "12rem" }}
        />

        <SelectWrapper>
          <select>
            <option value="resume">Resume</option>
          </select>
        </SelectWrapper>
      </HeaderInner>
      <HeaderInner
        animate={headerAnimation.animate}
        style={{ ...headerAnimation.actual }}
      >
        {[
          {
            backColor: "transparent",
            color: "success",
            icon: "dash-icon-play",
            fontSize: "1.9rem",
            order: 1,
          },
          {
            backColor: "transparent",
            color: "error",
            icon: "dash-icon-heartbeat",
            order: 2,
          },
          {
            backColor: "transparent",
            color: "info",
            icon: "dash-icon-comment",
            order: 3,
            badgeCount: 12,
          },
          {
            backColor: "transparent",
            color: "info",
            icon: "dash-icon-active-notifications",
            fontSize: "1.9rem",
            order: 4,
            badgeCount: 12,
          },
        ]
          .sort((el1, el2) => el2.order - el1.order)
          .map((el, index) => (
            <Menu key={index}>
              <SquaredButton
                backColor={el.backColor}
                color={el.color}
                fontSize={el.fontSize}
                badgeCount={el.badgeCount}
                icon={el.icon}
              >
                <span style={{ margin: "0 0 0 0.5rem" }}>{el.text}</span>
              </SquaredButton>
            </Menu>
          ))}
      </HeaderInner>
    </Header>
  );
};

// BannerHeader.propTypes = {
//   header: PropTypes.string,
// };

export default BannerHeader;
