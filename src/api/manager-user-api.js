import AxiosClient from "./axios-client";
import queryString from "query-string";

const ManagerUserApi = {
  getAll: (param) => {
    const url = `/admin/user/all`;
    return AxiosClient.post(url, param);
  },
  getStaffAll: (param) => {
    const url = `/admin/user/all-staff`;
    return AxiosClient.post(url, param);
  },
  switchStatus: (param) => {
    const url = `/admin/user/switch-status/${param}`;
    return AxiosClient.get(url);
  },
  createAdminAccount: (param) => {
    const url = `admin/user/staff/save`;
    return AxiosClient.post(url, param);
  },
};
export const { getAll } = ManagerUserApi;
export default ManagerUserApi;
