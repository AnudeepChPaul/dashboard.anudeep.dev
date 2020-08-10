import styled from "styled-components";
import { motion } from "framer-motion";
import React from "react";
import { getTapAnimation, getZoomAnimation } from "@/helpers/Themes";

const Button = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: end;
  cursor: pointer;
  user-select: none;
  background-color: ${(props) =>
    props.theme.colors[props.backColor] || props.theme.colors.info};
  color: ${(props) =>
    props.theme.colors[props.color] || props.theme.colors.secondary};
  font-size: ${(props) => props.fontSize || "1.7rem"};
  margin: ${(props) => props.margin || "0 1.7rem 0 0"};
  padding: 0.4rem 0.4rem;
  border-radius: 0.15rem;
  line-height: 2rem;
  height: 2.5rem;
  width: 2.5rem;
  font-weight: 400;
  font-family: unset;
  border: none;
  outline: none;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:last-child {
    margin-right: 0rem;
  }

  svg {
    margin: auto;
  }
`;

const Badge = styled.div`
  position: relative;
  top: -1.3rem;
  left: 0rem;
  background-color: ${(props) => props.theme.colors.error};
  color: ${(props) => props.theme.colors.primaryShade};
  height: 1.15rem;
  width: 1.15rem;
  border-radius: 50%;
`;

const BadgeInner = styled.div`
  height: 1.1rem;
  width: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6rem;
`;

const SquaredButton = (props) => {
  //console.log("Rendering SquaredButton");

  const { icon, badgeCount, children, className, ...rest } = props;

  return (
    <Button
      className={[props.icon, className].join(" ")}
      whileHover={props.disabled ? null : { scale: 1.25 }}
      whileTap={props.disabled ? null : { scale: 1.1 }}
      {...rest}
    >
      {children}

      {badgeCount && (
        <Badge>
          <BadgeInner>{badgeCount}</BadgeInner>
        </Badge>
      )}
    </Button>
  );
};

export default styled(SquaredButton)``;
