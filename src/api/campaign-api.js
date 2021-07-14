import AxiosClient from './axios-client';

const CampaignAPI = {
	getAll: () => {
		const url = `/api/campaign/all`;
		return AxiosClient.get(url);
	},
	getById: (id) => {
		const url = `/api/campaign/${id}`;
		return AxiosClient.get(url);
	},
};
export const { getAll, getById } = CampaignAPI;
export default CampaignAPI;