import React from "react";
import styled from "styled-components";

const SetEl = styled.div`
  border-width: 1px;
  border-style: solid;
  padding: 0.5rem;
  border-color: transparent;

  label,
  input {
    vertical-align: middle;
  }
`;

export default function Fieldset(props) {
  //console.log("Rendering Fieldset");
  const { children, ...rest } = props;

  return <SetEl {...rest}>{children}</SetEl>;
}
//   return (
//     <SetEl >
//       <Fieldset_ {...rest}>{children}</Fieldset_>
//     </SetEl>
//   );
// }
