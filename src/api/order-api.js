import AxiosClient from './axios-client';
import queryString from 'query-string';

const OrderAPI = {
	getUserOrder: (limit,page) => {
		const url = `/api/order/user-order?limit=${limit}&page=${page}`;
		return AxiosClient.get(url);
	},
	userProcessOrder: (param) => {
		const url = `/api/order/user-process-order`;
		return AxiosClient.post(url,param);
	},
};
export const {getUserOrder } = OrderAPI;
export default OrderAPI;
