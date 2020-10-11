import React from "react";
import styled from "styled-components";
import { withFormik } from "formik";
import Button from "@/shared/components/inputs/buttons/Button";
import InputField from "@/shared/components/inputs/fields/InputField";
import PlainTextButton from "@/shared/components/inputs/buttons/PlainTextButton";
import { getThinZoomAnimation } from "@/helpers/Themes";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 2.5rem;
  margin: 0 2rem 2rem;
  background-color: ${(props) => props.theme.colors.primary};
`;
const FormWrapper = styled(Wrapper)`
  flex: 1;
  justify-content: center;
  flex-direction: column;
  padding: 0;
  margin: 0;
`;
const SideWrap = styled(FormWrapper)`
  width: 6.5rem;
  align-content: flex-end;
  flex-direction: column;
  padding: 0;
  margin: 0;

  ${PlainTextButton} {
    margin: 1rem 0;
  }
`;

const ActionBar = styled(Wrapper)`
  flex: 1;
  width: 75%;
  justify-content: space-between;
  padding: 1rem;
  margin: 0 2rem;
`;

class ProjectDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      readOnly: this.props.readOnly,
      editing: true,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }

  onSubmit() {
    debugger;
    this.props.onSubmit(this.props.values);
    if (this.props.readOnly && !this.state.readOnly) {
      this.setState({
        readOnly: true,
      });
    }
  }

  onEdit() {
    this.setState({
      readOnly: false,
    });
  }

  onCancel() {
    if (this.props.readOnly && !this.state.readOnly) {
      return this.setState({
        readOnly: true,
        editing: false,
      });
    }
    this.props.onCancel();
  }

  componentDidMount() {
    if (!this.props.experience) {
      return;
    }
    const { setFieldValue } = this.props;

    // setFieldValue("projectId", this.props.experience.projectId || "");
    // setFieldValue("projectName", this.props.experience.projectName || "");
    // setFieldValue("description", this.props.experience.description || "");
    // setFieldValue("myRole", this.props.experience.myRole || "");
  }

  render() {
    const { values, handleChange } = this.props;

    const { readOnly } = this.state;

    const inputFieldMaps = {
      height: "3rem",
      width: "95%",
      whileHover: readOnly ? null : getThinZoomAnimation(),
    };

    return (
      <Wrapper>
        <FormWrapper>
          <InputField
            {...inputFieldMaps}
            placeholder={"Project Name"}
            name="projectName"
            value={values.projectName}
            onChange={handleChange}
            disabled={readOnly}
          />
          <InputField
            {...inputFieldMaps}
            placeholder={"Description"}
            name="description"
            value={values.description}
            onChange={handleChange}
            disabled={readOnly}
          />
          <InputField
            {...inputFieldMaps}
            placeholder={"My Role"}
            name="myRole"
            value={values.myRole}
            onChange={handleChange}
            disabled={readOnly}
          />
          {!readOnly && (
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
                {this.props.readOnly && !this.state.readOnly
                  ? "Update"
                  : "Add More"}
              </Button>
            </ActionBar>
          )}
        </FormWrapper>

        {readOnly && (
          <SideWrap>
            <PlainTextButton
              type="button"
              onClick={this.onEdit}
              text={"Edit"}
            />
            <PlainTextButton
              type="button"
              onDoubleClick={() => this.props.onDelete(this.props.values)}
              text={"Delete"}
            />
          </SideWrap>
        )}
      </Wrapper>
    );
  }
}

export default withFormik({
  enableReinitialize: true,
  mapPropsToValues: () => ({
    projectId: "",
    projectName: "",
    description: "",
    myRole: "",
  }),
})(ProjectDetails);
