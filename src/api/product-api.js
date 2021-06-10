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
};

export default ProductAPI;