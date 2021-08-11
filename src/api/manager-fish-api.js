import AxiosClient from "./axios-client";

const ManagerFishAPI = {
  getAll: (param) => {
    const url = "/admin/fish/searchAll";
    return AxiosClient.post(url, param);
  },
  getById: (id) => {
    const url = `/admin/fish/getById?id=${id}`;
    return AxiosClient.get(url);
  },
  delete: (param) => {
    const url = `/admin/fish/delete/${param}`;
    return AxiosClient.delete(url);
  },
  add: (param) => {
    const url = "/admin/fish/save";
    return AxiosClient.post(url, param);
  },
  update: (fish, id) => {
    const url = `/admin/fish/update?id=${id}`;
    return AxiosClient.post(url, fish);
  },
};
export const { getAll, add, update } = ManagerFishAPI;
export default ManagerFishAPI;
