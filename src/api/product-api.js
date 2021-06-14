import AxiosClient from './axios-client';
import queryString from 'query-string';

const ProductAPI = {
	getBestSeller: () => {
		const url = 'api/product/best-seller';
		return AxiosClient.get(url);
	},
	getNewList: () => {
		const url = 'api/product/newest';
		return AxiosClient.get(url);
	},
	getProductByID: (id) => {
		const url = `api/product/${id}`;
		return AxiosClient.get(url);
	},
	getAllCategory: () => {
		const url = 'api/category/all';
		return AxiosClient.get(url);
	},
	getAllFish: () => {
		const url = 'api/fish/all';
		return AxiosClient.get(url);
	},
	getProductByFilter: (param) => {
		const url = 'api/product/product-filter';
		return AxiosClient.post(url, param);
	},
};
export const { getBestSeller, getNewList, getAllCategory, getAllFish, getProductByFilter } = ProductAPI;
export default ProductAPI;
