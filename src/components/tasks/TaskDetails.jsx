import styled from "styled-components";
import { motion } from "framer-motion";
import React from "react";
import { withFormik } from "formik";
import dynamic from "next/dynamic";
import { MUTABLE_STATES } from "@/helpers/Workflow";

const Task = styled(motion.div)`
  background-color: ${(props) =>
    props.theme.colors[props.backColor] || props.theme.colors.primary};
  color: ${(props) => props.theme.colors.contrast};
  height: 25rem;
  width: 50rem;
  padding: 1rem;
  display: flex;
  flex-flow: column wrap;
  margin: auto;
`;

const TaskHeader = styled.h2`
  color: ${(props) => props.theme.colors.secondary};
  padding: 1rem;
  margin: 0 auto 1rem;
`;

const TaskBody = styled.div`
  flex: 1;
  margin: 0 auto;
  width: calc(100% - 2rem);
`;

const TaskActionBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
  // bottom: -6rem;
`;

const Spacer = styled.label`
  flex: 1;
`;

const Form = dynamic(() => import("@/shared/components/inputs/fields/Form"));
const InputField = dynamic(() =>
  import("@/shared/components/inputs/fields/InputField")
);
const TextArea = dynamic(() =>
  import("@/shared/components/inputs/fields/TextArea")
);
const Fieldset = dynamic(() =>
  import("@/shared/components/inputs/fields/FieldSet")
);
const SquaredButton = dynamic(() =>
  import("@/shared/components/inputs/buttons/SquaredButton")
);

const TaskDetails = function (props) {
  //console.log("Rendering TaskDetails");

  const { values, handleChange, handleBlur, handleSubmit } = props;

  return (
    <Task initial={{ y: "+50%", opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
      <TaskHeader>Task Details</TaskHeader>
      <TaskBody>
        <Form onSubmit={handleSubmit}>
          <InputField
            placeholder={"Title"}
            height={"2.5rem"}
            width={"75%"}
            whileHover={{ width: "80%" }}
            margin={"0 0 1rem"}
            name="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            focus={true}
          />
          <TextArea
            placeholder={"Description"}
            height={"8rem"}
            width={"75%"}
            whileHover={{ width: "80%" }}
            margin={"0 0 1rem"}
            type={"textarea"}
            name="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Fieldset name="priority" id="priority">
            <legend>Task Priority</legend>
            <InputField
              label={"P1"}
              height={"2rem"}
              width="1rem"
              whileHover={{ width: "2rem" }}
              margin={"0 1.5rem 0 0.5rem"}
              type={"radio"}
              name="priority"
              value={"p1"}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <InputField
              label={"P2"}
              height={"2rem"}
              width="1rem"
              whileHover={{ width: "2rem" }}
              margin={"0 1.5rem 0 0.5rem"}
              type={"radio"}
              name="priority"
              value={"p2"}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <InputField
              label={"P3"}
              height={"2rem"}
              width="1rem"
              whileHover={{ width: "2rem" }}
              margin={"0 1.5rem 0 0.5rem"}
              type={"radio"}
              name="priority"
              value={"p3"}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <InputField
              label={"P4"}
              height={"2rem"}
              width="1rem"
              whileHover={{ width: "2rem" }}
              margin={"0 0 0 0.5rem"}
              type={"radio"}
              name="priority"
              value={"p4"}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Fieldset>
        </Form>
      </TaskBody>
      <TaskActionBar>
        <Spacer />
        <SquaredButton
          icon={"dash-icon-clear"}
          color={"primary"}
          backColor={"error"}
          onClick={props.onCancel}
        />
        <SquaredButton
          icon={"dash-icon-done"}
          color={"primary"}
          backColor={"success"}
          onClick={props.handleSubmit}
        />
      </TaskActionBar>
    </Task>
  );
};

export default withFormik({
  mapPropsToValues: () => ({
    title: "",
    description: "",
    priority: "",
    type: MUTABLE_STATES.TODO,
  }),

  validate: () => {
    const errors = {};
    return errors;
  },

  handleSubmit: (values, { setSubmitting, props }) => {
    setSubmitting(false);
    props.onSubmit(values);
  },
})(TaskDetails);
