import AxiosClient from './axios-client';
import queryString from 'query-string';

const ManagerCategoryAPI = {
	getCategoryByID: (id) => {
		const url = `/admin/category/${id}`;
		return AxiosClient.get(url);
	},
	getAll: () => {
		const url = '/admin/category/all';
		return AxiosClient.get(url);
	},
};
export const {getCategoryByID, getAll } = ManagerCategoryAPI;
export default ManagerCategoryAPI;
