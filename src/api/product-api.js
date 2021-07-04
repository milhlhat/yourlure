import AxiosClient from "./axios-client";
import queryString from "query-string";
import dumyCustomize from "store-front-pages/dumy";

const ProductAPI = {
  getBestSeller: () => {
    const url = "api/product/best-seller";
    return AxiosClient.get(url);
  },
  getNewList: () => {
    const url = "api/product/newest";
    return AxiosClient.get(url);
  },
  getProductByID: (id) => {
    const url = `api/product/${id}`;
    return AxiosClient.get(url);
  },
  getAllCategory: () => {
    const url = "api/category/all";
    return AxiosClient.get(url);
  },
  getAllFish: () => {
    const url = "api/fish/all";
    return AxiosClient.get(url);
  },
  getProductByFilter: (param) => {
    const url = "api/product/product-filter";
    return AxiosClient.post(url, param);
  },
  getMaterialsInfoByProdId: (id) => {
    const url = 'model3d/get-model-by-product-id/31';
    return AxiosClient.get(url);
    // return dumyCustomize.initMaterials();
  },
  submitCustomizeByModelId: (params) => {
    const url = "/model3d/create-custom";
    return AxiosClient.post(url, params);
  },
};
export const {
  getBestSeller,
  getNewList,
  getAllCategory,
  getAllFish,
  getProductByFilter,
  submitCustomizeByModelId,
} = ProductAPI;
export default ProductAPI;
