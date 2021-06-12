import AxiosClient from './axios-client';
import queryString from 'query-string';
const UserApi = {
	login: (user) => {
		const url = `/login`;
		// return AxiosClient.post(url, user);

		return user;
	},
	getAll: () => {
		const url = '/customer';
		return AxiosClient.get(url);
	},

	get: (id) => {
		const url = `/user/${id}`;
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
	getAddress:(userId)=>{
		const url = `/user/get-address-se`;
		return AxiosClient.post(url, userId);
	}
};

export default UserApi;
