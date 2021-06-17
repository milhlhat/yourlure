import axios from 'axios';
import queryString from 'query-string';
import { useSelector } from 'react-redux';

// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs
const AxiosClient = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: {
		'content-type': 'application/json',
	},
	paramsSerializer: (params) => queryString.stringify(params),
});

// AxiosClient.interceptors.request.use(
// 	async (config) => {
// 		// Handle token here ...
// 		// const token = localStorage.getItem('YL-user');

// 		// config.headers.Authorization= `Bearer ${JSON.parse(token).data}`;
// 		return config;
// 	},
// 	(error) => {
// 		return Promise.reject(error);
// 	}
// );

// AxiosClient.interceptors.response.use(
// 	(response) => {
// 		// if (response && response.data) {
// 		//   return response.data;
// 		// }

// 		return response;
// 	},
// 	(error) => {
// 		// Handle errors
// 		throw error;
// 	}
// );
// Add a request interceptor
AxiosClient.interceptors.request.use(
	function (config) {
		// Do something before request is sent
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);
AxiosClient.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		if (response && response.data) {
			console.log(response);
			return response.data;
		}
		return response;
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		// console.log(error.response.data);
		// console.log(error.response.status);
		// console.log(error.response.headers);
		// console.log(error.request);
		// console.log(error.config);
		return Promise.reject(error);
	}
);

export default AxiosClient;
