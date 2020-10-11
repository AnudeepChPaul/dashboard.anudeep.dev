import { MUTABLE_STATES } from "@/helpers/Workflow";
import {
  postNewTask,
  getExistingTasks,
  putUpdatedTask,
  deleteExistingTasks,
} from "@/shared/api/Tasks.api";
import { uniqueId } from "@/helpers/Helper";
import { start, done } from "nprogress";

const ALL_TASKS = "ALL_TASKS",
  TASK_CREATE = "TASK_CREATE",
  TASK_UPDATE_PREV_STATE = "TASK_UPDATE_PREV_STATE",
  TASK_UPDATE_NEXT_STATE = "TASK_UPDATE_NEXT_STATE",
  TASK_SELECT = "TASK_SELECT",
  TASK_FORCE_SELECT = "TASK_FORCE_SELECT",
  TASK_FORCE_DESELECT = "TASK_FORCE_DESELECT",
  TASK_DELETE = "TASK_DELETE";

export const getAllTasks = (page, pageSize) => async (dispatch) => {
  start();
  try {
    const tasks = await getExistingTasks(page, pageSize);
    dispatch({
      type: ALL_TASKS,
      ...tasks,
    });
  } catch (error) {}
  done();
};

export const newTask = (task) => async (dispatch) => {
  start();
  const savedTask = await postNewTask({
    ...task,
    taskId: uniqueId(),
  });

  dispatch({
    type: TASK_CREATE,
    tasks: {
      ...savedTask.tasks[0],
    },
  });
  done();
};

export const updateTask = (tobeUpdatedTask, prev) => async (dispatch) => {
  start();
  const tasks = await putUpdatedTask({
    ...tobeUpdatedTask,
    workflowDirection: prev ? "PREV" : "NEXT",
  });

  const dispatchPayload = {
    ...tasks.tasks[0],
  };

  dispatch({
    type: prev ? TASK_UPDATE_PREV_STATE : TASK_UPDATE_NEXT_STATE,
    task: dispatchPayload,
    oldTask: tobeUpdatedTask,
  });
  done();
};

export const selectAllTasks = (tasks, select) => (dispatch) => {
  dispatch({
    type: select ? TASK_FORCE_SELECT : TASK_FORCE_DESELECT,
    task: tasks,
  });
};

export const selectTask = (task, all) => (dispatch) => {
  dispatch({
    type: TASK_SELECT,
    task: task instanceof Array ? task : [task],
  });
};

export const deleteTask = (taskIds) => async (dispatch) => {
  start();
  await deleteExistingTasks(taskIds);
  const dispatchPayload = [...taskIds];
  dispatch({
    type: TASK_DELETE,
    tasks: dispatchPayload,
  });
  done();
};

export const initialTaskState = {
  TODO: [],
  IN_PROGRESS: [],
  DONE: [],
  SELECTED: [],
  IS_FETCHING: false,
  total: null,
};

const updateTaskState = (state, task, oldTask) => {
  const oldTasks = state[oldTask.type];
  const newTasks = state[task.type];

  oldTasks.splice(
    oldTasks.findIndex((el) => el.taskId === oldTask.taskId),
    1
  );

  newTasks.unshift({
    ...task,
  });

  return Object.assign({}, state, {
    ...state,
    [oldTasks.type]: [...oldTasks],
    [task.type]: [...newTasks],
    IS_FETCHING: false,
  });
};

export const taskReducer = (state = initialTaskState, action) => {
  switch (action.type) {
    case ALL_TASKS:
      return Object.assign({}, state, {
        TODO: [...action.tasks.filter((el) => el.type === MUTABLE_STATES.TODO)],
        IN_PROGRESS: [
          ...action.tasks.filter(
            (el) => el.type === MUTABLE_STATES.IN_PROGRESS
          ),
        ],
        DONE: [...action.tasks.filter((el) => el.type === MUTABLE_STATES.DONE)],
        SELECTED: [],
        IS_FETCHING: false,
        total: action.pageData.total,
      });
    case TASK_CREATE:
      const td = [
        ...state.TODO.concat({
          ...action.tasks,
        }),
      ];
      return Object.assign({}, state, {
        ...state,
        [MUTABLE_STATES.TODO]: [...td],
        SELECTED: [],
        IS_FETCHING: false,
      });
    case TASK_UPDATE_NEXT_STATE:
      return updateTaskState(state, action.task, action.oldTask);
    case TASK_UPDATE_PREV_STATE:
      return updateTaskState(state, action.task, action.oldTask);
    case TASK_FORCE_SELECT:
      const selection = state.SELECTED.concat();
      action.task.forEach((task) => {
        const selectionIndex = selection.findIndex(
          (el) => el.taskId === task.taskId
        );
        if (selectionIndex === -1) {
          selection.push({
            taskId: task.taskId,
            type: task.type,
          });
        }
      });
      return Object.assign({}, state, {
        ...state,
        SELECTED: [...selection],
        IS_FETCHING: false,
      });
      break;
    case TASK_FORCE_DESELECT:
      const deSelection = state.SELECTED.concat();
      action.task.forEach((task) => {
        const selectionIndex = deSelection.findIndex(
          (el) => el.taskId === task.taskId
        );
        if (selectionIndex !== -1) {
          deSelection.splice(selectionIndex, 1);
        }
      });
      return Object.assign({}, state, {
        ...state,
        SELECTED: [...deSelection],
        IS_FETCHING: false,
      });
    case TASK_SELECT:
      const selected = state.SELECTED.concat();
      action.task.forEach((task) => {
        const selectionIndex = selected.findIndex(
          (el) => el.taskId === task.taskId
        );
        if (selectionIndex === -1) {
          selected.push({
            taskId: task.taskId,
            type: task.type,
          });
        } else {
          selected.splice(selectionIndex, 1);
        }
      });

      return Object.assign({}, state, {
        ...state,
        SELECTED: [...selected],
        IS_FETCHING: false,
      });
    case TASK_DELETE:
      action.tasks.forEach((task) => {
        const tasks = state[task.type];

        const index = tasks.findIndex((el) => el.taskId === task.taskId);

        state[task.type].splice(index, 1);
      });
      return Object.assign({}, state, {
        TODO: [...state.TODO],
        IN_PROGRESS: [...state.IN_PROGRESS],
        DONE: [...state.DONE],
        SELECTED: [],
        IS_FETCHING: false,
      });
  }

  return state;
};
