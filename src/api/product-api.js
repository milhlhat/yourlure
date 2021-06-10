import AxiosClient from './axios-client';
import queryString from 'query-string';


const ProductAPI = {
    getBestSeller: () => {
		const url = '/product/best-seller';
		return AxiosClient.get(url);
	},
    getNewList: () => {
		const url = '/product/newest';
		return AxiosClient.get(url);
	},
	getProductByID: (id) => {
		const url = `product/${id}`;
		return AxiosClient.get(url);
	},
    getAllCategory: () => {
		const url = '/category/all';
		return AxiosClient.get(url);
	},
    getAllFish: () => {
		const url = '/fish/all';
		return AxiosClient.get(url);
	},
};
export const {getBestSeller,getNewList,getAllCategory,getAllFish} =ProductAPI
export default ProductAPI;