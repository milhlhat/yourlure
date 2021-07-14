import AxiosClient from './axios-client';
import queryString from 'query-string';

const CategoryAPI = {
	getBestSellerCategory: () => {
		const url = '/api/category/best-seller-with-category';
		return AxiosClient.get(url);
	},
};
export const {getBestSellerCategory} = CategoryAPI;
export default CategoryAPI;
