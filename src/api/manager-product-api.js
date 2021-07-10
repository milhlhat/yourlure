import AxiosClient from "./axios-client";
import queryString from "query-string";

const ManagerProductAPI = {
  getProductByID: (id) => {
    const url = `/admin/product/${id}`;
    return AxiosClient.get(url);
  },
  getProductByFilter: (param) => {
    const url = "/admin/product/all";
    return AxiosClient.post(url, param);
  },
  uploadMultiFiles: (files) => {
    const url = "/admin/product/upload";
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("files", file);
    });

    return AxiosClient.post(url, formData, config);
  },
};
export const { getProductByID, getProductByFilter, uploadMultiFiles } =
  ManagerProductAPI;
export default ManagerProductAPI;
