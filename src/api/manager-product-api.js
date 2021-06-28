import AxiosClient from './axios-client';
import queryString from 'query-string';

const ManagerProductAPI = {
	getProductByID: (id) => {
		const url = `/admin/product/${id}`;
		return AxiosClient.get(url);
	},
	getProductByFilter: (param) => {
		const url = '/admin/product/all';
		return AxiosClient.post(url, param);
	},
};
export const {getProductByID, getProductByFilter } = ManagerProductAPI;
export default ManagerProductAPI;
