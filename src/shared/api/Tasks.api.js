import Api, { parseData } from "@/shared/api/index";

export const getExistingTasks = (page = 0, pageSize = 20) => {
  return Api()
    .request({
      url: `/task_service/get_tasks`,
      method: `get`,
      params: {
        page,
        pageSize,
      },
    })
    .then(parseData);
};

export const postNewTask = (task) => {
  return Api().post("/task_service/new", task).then(parseData);
};

export const putUpdatedTask = (task) => {
  return Api().put("/task_service/update", task).then(parseData);
};

export const deleteExistingTasks = (idList) => {
  return Api()
    .request({
      url: "/task_service/delete",
      method: "delete",
      params: {
        taskIds: idList.map((el) => el.taskId).join(","),
      },
    })
    .then(parseData);
};
