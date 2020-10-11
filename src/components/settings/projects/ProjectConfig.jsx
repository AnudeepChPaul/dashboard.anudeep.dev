import React from "react";
import { fireLoad } from "@/helpers/Loader";
import SettingsBlockWrapper from "../common/SettingsBlockWrapper";
import Form from "@/shared/components/inputs/fields/Form";
import Button from "@/shared/components/inputs/buttons/Button";
import { addOrUpdateCompany, deleteCompany } from "@/shared/api/Company.api";
import { connect } from "react-redux";
import { fetchAllProjects } from "@/redux/Projects.redux";
import ProjectDetails from "./ProjectDetails";

// const ExperienceDetails = dynamic(() => import("./ExperienceDetails"));

class ProjectConfig extends React.Component {
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
    Promise.all([this.props.fetchAllProjects()]).finally(() => {
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
    debugger;
    return (
      <SettingsBlockWrapper
        dataLoaded={this.state.dataLoaded}
        title={"Projects"}
      >
        <Button
          color="primary"
          backColor="success"
          type="button"
          margin={"1rem auto"}
          onClick={() => this.setState({ addingSkills: true })}
        >
          Add More Project(s)
        </Button>
        <Form>
          {this.state.addingSkills && (
            <ProjectDetails
              onSubmit={this.onSubmit}
              onCancel={() => {
                this.setState({
                  addingSkills: false,
                });
              }}
            />
          )}
        </Form>
        {/* {this.state.companies.map((comp, index) => (
          <ExperienceDetails
            readOnly={true}
            key={comp.companyId}
            onSubmit={this.onSubmit}
            onDelete={this.onDelete}
            experience={{ ...comp }}
          />
        ))} */}
      </SettingsBlockWrapper>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchAllProjects: () => dispatch(fetchAllProjects()),
});

export default connect(null, mapDispatchToProps)(ProjectConfig);
