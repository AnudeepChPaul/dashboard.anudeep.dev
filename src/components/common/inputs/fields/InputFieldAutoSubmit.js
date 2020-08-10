import styled from "styled-components";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const MotionInput = styled(motion.input)`
  width: ${(props) => props.width || "9rem"};
  height: ${(props) => props.height || "2rem"};
  margin: ${(props) => props.margin || 0};
  color: ${(props) => props.theme.colors.secondary};
  background-color: transparent;
  border: none;
  border-bottom: 2px solid ${(props) => props.theme.colors.secondary};
  outline: none;
  border-radius: 0px;
  user-select: none;
  font-size: 1rem;
  text-overflow: ellipsis;

  &[readonly] {
    opacity: 0.5;
    user-select: none;
    cursor: pointer;
  }
`;

const InputFieldAutoSubmit = (props) => {
  const [readonly, setReadonly] = useState(true);

  const { type, ...rest } = props;

  return (
    <MotionInput
      type={type || "text"}
      onClick={() => setReadonly(false)}
      onBlurCapture={() => setReadonly(true)}
      readOnly={readonly}
      {...rest}
    />
  );
};

export default styled(InputFieldAutoSubmit)``;
