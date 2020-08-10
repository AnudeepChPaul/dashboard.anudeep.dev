import axios from "axios";

export default (withoutResume) => {
  return axios.create({
    baseURL: `http://127.0.0.1:5000/${!withoutResume ? "resume/" : ""}api`,
    // process.env.NODE_ENV === "development"
    //   ? "http://127.0.0.1:5000/resume/api"
    //   : "https://api-anudeepchpaul-in.herokuapp.com/resume/api",
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
