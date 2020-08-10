import React from "react";
import styled from "styled-components";

const FormEl = styled.form`
  height: 100%;
  padding: 0.5rem;
`;

export default styled(function Form(props) {
  return <FormEl onSubmit={props.onSubmit}>{props.children}</FormEl>;
})``;
