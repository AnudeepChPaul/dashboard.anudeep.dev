import Api, { parseData, hasAuthHeaders } from "@/shared/api/index";

export const postLoginCall = (username, password) => {
  return Api(true)
    .request({
      url: `/auth_service/login`,
      method: `POST`,
      data: {
        username,
        password,
      },
    })
    .then(parseData);
};

export const postRegisterUser = (username, password) => {
  return Api(true)
    .request({
      url: `/auth_service/login`,
      method: `POST`,
      data: {
        username,
        password,
      },
    })
    .then(parseData);
};

export const validateToken = () => {
  if (!hasAuthHeaders()) {
    return Promise.reject(null);
  }
  return Api(true)
    .request({
      url: `/auth_service/validate_token`,
      method: `GET`,
    })
    .then(parseData);
};
