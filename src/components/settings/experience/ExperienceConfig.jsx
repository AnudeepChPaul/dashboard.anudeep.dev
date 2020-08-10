import React from "react";
import { withFormik } from "formik";
import { fireLoad } from "@/helpers/Loader";
import SettingsBlockWrapper from "../common/SettingsBlockWrapper";
import Form from "@/components/common/inputs/fields/Form";
import Button from "@/components/common/inputs/buttons/Button";
import {
  getCompanies,
  addOrUpdateCompany,
  deleteCompany,
} from "@/api/Company.api";
import dynamic from "next/dynamic";

const ExperienceDetails = dynamic(() => import("./ExperienceDetails"));

class ExperienceConfig extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      companies: [],
      dataLoaded: false,
      addingSkills: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    fireLoad();
    Promise.all([
      getCompanies().then((response) => {
        return this.setState({
          companies: [...response.companies],
        });
      }),
    ]).finally(() => {
      fireLoad(true);
      this.setState({
        dataLoaded: true,
      });
    });
  }

  onSubmit(values) {
    fireLoad();
    return addOrUpdateCompany({
      companies: [values],
    }).then((response) => {
      fireLoad(true);
      return this.setState({
        companies: [...response.companies],
      });
    });
  }

  onDelete(experience) {
    fireLoad();
    return deleteCompany([experience]).then((response) => {
      console.log(JSON.stringify(response));
      this.setState({
        companies: [...response.companies],
      });
      return fireLoad(true);
    });
  }

  render() {
    return (
      <SettingsBlockWrapper
        dataLoaded={this.state.dataLoaded}
        title={"Experience"}
      >
        <Button
          color="primary"
          backColor="success"
          type="button"
          margin={"1rem auto"}
          onClick={() => this.setState({ addingSkills: true })}
        >
          Add More Experience
        </Button>
        <Form>
          {this.state.addingSkills && (
            <ExperienceDetails
              onSubmit={this.onSubmit}
              onCancel={() => {
                this.setState({
                  addingSkills: false,
                });
              }}
            />
          )}
        </Form>
        {this.state.companies.map((comp, index) => (
          <ExperienceDetails
            readOnly={true}
            key={comp.companyId}
            onSubmit={this.onSubmit}
            onDelete={this.onDelete}
            experience={{ ...comp }}
          />
        ))}
      </SettingsBlockWrapper>
    );
  }
}

export default withFormik({
  mapPropsToValues: () => ({
    skillsHeader: "",
  }),
})(ExperienceConfig);
