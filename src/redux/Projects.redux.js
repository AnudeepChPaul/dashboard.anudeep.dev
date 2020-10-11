import { uniqueId } from "@/helpers/Helper";
import { start, done } from "nprogress";
import { getAllProjects } from "@/shared/api/Projects.api";

const FETCH_ALL_PROJECTS = "FETCH_ALL_PROJECTS",
  UPDATE_PROJECT = "UPDATE_PROJECT",
  REMOVE_PROJECTS = "REMOVE_PROJECTS";

export const initialProjectsState = {
  projects: [],
  total: null,
};

export const fetchAllProjects = () => async (dispatch) => {
  start();
  const response = await getAllProjects();
  dispatch({
    type: FETCH_ALL_PROJECTS,
    projects: response.projects,
  });
  done();
};

export const projectsReducer = (state = initialProjectsState, action) => {
  switch (action.type) {
    case FETCH_ALL_PROJECTS:
      debugger;
      return Object.assign({}, state, {
        projects: action.projects,
      });
    default:
      return state;
  }
};
