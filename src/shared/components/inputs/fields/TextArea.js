import styled from "styled-components";
import { motion } from "framer-motion";

const MotionInput = styled(motion.textarea)`
  width: ${(props) => props.width || "9rem"};
  height: ${(props) => props.height || "4rem"};
  margin: ${(props) => props.margin || 0};
  background-color: transparent;
  border: none;
  border-bottom: 2px solid ${(props) => props.theme.colors.secondary};
  outline: none;
  color: ${(props) => props.theme.colors.secondary};

  resize: vertical;
`;

const TextArea = (props) => {
  //console.log("Rendering TextArea");

  const { type, ...rest } = props;
  return <MotionInput type={type || "text"} {...rest} />;
};

export default TextArea;
