import styled from "styled-components";
import React from "react";

const Window = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  background-color: ${(props) => props.theme.colors.contrast + "a0"};
  height: 100vh;
  width: 100vw;
  z-index: 3;
`;

const Wrapper = styled.div`
  z-index: 5;
  width: 100%;
  height: 100%;
  display: flex;
`;

export default function (Comp, options) {
  //console.log("Rendering Window");

  return (
    <Window
      aria-labelledby="closable"
      onClick={(evt) => {
        if (!evt.target.getAttribute("aria-labelledby")) return;
        options.onCancel(evt);
      }}
    >
      <Wrapper aria-labelledby="closable">
        <Comp {...options} />
      </Wrapper>
    </Window>
  );
}
