import AxiosClient from './axios-client';
import queryString from 'query-string';

const CartAPI = {
	addVariant: (param) => {
		const url = `/cart/add-variant`;
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
};
export default CartAPI;
