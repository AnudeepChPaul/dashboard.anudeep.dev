import React from "react";
import styled from "styled-components";
import DashHeader from "@/components/dashboard/toolbar/Header";
import Button from "@/shared/components/inputs/buttons/Button";
import SquaredButton from "@/shared/components/inputs/buttons/SquaredButton";

const ToolbarWrapper = styled.div`
  display: flex;
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.primaryShade};
  margin-bottom: 1rem;
`;

const ButtonGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;

  button {
    // margin-left: 1rem;
  }
`;

const DashTool = (props) => {
  //console.log("Rendering DashTool");
  return (
    <ToolbarWrapper>
      <DashHeader />
      <ButtonGroup>
        <SquaredButton
          color={"secondary"}
          backColor={"transparent"}
          style={{ marginRight: "1rem" }}
          icon={"dash-icon-loop"}
          fontSize={"1.1rem"}
        />
        <Button
          color={"primary"}
          backColor={"info"}
          style={{ marginRight: "1rem" }}
        >
          {"Today"}
        </Button>
      </ButtonGroup>
    </ToolbarWrapper>
  );
};

export default DashTool;
