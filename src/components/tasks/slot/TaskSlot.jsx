import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { nextState } from "@/helpers/Workflow";
import { updateTask, selectTask, selectAllTasks } from "@/redux/Tasks.redux";
import SquaredButton from "../../common/inputs/buttons/SquaredButton";
import dynamic from "next/dynamic";

const TaskSlotWrapper = styled.div`
  flex: 1 33%;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.transparent};
  height: 100%;
  margin: 0 0.5rem;
  border-radius: 3px;
  max-width: 33%;
`;

const TaskSlotHeader = styled.h4`
  margin: 0 auto;
  font-weight: 300;
  padding: 0.5rem 0;
  background-color: ${(props) => props.theme.colors.primaryShade};
  width: 100%;
  border-radius: 3px;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    flex: 1;
    margin-right: 2rem;
  }

  button {
    margin-right: 0px;
    position: sticky;
    left: 0px;
  }
`;

const TaskSlotBody = styled.ul`
  flex: 1;
  list-style: none;
  padding: 0 0.5rem;
  margin: 0;
  background-color: ${(props) => props.theme.colors.primaryShade};
  border-radius: 3px;
`;

const TaskCard = dynamic(() => import("@/components/tasks/slot/TaskCard"));

const TaskSlot = function (props) {
  const tasks = props[props.type];

  const currentSlotSelectedTask = props.SELECTED.filter(
    (el) => el.type === props.type
  );

  const isAllSelected =
    tasks.length && currentSlotSelectedTask.length === tasks.length;

  const [allSelect, setAllSelect] = useState(false);

  useEffect(() => {
    if (!isAllSelected && !currentSlotSelectedTask.length && allSelect) {
      setAllSelect(false);
    }
  }, [isAllSelected]);

  return (
    <TaskSlotWrapper>
      <TaskSlotHeader>
        <SquaredButton
          icon={
            isAllSelected
              ? "dash-icon-check_box"
              : "dash-icon-check_box_outline_blank"
          }
          color={"secondary"}
          backColor={"transparent"}
          onClick={() => {
            props.selectAllTasks(props[props.type], !allSelect);
            setAllSelect(!allSelect);
          }}
        />
        <span>{props.header}</span>
      </TaskSlotHeader>
      <TaskSlotBody>
        {tasks &&
          tasks.map((task, index) => (
            <TaskCard
              key={index}
              task={task}
              selected={
                props.SELECTED.findIndex((el) => el.taskId === task.taskId) !==
                -1
              }
              backColor={"infoLight"}
              onAccept={() => props.updateTask(task)}
              onReject={() => props.updateTask(task, true)}
              onSelect={() => props.selectTask(task)}
            />
          ))}
      </TaskSlotBody>
    </TaskSlotWrapper>
  );
};

const mapStateToProps = (state) => ({
  ...state.tasks,
});

const mapDispatchToProps = (dispatch) => ({
  updateTask: (task, prev) => dispatch(updateTask(task, prev)),
  selectTask: (task, prev) => dispatch(selectTask(task, prev)),
  selectAllTasks: (task, shouldSelect) =>
    dispatch(selectAllTasks(task, shouldSelect)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskSlot);
