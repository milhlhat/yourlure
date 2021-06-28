import AxiosClient from "./axios-client";
import queryString from "query-string";
const UserApi = {
  login: (user) => {
    const url = "/user/signin";
    return AxiosClient.post(url, user);
  },
  refreshToken: () => {
    const url = "/user/refresh";
    return AxiosClient.get(url);
  },

  getMe: () => {
    const url = `/user/me`;
    return AxiosClient.get(url);
  },
  getRoles: () => {
    const url = `/user/roles`;
    return AxiosClient.get(url);
  },
  getAllProvince: () => {
    const url = `/user/get-all-province`;
    return AxiosClient.get(url);
  },
  getDistrictByProvinceId: (id) => {
    let paramString = queryString.stringify({ id: id });
    const url = `/user/find-by-district-id?${paramString}`;
    return AxiosClient.get(url);
  },
  getWardByDistrictId: (id) => {
    let paramString = queryString.stringify({ id: id });
    const url = `/user/find-by-ward-id?${paramString}`;
    return AxiosClient.get(url);
  },
};

export default UserApi;
