import AxiosClient from './axios-client';
import queryString from 'query-string';

const CampaignAPI = {
	getAll: () => {
		const url = `api/campaign/all`;
		return AxiosClient.get(url);
	},
	getById: (id) => {
		const url = `api/campaign/${id}`;
		return AxiosClient.get(url);
	},
};
export const {getAll,getById} = CampaignAPI;
export default CampaignAPI;