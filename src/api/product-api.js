import AxiosClient from "./axios-client";
import queryString from "query-string";
import dumyCustomize from "store-front-pages/dumy";

const ProductAPI = {
  getBestSeller: () => {
    const url = "/api/product/best-seller";
    return AxiosClient.get(url);
  },
  getNewList: () => {
    const url = "/api/product/newest";
    return AxiosClient.get(url);
  },
  getProductByID: (id) => {
    const url = `/api/product/${id}`;
    return AxiosClient.get(url);
  },
  getAllCategory: () => {
    const url = "/api/category/all";
    return AxiosClient.get(url);
  },
  getAllFish: () => {
    const url = "/api/fish/all";
    return AxiosClient.get(url);
  },
  getProductByFilter: (param) => {
    const url = "/api/product/product-filter";
    return AxiosClient.post(url, param);
  },
  getMaterialsInfoByProdId: (id) => {
    const url = "/model3d/get-model-by-product-id/" + id;
    return AxiosClient.get(url);
    // return dumyCustomize.initMaterials();
  },
  getMaterialsCustomizeId: (id) => {
    const url = "/model3d/find-custom-by-id/" + id;
    return AxiosClient.get(url);
  },
  createCustomizeByModelId: (params) => {
    const url = "/model3d/create-custom";
    console.log(params);
    return AxiosClient.post(url, params);
  },
  updateCustomizeByModelId: (params) => {
    const url = "/model3d/update-custom";
    console.log(params);
    return AxiosClient.post(url, params);
  },
  getCustomizeByProductId: (customizeId) => {
    const url = `/model3d/find-custom-by-product-id/${customizeId}`;
    return AxiosClient.get(url);
  },
  getAllCustomize: () => {
    const url = `/model3d/all-customize`;
    return AxiosClient.get(url);
  },
  deleteCustomize: (id) => {
    const url = `/model3d/delete-custom?customizeId=${id}`;
    return AxiosClient.delete(url);
  },
  getCustomizePrice: () => {
    const url = `/model3d/customize-price`;
    return AxiosClient.get(url);
  },
};
export const {
  getBestSeller,
  getNewList,
  getAllCategory,
  getAllFish,
  getProductByFilter,
  getMaterialsCustomizeId,
  createCustomizeByModelId,
  updateCustomizeByModelId,
  getCustomizePrice,
} = ProductAPI;
export default ProductAPI;
