import AxiosClient from "./axios-client";

const CampaignAPI = {
  getAllCampaignByGuest: () => {
    const url = `/api/campaign/all`;
    return AxiosClient.get(url);
  },
  getCampaignGuestById: (id) => {
    const url = `/api/campaign/${id}`;
    return AxiosClient.get(url);
  },
  getNewestCampaignGuest: () => {
    const url = `/api/campaign/newest`;
    return AxiosClient.get(url);
  },
  registerCampaignGuest: (param) => {
    const url = `/api/campaign/campaign-register`;
    return AxiosClient.post(url, param);
  },
};
export const {
  getAllCampaignByGuest,
  getCampaignGuestById,
  getNewestCampaignGuest,
  registerCampaignGuest,
} = CampaignAPI;
export default CampaignAPI;
