import AxiosClient from './axios-client';
import queryString from 'query-string';

const ManagerFishAPI = {
    
	getAll: () => {
        const filter = {
            isAsc: true,
            keyword: "",
            limit: 12,
            listCateId: [
              
            ],
            listFishId: [
              
            ],
            page: 0,
            sortBy: "fishId"
          }
		const url = '/admin/fish/searchAll';
		return AxiosClient.post(url,filter);
	},
};
export const {getAll } = ManagerFishAPI;
export default ManagerFishAPI;
