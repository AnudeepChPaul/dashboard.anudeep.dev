import React from "react";
import styled from "styled-components";
import { withFormik } from "formik";
import Button from "@/components/common/inputs/buttons/Button";
import InputField from "@/components/common/inputs/fields/InputField";
import PlainTextButton from "@/components/common/inputs/buttons/PlainTextButton";

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
const SideWrap = styled(Wrapper)`
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

class ExperienceDetails extends React.Component {
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
    this.props.onSubmit(this.props.values);
    if (this.props.readOnly && !this.state.readOnly) {
      this.setState({
        readOnly: true,
      });
    }

    // Object.keys(this.props.values).forEach(
    //   (key) => (this.props.values[key] = "")
    // );
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

    setFieldValue("companyId", this.props.experience.companyId || "NA");
    setFieldValue("companyName", this.props.experience.companyName || "NA");
    setFieldValue("duration", this.props.experience.duration || "NA");
    setFieldValue("designation", this.props.experience.designation || "NA");
    setFieldValue("technologies", this.props.experience.technologies || "");
  }

  render() {
    const { values, handleChange } = this.props;

    const { readOnly } = this.state;

    const inputFieldMaps = {
      height: "3rem",
      width: "95%",
      whileHover: readOnly ? null : { scale: 1.1 },
    };

    return (
      <Wrapper>
        {/* <SideWrap /> */}
        <FormWrapper>
          <InputField
            {...inputFieldMaps}
            placeholder={"Company Name"}
            name="companyName"
            value={values.companyName}
            onChange={handleChange}
            disabled={readOnly}
            focus={true}
          />
          <InputField
            {...inputFieldMaps}
            placeholder={"Duration"}
            name="duration"
            value={values.duration}
            onChange={handleChange}
            disabled={readOnly}
          />
          <InputField
            {...inputFieldMaps}
            placeholder={"Designation"}
            name="designation"
            value={values.designation}
            onChange={handleChange}
            disabled={readOnly}
          />
          <InputField
            {...inputFieldMaps}
            placeholder={"Technologies"}
            name="technologies"
            value={values.technologies}
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
    companyName: "",
    duration: "",
    designation: "",
    technologies: "",
  }),
})(ExperienceDetails);
