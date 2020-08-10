import React from "react";
import styled from "styled-components";
import { newTask, getAllTasks, deleteTask } from "@/redux/Tasks.redux";
import { connect } from "react-redux";
import dynamic from "next/dynamic";
import SquaredButton from "@/components/common/inputs/buttons/SquaredButton";
import Window from "@/components/common/window/Window";

const TaskToolbarWrapper = styled.div`
  flex: 1 100%;
  display: flex;
  flex-direction: row;
  background-color: ${(props) => props.theme.colors.primaryShade};
  height: 4rem;
  border-radius: 3px;
`;

const ToolbarSlot = styled.div`
  flex: ${(props) => props.flex || "0"};
  display: flex;
  align-items: center;
  padding: ${(props) => (props.flex ? "0 1rem" : "0")};
`;

const PageBar = dynamic(() => import("./PageBar"));
const TaskDetails = dynamic(() => import("../TaskDetails"));

class TaskToolbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showPopup: false,
      page: {
        currentPage: 0,
        totalPage: 1,
        pageSize: 20,
      },
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.TODO.length !== prevProps.TODO.length) {
      this.togglePopup(false);
    }
  }

  togglePopup(value) {
    this.setState(() => ({
      showPopup: !!value,
    }));
  }

  handlePageChange(next) {
    this.setState(() => ({
      page: {
        ...this.state.page,
        currentPage: next
          ? this.state.page.currentPage + 1
          : this.state.page.currentPage - 1,
      },
    }));
  }

  render() {
    //console.log("Rendering TaskToolbar");
    return (
      <TaskToolbarWrapper>
        <ToolbarSlot flex={"1 100%"}>
          <SquaredButton
            backColor={"success"}
            color={"primary"}
            icon={"dash-icon-checklist-add"}
            margin={"0 1rem 0 0"}
            whileHover={{ scale: 1.25 }}
            whileTap={{ scale: 1.1 }}
            onClick={() => this.togglePopup(true)}
          />
          <SquaredButton
            backColor={"error"}
            color={"primary"}
            icon={"dash-icon-delete"}
            margin={"0rem"}
            disabled={!this.props.SELECTED.length}
            onClick={() => this.props.deleteTask(this.props.SELECTED)}
            badgeCount={this.props.SELECTED.length || null}
          />
          <PageBar
            {...this.state.page}
            total={this.props.total}
            onNextPage={() => {
              this.setState(() => ({
                page: {
                  ...this.state.page,
                  currentPage: this.state.page.currentPage + 1,
                },
              }));
            }}
          />
          <SquaredButton
            backColor={"info"}
            color={"primary"}
            icon={"dash-icon-loop"}
            whileHover={{ scale: 1.25 }}
            whileTap={{ scale: 1.1 }}
            margin={"0rem"}
            onClick={() => this.props.getAllTasks()}
          />
        </ToolbarSlot>
        {this.state.showPopup &&
          Window(TaskDetails, {
            onCancel: () => this.togglePopup(false),
            onSubmit: (values) => this.props.addNewTask(values),
          })}
      </TaskToolbarWrapper>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addNewTask: (task) => dispatch(newTask(task)),
  getAllTasks: (page, pageSize) => dispatch(getAllTasks(page, pageSize)),
  deleteTask: (selection) => dispatch(deleteTask(selection)),
});

const mapStateToProps = (state) => ({ ...state.tasks });

export default connect(mapStateToProps, mapDispatchToProps)(TaskToolbar);
