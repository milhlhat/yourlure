import axios from "axios";
import queryString from "query-string";
import { getToken } from "utils/user";
import DEFINELINK from "../routes/define-link";

// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs
const AxiosClient = axios.create({
  // baseURL: 'http://192.168.1.9:8080/',
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

// Add a request interceptor
AxiosClient.interceptors.request.use(async (config) => {
  // Do something before request is sent
  if (!config.url.startsWith("api") || !config.url.startsWith("/api")) {
    config.headers.Authorization = await getToken();
  }

  return config;
});
AxiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // console.log(error.response.data);
    // console.log(error.response.status);
    // console.log(error.response.headers);
    // console.log(error.request);
    // console.log(error.config);
    if (error.response?.status === 403 && error.config.url !== "/user/roles") {
      window.location.href = DEFINELINK.home;
    }
    throw error;
  }
);

export default AxiosClient;
