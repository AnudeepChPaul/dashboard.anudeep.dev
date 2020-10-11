import Api, { parseData } from "@/shared/api/index";

export const getAllProjects = (page = 0, pageSize = 100) => {
  return Api()
    .request({
      url: `/project_service/get_projects`,
      method: `get`,
      params: {
        page,
        pageSize,
      },
    })
    .then(parseData);
};

export const postNewTask = (task) => {
  return Api().post("/project_service/new", task).then(parseData);
};

export const putUpdatedTask = (task) => {
  return Api().put("/project_service/update", task).then(parseData);
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
