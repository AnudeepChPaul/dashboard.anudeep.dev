import React from "react";
import styled from "styled-components";
import Button from "@/components/common/inputs/buttons/Button";
import PlainTextButton from "@/components/common/inputs/buttons/PlainTextButton";

const SettingsHeaderWrapper = styled.h5`
  height: 2.5rem;
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0px;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.contrast};
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 1rem;
  border-radius: 3px 3px 0px 0px;

  span {
    font-size: 1.5rem;
    font-weight: 300;
  }

  ${Button} {
    width: 4rem;
    font-size: 1rem;
  }
`;

const SettingsHeader = (props) => {
  return (
    <SettingsHeaderWrapper>
      {/* <PlainTextButton
        onClick={props.onCancel}
        text={"Reset"}
        color={"primary"}
      /> */}
      <span>{props.title}</span>
      {/* <Button
        backColor={"success"}
        color={"primary"}
        onClick={props.onSave}
        type="submit"
      >
        Save
      </Button> */}
    </SettingsHeaderWrapper>
  );
};

export default styled(SettingsHeader)``;
