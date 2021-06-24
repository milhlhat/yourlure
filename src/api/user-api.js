import AxiosClient from './axios-client';
import queryString from 'query-string';
const UserApi = {
	login: (user) => {
		const url = '/user/signin';
		return AxiosClient.post(url, user);
	},
	refreshToken: () => {
		const url = '/user/refresh';
		return AxiosClient.get(url);
	},

	getMe: () => {
		const url = `/user/me`;
		return AxiosClient.get(url);
	},
	search: (filter) => {
		let _paramString = queryString.stringify(filter);
		const url = `/customer/search?${_paramString}`;
		return AxiosClient.get(url);
	},
	getIdentitiy: (id) => {
		const url = `/customer/identityCard/${id}`;
		return AxiosClient.get(url);
	},
	saveCustomer: (customer) => {
		const url = `/customer/save`;
		return AxiosClient.post(url, customer);
	},
	deleteCustomer: (id) => {
		const url = `/customer/id/${id}`;
		console.log(url);
		return AxiosClient.delete(url);
	},
	updateCustomer: (id, customer) => {
		const url = `/customer/update/${id}`;
		return AxiosClient.patch(url, customer);
	},
	getAddress: (userId) => {
		const url = `/user/get-address-user/${userId}`;
		return AxiosClient.get(url);
	},
};

export default UserApi;
