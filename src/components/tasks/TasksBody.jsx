import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TaskSlot from "./slot/TaskSlot";
import { TASK_TYPES, getAllTasks } from "@/redux/Tasks.redux";
import { connect } from "react-redux";
import { MUTABLE_STATES } from "@/helpers/Workflow";

const TaskBodyWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex: 1 33%;
  margin: 0;
  margin-top: 1rem;
  overflow: hidden;
`;

const TaskBody = function (props) {
  //console.log("Rendering TaskBody");

  useEffect(() => {
    props.fetchAllTasks();
  });

  return (
    <TaskBodyWrapper>
      {[
        { header: "Todo", type: MUTABLE_STATES.TODO },
        { header: "In Progress", type: MUTABLE_STATES.IN_PROGRESS },
        { header: "Done", type: MUTABLE_STATES.DONE },
      ].map((el, indx) => (
        <TaskSlot key={indx} {...el} />
      ))}
    </TaskBodyWrapper>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchAllTasks: () => dispatch(getAllTasks()),
});

export default connect(null, mapDispatchToProps)(TaskBody);
