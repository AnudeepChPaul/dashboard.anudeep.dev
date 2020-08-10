import React from "react";
import { withFormik } from "formik";
import dynamic from "next/dynamic";
import {
  updateApplicationConfig,
  getApplicationConfig,
} from "@/api/Configurations.api";
import Button from "@/components/common/inputs/buttons/Button";
import InputFieldAutoSubmit from "@/components/common/inputs/fields/InputFieldAutoSubmit";
import SkillsDisplay from "./SkillDisplay";
import SettingsBlockWrapper from "../common/SettingsBlockWrapper";
import { getSkills, updateSkillsConfig, deleteSkills } from "@/api/Skills.api";
import Form from "@/components/common/inputs/fields/Form";
import { fireLoad } from "@/helpers/Loader";

const AddEditSkills = dynamic(() => import("./AddEditSkills"));

class SkillsConfig extends React.Component {
  appId = "resume.anudeepchpaul.in";

  constructor(props) {
    super(props);

    this.updateConfig = this.updateConfig.bind(this);

    this.state = {
      skillsHeader: "",
      technologies: [],
      addingSkills: false,
      dataLoaded: false,
    };
  }

  componentDidMount() {
    fireLoad();
    Promise.all([
      getApplicationConfig("skillsHeader").then(({ applicationConfig }) => {
        const { setFieldValue } = this.props;
        setFieldValue("skillsHeader", applicationConfig.skillsHeader);
      }),
      getSkills().then((data) => {
        this.setState({
          technologies: [...data.technologies],
        });
      }),
    ]).finally(() => {
      fireLoad(true);
      this.setState({
        dataLoaded: true,
      });
    });
  }

  addSkill(skill) {
    fireLoad();
    debugger;
    return updateSkillsConfig({
      skills: [
        ...this.state.technologies,
        { ...skill, rank: skill.rank || this.state.technologies.length + 1 },
      ],
    }).then((data) => {
      this.setState({
        technologies: [...data.technologies],
      });
      fireLoad(true);
    });
  }

  deleteSkill(skill) {
    fireLoad();
    deleteSkills([skill]).then(() => {
      const techList = this.state.technologies.concat(),
        foundIndex = techList.findIndex((el) => el.techId === skill.techId);

      if (foundIndex === -1) return;

      techList.splice(foundIndex, 1);
      this.setState({
        technologies: [
          ...techList.map((tech, index) => ({
            ...tech,
            order: index + 1,
          })),
        ],
      });
      fireLoad(true);
    });
  }

  updateConfig(evt) {
    if (evt) {
      if (["Enter", "Tab"].indexOf(evt.key) === -1) {
        return;
      }

      evt.preventDefault();
      evt.target.blur();
    }

    fireLoad();
    return updateApplicationConfig({
      skillsHeader: this.props.values.skillsHeader,
    }).finally(() => {
      fireLoad(true);
    });
  }

  render() {
    const { values, handleChange } = this.props,
      inputFieldMaps = {
        height: "3rem",
        width: "75%",
        whileHover: { width: "80%" },
      };

    return (
      <SettingsBlockWrapper dataLoaded={this.state.dataLoaded} title={"Skills"}>
        <Form>
          <InputFieldAutoSubmit
            {...inputFieldMaps}
            placeholder={"Skills Header"}
            name="skillsHeader"
            value={values.skillsHeader}
            onChange={handleChange}
            onKeyDown={(evt) => this.updateConfig(evt)}
          />
          <br />
          {this.state.technologies.map((tech) => (
            <SkillsDisplay
              key={tech.techId}
              tech={tech}
              onDelete={() => this.deleteSkill(tech)}
            />
          ))}
          <Button
            color="primary"
            backColor="warning"
            type="button"
            margin={"1rem auto"}
            onClick={() => this.setState({ addingSkills: true })}
          >
            Add Skill
          </Button>
          {this.state.addingSkills && (
            <AddEditSkills
              onCancel={() => {
                this.setState({ addingSkills: false });
              }}
              onSubmit={(values) => {
                this.addSkill(values);
              }}
            />
          )}
        </Form>
      </SettingsBlockWrapper>
    );
  }
}

export default withFormik({
  mapPropsToValues: () => ({
    skillsHeader: "",
  }),
})(SkillsConfig);
