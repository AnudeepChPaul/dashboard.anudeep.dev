import styled from "styled-components";
import { motion } from "framer-motion";
import React from "react";
import { getLightTapAnimation, getLightZoomAnimation } from "@/helpers/Themes";

const ButtonEl = styled(motion.button)`
  display: flex;
  // cursor: pointer;
  user-select: none;
  background-color: ${(props) =>
    props.theme.colors[props.backColor] || props.theme.colors.info};
  color: ${(props) =>
    props.theme.colors[props.color] || props.theme.colors.secondary};
  margin: ${(props) => props.margin};
  font-size: ${(props) => props.fontSize || "1rem"};
  padding: 0.4rem 0.4rem;
  border-radius: 0.15rem;
  height: 2.25rem;
  font-weight: 400;
  font-family: unset;
  align-items: center;
  border: none;
  outline: none;
  align-items: center;
  justify-content: center;

  * {
    cursor: pointer;
  }

  & :disabled {
    cursor: not-allowed;
    pointer-events: none;
    opacity: 0.5;
  }

  span {
    font-size: ${(props) => props.iconSize || "0.85rem"};
    margin-right: 0.5rem;
  }
`;

export default styled(function Button(props) {
  //console.log("Rendering Button");
  const { icon, children, ...rest } = props;
  return (
    <ButtonEl
      {...rest}
      whileHover={getLightZoomAnimation()}
      whileTap={getLightTapAnimation()}
      transition={{ duration: 0.15 }}
    >
      {props.icon && <span className={props.icon} />}
      <label>{props.children}</label>
    </ButtonEl>
  );
})``;
