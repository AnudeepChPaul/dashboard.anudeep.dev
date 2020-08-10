import styled from "styled-components";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";

const MotionInput = styled(motion.input)`
  width: ${(props) => props.width || "9rem"};
  height: ${(props) => props.height || "2rem"};
  margin: ${(props) => props.margin || 0};
  color: ${(props) => props.theme.colors.secondary};
  background-color: transparent;
  border: none;
  border-bottom: 2px solid ${(props) => props.theme.colors.secondary};
  outline: none;
  border-radius: 0px !important;
  font-size: 1rem;
  text-overflow: ellipsis;
`;

const Label = styled.label``;

const InputField = (props) => {
  //console.log("Rendering InputField");
  const ref = useRef();

  useEffect(() => {
    if (!props.focus) return;
    if (props.type !== "radio") {
      ref.current.focus();
    }
  }, [ref]);

  switch (props.type) {
    case "radio":
      return (
        <>
          <Label
            htmlFor={props.id}
            width={props.width}
            height={props.height}
            margin={props.margin}
          >
            {props.label}
            <MotionInput {...props} whileHover={null} />
          </Label>
        </>
      );
      return;

    default:
      const { type, ...rest } = props;
      return <MotionInput ref={ref} type={type || "text"} {...rest} />;
  }
};

export default styled(InputField)``;
