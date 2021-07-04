import AxiosClient from './axios-client';
import queryString from 'query-string';

const ManagerUserApi = {
	getAll: (param) => {
		const url = `/admin/user/all`;
		return AxiosClient.post(url,param);
	},
};
export const {getAll } = ManagerUserApi;
export default ManagerUserApi;