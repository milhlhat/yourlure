import AxiosClient from './axios-client';

const ManagerVoucherAPI = {

  getAll: (param) => {
    const url = '/admin/discount-voucher/all';
    return AxiosClient.post(url, param);
  },
  getById: (id) => {
    const url = `/admin/fish/getById?id=${id}`;
    return AxiosClient.get(url);
  },
  delete: (param) => {
    const url = `/admin/discount-voucher/remove/id=${param}`;
    return AxiosClient.delete(url);
  },
  add: (param) => {
    const url = '/admin/discount-voucher/add';
    return AxiosClient.post(url, param);
  },
  update: (fish, id) => {
    const url = `/admin/discount-voucher/update/id=${id}`;
    return AxiosClient.post(url, fish);
  },
};
export const { getAll, add, update } = ManagerVoucherAPI;
export default ManagerVoucherAPI;
