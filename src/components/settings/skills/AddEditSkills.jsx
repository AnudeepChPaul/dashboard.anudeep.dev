import React from "react";
import styled from "styled-components";
import { withFormik } from "formik";
import Button from "@/components/common/inputs/buttons/Button";
import InputField from "@/components/common/inputs/fields/InputField";
import PlainTextButton from "@/components/common/inputs/buttons/PlainTextButton";

const AddEditSkillsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`;

const ActionBar = styled.div`
  flex: 1;
  width: 75%;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`;

class AddEditSkills extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  onSubmit() {
    this.props.onSubmit(this.props.values);
    Object.keys(this.props.values).forEach(
      (key) => (this.props.values[key] = "")
    );
  }

  onCancel() {
    this.props.onCancel();
  }

  render() {
    const { values, handleChange, handleBlur } = this.props;

    const inputFieldMaps = {
      height: "3rem",
      width: "75%",
      whileHover: { width: "80%" },
    };

    return (
      <AddEditSkillsWrapper>
        <InputField
          {...inputFieldMaps}
          placeholder={"Technology ID"}
          name="techId"
          value={values.techId}
          onChange={handleChange}
          focus={true}
        />
        <InputField
          {...inputFieldMaps}
          placeholder={"Display As"}
          name="name"
          value={values.name}
          onChange={handleChange}
        />
        <InputField
          {...inputFieldMaps}
          placeholder={"Rating"}
          name="rating"
          value={values.rating}
          onChange={handleChange}
        />
        <ActionBar>
          <PlainTextButton
            type="button"
            onClick={this.onCancel}
            text={"Cancel"}
          />
          <Button
            color="primary"
            backColor="success"
            type="button"
            onClick={this.onSubmit}
          >
            Add More
          </Button>
        </ActionBar>
      </AddEditSkillsWrapper>
    );
  }
}

export default withFormik({
  mapPropsToValues: () => ({
    techId: "",
    name: "",
    rating: "",
  }),
})(AddEditSkills);
