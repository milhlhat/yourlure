import AxiosClient from "./axios-client";
import queryString from "query-string";
const VariantApi = {
  createVariant: (params) => {
    const url = "/admin/variant/save";
    return AxiosClient.post(url, params);
  },
  deleteVariant: (productId, variantId) => {
    const param = {
      productId,
      variantId,
    };
    const url = `/admin/variant/delete?${queryString.stringify(param)}`;
    return AxiosClient.delete(url);
  },
  getVariant: (variantId) => {
    const url = `/admin/variant/get-by-id/${variantId}`;
    return AxiosClient.get(url);
  },
  updateVariant: (variantId, params) => {
    const url = `/admin/variant/update?id=${variantId}`;
    return AxiosClient.post(url, params);
  },
};
export const { createVariant, deleteVariant, getVariant, updateVariant } =
  VariantApi;
export default VariantApi;
