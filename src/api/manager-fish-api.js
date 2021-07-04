import AxiosClient from './axios-client';
import queryString from 'query-string';

const ManagerFishAPI = {
    
	getAll: (param) => {
		const url = '/admin/fish/searchAll';
		return AxiosClient.post(url,param);
	},
};
export const {getAll } = ManagerFishAPI;
export default ManagerFishAPI;
