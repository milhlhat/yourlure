import AxiosClient from './axios-client';

const ManagerCampaignAPI = {
    getAll: (param) => {
        const url = '/admin/campaign/admin-all';
        return AxiosClient.post(url, param);
    },
    getById: (id) => {
        const url = `/admin/campaign/${id}`;
        return AxiosClient.get(url);
    },
    delete: (id) => {
        const url = `/admin/campaign/delete?id=${id}`;
        return AxiosClient.delete(url);
    },
    add: (param) => {
        const url = '/admin/campaign/save';
        return AxiosClient.post(url, param);
    },
    update: (voucher, id) => {
        const url = `/admin/campaign/update?id=${id}`;
        return AxiosClient.post(url, voucher);
    },
    uploadMultiFiles: (files) => {
        const url = "/admin/product/upload";
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };
        const formData = new FormData();

        files.forEach((file) => {
            formData.append("files", file);
        });

        return AxiosClient.post(url, formData, config);
    },
};
export const { getAll, getById, uploadMultiFiles } = ManagerCampaignAPI;
export default ManagerCampaignAPI;