import React from "react";
import styled from "styled-components";
import SquaredButton from "@/components/common/inputs/buttons/SquaredButton";
import { motion } from "framer-motion";

const SkillsDisplayWrapper = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.primary};
  flex-direction: row;
  min-width: 16rem;
  max-width: 25rem;
  margin: 1rem auto 1rem;
  padding: 0.25rem 1rem;
  user-select: none;
`;

const SkillsDisplay = (props) => {
  return (
    <SkillsDisplayWrapper whileHover={{ scale: 1.05 }}>
      <span>{props.tech.rank}.</span>
      <h4>{props.tech.name}</h4>
      <p>{props.tech.rating}</p>
      <SquaredButton
        icon={"dash-icon-delete"}
        color={"error"}
        backColor={"transparent"}
        type={"button"}
        onDoubleClick={props.onDelete}
      />
    </SkillsDisplayWrapper>
  );
};

export default SkillsDisplay;
