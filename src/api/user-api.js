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
  update:(user)=>{
    const url = "/user/update";
    return AxiosClient.post(url, user);
  },
  getAddress:()=>{
    const url = "/user/get-address-user";
    return AxiosClient.post(url);
  },
  setAddressDefault:(userAddressId)=>{
    const url = `/user/default-address?userAddressId=${userAddressId}`;
    return AxiosClient.get(url);
  },
  addAddress:(address)=>{
    const url = `/user/add-address`;
    return AxiosClient.post(url,address);
  },
  updateAddress:(address,id)=>{
    const url = `/user/update-address?userAddressId=${id}`;
    return AxiosClient.post(url,address);
  },
  signup:(user)=>{
    const url = `/user/signup?otp=${user.otp}&password=${user.password}&phone=${user.phone}`;
    return AxiosClient.post(url);
  },
  changePassword:(param)=>{
    const url = `/user/change-password?oldPassword=${param.oldPassword}&password=${param.password}`;
    return AxiosClient.post(url);
  },
  deleteAddress:(id)=>{
    const url = `/user/delete-address?userAddressId=${id}`;
    return AxiosClient.delete(url);
  },
  getAddressFromWardId:(param)=>{
    const url = `/user/get-address-from-ward-id?id=${param}`;
    return AxiosClient.get(url);
  },
};

export default UserApi;
