import Api, { parseData } from "@/shared/api/index";

export const getApplicationConfig = (config) => {
  return Api()
    .request({
      url: !config ? `/app_config_service/all` : `/app_config_service`,
      method: `get`,
      params: !config
        ? null
        : {
            configName: config,
          },
    })
    .then(parseData);
};

export const updateApplicationConfig = (config) => {
  return Api().put("/app_config_service/update", config).then(parseData);
};
