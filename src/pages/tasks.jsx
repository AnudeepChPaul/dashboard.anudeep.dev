import React from "react";
import styled from "styled-components";
import TaskToolbar from "@/components/tasks/toolbar/TaskToolbar";
import MenuLayout from "@/commons/layout/MenuLayout";
import dynamic from "next/dynamic";

const TaskWrapper = styled.div`
  display: block;
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.primary};
`;

const TaskBody = dynamic(() => import("@/components/tasks/TasksBody"));

export default function Tasks() {
  //console.log("Rendering Tasks");

  return (
    <MenuLayout title="Dashboard | Tasks">
      <TaskWrapper>
        <TaskToolbar />
        <TaskBody />
      </TaskWrapper>
    </MenuLayout>
  );
}
