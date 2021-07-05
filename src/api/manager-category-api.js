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
	add: (param) => {
		const url = '/admin/category/add';
		return AxiosClient.post(url,param);
	},
	searchByName: (param) => {
		const url = '/admin/category/search';
		return AxiosClient.post(url,param);
	},
	edit: (param) => {
		const url = `/admin/category/${param.categoryId}`;
		return AxiosClient.post(url,param);
	},
	delete: (param) => {
		const url = `/admin/category/${param}`;
		return AxiosClient.delete(url);
	},
};
export const {getCategoryByID, getAll } = ManagerCategoryAPI;
export default ManagerCategoryAPI;
