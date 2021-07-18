import AxiosClient from './axios-client';
import queryString from 'query-string';

const ManagerOrderAPI = {
	getAllOrder: (param) => {
		const url = `/admin/order/all`;
		return AxiosClient.post(url,param);
	},
	changeStatusOrder: (activityEnum,orderId) => {
		const url = `/admin/order/change-status-order?activityEnum=${activityEnum}&orderId=${orderId}`;
		return AxiosClient.post(url);
	},
	getOrderById: (param) => {
		const url = `/admin/order/order-detail/${param}`;
		return AxiosClient.get(url);
	},
};
export const {getAllOrder,getOrderById } = ManagerOrderAPI;
export default ManagerOrderAPI;
