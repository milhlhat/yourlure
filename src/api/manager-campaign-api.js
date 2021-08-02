import AxiosClient from "./axios-client";

const ManagerCampaignAPI = {
  getAllCampaign: (param) => {
    const url = "/admin/campaign/admin-all";
    return AxiosClient.post(url, param);
  },
  getCampaignById: (id) => {
    const url = `/admin/campaign/${id}`;
    return AxiosClient.get(url);
  },
  deleteCampaignById: (id) => {
    const url = `/admin/campaign/delete?id=${id}`;
    return AxiosClient.delete(url);
  },
  addCampaign: (param) => {
    const url = "/admin/campaign/save";
    return AxiosClient.post(url, param);
  },
  updateCampaign: (campaignId, params) => {
    const url = `/admin/campaign/update?id=${campaignId}`;
    return AxiosClient.post(url, params);
  },
  filterCampaign: (params) => {
    const url = `/admin/campaign/admin-register-all`;
    return AxiosClient.post(url, params);
  },
};
export const {
  addCampaign,
  deleteCampaignById,
  getAllCampaign,
  getCampaignById,
  updateCampaign,
  filterCampaign,
} = ManagerCampaignAPI;
export default ManagerCampaignAPI;
