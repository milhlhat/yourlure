import AxiosClient from './axios-client';
import queryString from 'query-string';

const CartAPI = {
	addVariant: (param) => {
		const url = `/cart/add-variant`;
		return AxiosClient.post(url,param);
	},
	addCustomize: (param) => {
		const url = `/cart/add-customize`;
		return AxiosClient.post(url,param);
	},
	updateQuantity: (id,quantity) => {
		const url = `/cart/save-quantity?itemId=${id}&quantity=${quantity}`;
		return AxiosClient.post(url);
	},
	getCart: () => {
		const url = `/cart/my-cart`;
		return AxiosClient.get(url);
	},
	deleteItem: (id) => {
		const url = `/cart/remove-item?cartItemId=${id}`;
		return AxiosClient.delete(url);
	},
	getGuestCart: (params) => {
		const url = `/cart/list-variant-of-guest`;
		return AxiosClient.post(url,params);
	},

};
export default CartAPI;
