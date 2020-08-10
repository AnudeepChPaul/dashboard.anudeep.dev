import styled from "styled-components";
import { motion } from "framer-motion";
import React from "react";

const ButtonEl = styled(motion.button).attrs((props) => ({
  "aria-labelledby": props.text,
}))`
  display: flex;
  // cursor: pointer;
  user-select: none;
  background-color: ${(props) => props.theme.colors["transparent"]};
  border-color: ${(props) => props.theme.colors["transparent"]};
  color: ${(props) => props.theme.colors[props.color || "error"]};
  font-size: 1rem;
  border-radius: 0.15rem;
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

  &:hover {
    text-decoration: underline;
  }
`;

export default styled(function PlainTextButton(props) {
  //console.log("Rendering Button");
  const { ...rest } = props;
  return (
    <ButtonEl {...rest}>
      <label>{props.text}</label>
    </ButtonEl>
  );
})``;
