import AxiosClient from './axios-client';
import queryString from 'query-string';

const ManagerOrderAPI = {
	getAllOrder: (param) => {
		const url = `/admin/order/all-by-phone-or-name`;
		return AxiosClient.post(url,param);
	},
	getOrderById: (param) => {
		const url = `/admin/order/order-detail/${param}`;
		return AxiosClient.get(url);
	},
};
export const {getAllOrder,getOrderById } = ManagerOrderAPI;
export default ManagerOrderAPI;
