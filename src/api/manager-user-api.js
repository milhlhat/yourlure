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
  getOrderByUserId:(param)=>{
    const url = `admin/order/user-orders/{userId}`;
    return AxiosClient.post(url, param);
  },
  getUserById:(param)=>{
    const url = `admin/user/find-by-id?id=${param}`;
    return AxiosClient.get(url);
  },
  getAddressByUserId:(param)=>{
    const url = `/admin/user/get-address-user/${param}`;
    return AxiosClient.get(url);
  },
};
export const { getAll } = ManagerUserApi;
export default ManagerUserApi;
