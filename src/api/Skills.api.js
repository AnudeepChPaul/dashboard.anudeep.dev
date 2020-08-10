import Api, { parseData } from "@/api";

export const getSkills = () => {
  return Api()
    .request({
      url: `/technology_service/get_technologies`,
      method: `get`,
    })
    .then(parseData);
};

export const updateSkillsConfig = (config) => {
  return Api().put("/technology_service/update", config).then(parseData);
};

export const deleteSkills = (idList) => {
  return Api()
    .request({
      url: "/technology_service/delete",
      method: "delete",
      params: {
        techIds: idList.map((el) => el.techId).join(","),
      },
    })
    .then(parseData);
};
