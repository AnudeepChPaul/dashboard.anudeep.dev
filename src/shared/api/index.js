import axios from "axios";

export default (withoutResume) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    `${process.env.API_HOST}:${process.env.API_PORT}` ||
    `http://127.0.0.1:5000`;

  return axios.create({
    baseURL: `${baseUrl}/${!withoutResume ? "resume/" : ""}api`,
  });
};

export const parseData = (resp) => JSON.parse(JSON.stringify(resp.data));

export const setAuthenticationHeaders = () => {
  const AUTH_TOKEN = localStorage.getItem("token"),
    USERNAME = localStorage.getItem("username");

  axios.defaults.headers.common["Authorization"] = `Bearer ${AUTH_TOKEN}`;
  axios.defaults.headers.common["X-User-Name"] = USERNAME;
};

export const hasAuthHeaders = () => {
  return !!(
    axios.defaults.headers.common["Authorization"] &&
    axios.defaults.headers.common["X-User-Name"]
  );
};
