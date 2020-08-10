export const MUTABLE_STATES = {
  TODO: "TODO",
  IN_PROGRESS: "IN_PROGRESS",
  DONE: "DONE",
};

export const workProgessWorkflow = [
  MUTABLE_STATES.TODO,
  MUTABLE_STATES.IN_PROGRESS,
  MUTABLE_STATES.DONE,
];

const findIndex = (state) =>
  workProgessWorkflow.findIndex((el) => el === state);

export const nextState = (state) => {
  const currentIndex = findIndex(state);
  return workProgessWorkflow[currentIndex + 1] || state;
};

export const prevState = (state) => {
  const currentIndex = findIndex(state);
  return workProgessWorkflow[currentIndex - 1] || state;
};
