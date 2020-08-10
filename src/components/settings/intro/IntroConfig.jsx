import React from "react";
import { withFormik } from "formik";
import Form from "@/components/common/inputs/fields/Form";
import InputFieldAutoSubmit from "@/components/common/inputs/fields/InputFieldAutoSubmit";
import {
  updateApplicationConfig,
  getApplicationConfig,
} from "@/api/Configurations.api";
import SettingsBlockWrapper from "../common/SettingsBlockWrapper";

class IntroConfig extends React.Component {
  appId = "resume.anudeepchpaul.in";

  constructor(props) {
    super(props);

    this.state = {
      dataLoaded: false,
    };
  }

  setFieldValues(values) {
    const { setFieldValue } = this.props;

    setFieldValue("pageTitle", values.pageTitle || "");
    setFieldValue("introText", values.introText || "");
    setFieldValue("tagLines", values.tagLines || "");
    setFieldValue("experienceTagLine", values.experienceTagLine || "");
    setFieldValue("livingInTagLine", values.livingInTagLine || "");
  }

  componentDidMount() {
    getApplicationConfig()
      .then(({ applicationConfig }) => {
        this.setFieldValues(applicationConfig);
      })
      .finally(() => {
        this.setState({
          dataLoaded: true,
        });
      });
  }

  onSubmit(evt) {
    if (["Enter", "Tab"].indexOf(evt.key) === -1) {
      return;
    }

    const { values } = this.props;

    evt.target.blur();
    updateApplicationConfig({
      appId: this.appId,
      [evt.target.name]: values[evt.target.name],
    });
  }

  render() {
    const { values, handleChange } = this.props;

    const inputFieldMaps = {
      height: "3rem",
      width: "75%",
      whileHover: { width: "80%" },
    };

    return (
      <SettingsBlockWrapper
        dataLoaded={this.state.dataLoaded}
        title={"Introduction"}
      >
        <Form>
          <InputFieldAutoSubmit
            {...inputFieldMaps}
            placeholder={"Page Title"}
            name="pageTitle"
            value={values.pageTitle}
            onChange={handleChange}
            onKeyDown={(evt) => this.onSubmit(evt)}
          />
          <InputFieldAutoSubmit
            {...inputFieldMaps}
            placeholder={"Intro Text"}
            name="introText"
            value={values.introText}
            onChange={handleChange}
            onKeyDown={(evt) => this.onSubmit(evt)}
          />
          <InputFieldAutoSubmit
            {...inputFieldMaps}
            placeholder={"Tag Lines"}
            name="tagLines"
            value={values.tagLines}
            onChange={handleChange}
            onKeyDown={(evt) => this.onSubmit(evt)}
          />
          <InputFieldAutoSubmit
            {...inputFieldMaps}
            placeholder={"Experience Tagline"}
            name="experienceTagLine"
            value={values.experienceTagLine}
            onChange={handleChange}
            onKeyDown={(evt) => this.onSubmit(evt)}
          />
          <InputFieldAutoSubmit
            {...inputFieldMaps}
            placeholder={"Living-in Tagline"}
            name="livingInTagLine"
            value={values.livingInTagLine}
            onChange={handleChange}
            onKeyDown={(evt) => this.onSubmit(evt)}
          />
        </Form>
      </SettingsBlockWrapper>
    );
  }
}

export default withFormik({
  mapPropsToValues: () => ({
    pageTitle: "",
    introText: "",
    tagLines: "",
    experienceTagLine: "",
    livingInTagLine: "",
  }),
})(IntroConfig);
