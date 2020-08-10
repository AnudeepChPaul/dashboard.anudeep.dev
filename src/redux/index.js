import { combineReducers } from "redux";
import { taskReducer, initialTaskState } from "./Tasks.redux";


const root = combineReducers({
  tasks: taskReducer
});

export const rootState = {
  tasks: initialTaskState
};

export default root