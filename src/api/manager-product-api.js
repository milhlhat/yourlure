import AxiosClient from "./axios-client";

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
    console.log(files);
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
  uploadMultiTexture: async (files, materialId) => {
    console.log(files);
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
    const response = await AxiosClient.post(url, formData, config);
    return {
      linkTextures: response,
      materialId: materialId,
    };
  },
  creatProduct: (param) => {
    const url = "/admin/product/save";
    return AxiosClient.post(url, param);
  },
  creatModel: (param) => {
    const url = "/model3d/create";
    return AxiosClient.post(url, param);
  },
  getModelByProductId: (productId) => {
    const url = `/model3d/get-model-by-product-id/${productId}`;
    return AxiosClient.get(url);
  },
  updateProductById: (productId, params) => {
    const url = `/admin/product/${productId}`;
    return AxiosClient.post(url, params);
  },
  updateModelById: (params) => {
    const url = `/model3d/update-model`;
    return AxiosClient.post(url, params);
  },
  deleteProductById: (productId) => {
    const url = `/admin/product/${productId}`;
    return AxiosClient.delete(url);
  },
  getCustomizeByCustomByCustomModelId: (customModelId) => {
    const url = `/model3d/get-model-by-model-id/${customModelId}`;
    return AxiosClient.get(url);
  },
};
export const {
  getProductByID,
  getProductByFilter,
  uploadMultiFiles,
  creatProduct,
  creatModel,
  updateProductById,
  getModelByProductId,
  updateModelById,
  uploadMultiTexture,
  deleteProductById,
  getCustomizeByCustomByCustomModelId,
} = ManagerProductAPI;
export default ManagerProductAPI;
