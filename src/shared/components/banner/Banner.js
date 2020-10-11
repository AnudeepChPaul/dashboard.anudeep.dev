import React from "react";
import styled from "styled-components";

const BannerHeaderWrapper = styled.h1`
  font-size: 0.85rem;
  margin-block-start: 0px;
  margin-block-end: 0px;
  * {
    user-select: none;
  }
`;
const BannerHeaderBody = styled.div``;

export default styled((props) => {
  return (
    <BannerHeaderWrapper>
      <BannerHeaderBody>{props.children}</BannerHeaderBody>
    </BannerHeaderWrapper>
  );
})``;
