import AxiosClient from "./axios-client";

const CategoryAPI = {
  getBestSellerCategory: () => {
    const url = "/api/category/best-seller-with-category";
    return AxiosClient.get(url);
  },
};
export const { getBestSellerCategory } = CategoryAPI;
export default CategoryAPI;
