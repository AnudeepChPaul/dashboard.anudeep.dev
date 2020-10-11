import styled from "styled-components";
import { motion } from "framer-motion";
import React from "react";
import SquaredButton from "../../../shared/components/inputs/buttons/SquaredButton";
import { MUTABLE_STATES } from "@/helpers/Workflow";

const Task = styled(motion.li)`
  background-color: ${(props) => props.theme.colors.primaryShade};
  color: ${(props) => props.theme.colors.secondary};
  border-left: 9px solid ${(props) => props.theme.colors[props.backColor]};
  min-height: 9rem;
  max-height: 16rem;
  flex: 1 33%;
  margin: 0.5rem 0;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  flex-direction: column;
  border-radius: 0px;
`;

const TaskHeader = styled.h5`
  color: ${(props) => props.theme.colors.secondary};
  margin: 0 auto;
  font-weight: 400;
  font-size: 0.9rem;
  width: 100%;
  word-break: break-word;
  max-height: 12rem;
  overflow: scroll;
  min-height: 4rem;
  display: flex;
  align-items: center;

  span {
    flex: 1;
    margin-right: 2rem;
    width: 100%;
    font-weight: inherit;
    font-size: inherit;
    width: inherit;
    word-break: inherit;
    max-height: inherit;
    overflow: inherit;
  }
`;

const TaskActionBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Spacer = styled.label`
  flex: 1;
`;

const TasksDescription = styled.div`
  flex: 1;
  overflow: scroll;
  font-size: 0.85rem;
  margin: 1rem 0.5rem 0;
  color: ${(props) => props.theme.colors.secondary};
`;

const TaskCard = (props) => {
  //console.log("Rendering TaskCard");

  let backColor;
  let acceptIcon;
  let rejectIcon;
  switch (props.task.type) {
    case MUTABLE_STATES.TODO:
      backColor = "info";
      acceptIcon = "dash-icon-checklist-start";
      rejectIcon = "";
      break;
    case MUTABLE_STATES.IN_PROGRESS:
      backColor = "warning";
      acceptIcon = "dash-icon-checklist-done";
      rejectIcon = "dash-icon-undo";
      break;
    case MUTABLE_STATES.DONE:
      backColor = "success";
      acceptIcon = "";
      rejectIcon = "dash-icon-undo";
      break;
  }

  return (
    <Task
      whileHover={{ scale: 1.05 }}
      initial={{ y: "+50%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      backColor={backColor}
    >
      <TaskHeader>
        <SquaredButton
          icon={
            props.selected
              ? "dash-icon-check_box"
              : "dash-icon-check_box_outline_blank"
          }
          color={"secondary"}
          backColor={"transparent"}
          onClick={() => props.onSelect(props.task)}
        ></SquaredButton>
        {props.task.title}
      </TaskHeader>
      <TasksDescription>{props.task.description}</TasksDescription>
      <TaskActionBar>
        {rejectIcon && (
          <SquaredButton
            icon={rejectIcon}
            color={"error"}
            backColor={"transparent"}
            onClick={() => props.onReject()}
            fontSize={"1.4rem"}
          />
        )}
        <Spacer />
        {acceptIcon && (
          <SquaredButton
            icon={acceptIcon}
            color={"error"}
            backColor={"transparent"}
            onClick={() => props.onAccept()}
          />
        )}
      </TaskActionBar>
    </Task>
  );
};

export default styled(TaskCard)``;
