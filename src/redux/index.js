import { combineReducers } from "redux";
import { taskReducer, initialTaskState } from "./Tasks.redux";
import { projectsReducer, initialProjectsState } from "./Projects.redux";

const root = combineReducers({
  tasks: taskReducer,
  projects: projectsReducer,
});

export const rootState = {
  tasks: initialTaskState,
  projects: initialProjectsState,
};

export default root;
