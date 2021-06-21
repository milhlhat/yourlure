import UserApi from 'api/user-api';
import userConfig from 'constant/user-config';
const userUtils = {
	getToken: async () => {
		try {
			let loginAt = localStorage.getItem(userConfig.LOCAL_STORE_LOGIN_AT);
			// console.log(loginAt);
			// if (!loginAt || subtractDates(loginAt) > userConfig.STAY_LOGIN_TIME) {
			// refreshToken();
			// 	// localStorage.setItem(userConfig.LOCAL_STORE_ACCESS_TOKEN, response);
			// 	// localStorage.setItem(userConfig.LOCAL_STORE_LOGIN_AT, new Date().toLocaleString());
			// }
			let accessToken =  localStorage.getItem(userConfig.LOCAL_STORE_ACCESS_TOKEN);
			// console.log(`Bearer ${accessToken}`);
			return `Bearer ${accessToken}`;
		} catch (e) {
			console.log(e);
		}
	},
	refreshToken: async () => {
		let accessToken = localStorage.getItem(userConfig.LOCAL_STORE_ACCESS_TOKEN);
		console.log(accessToken);
		const myHeaders = new Headers({
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${accessToken}`
		});

		fetch(`${process.env.REACT_APP_API_URL}users/refresh`, {
			method: 'GET',
			headers: myHeaders,
		})
			.then((response) => response.json())
			.then((data) => console.log('refresh', data))
			.catch((error) => {
				console.error('Error:', error);
			});
	},
	subtractDates: (loginAt) => {
		return Math.abs(new Date() - new Date(loginAt.replace(/-/g, '/'))) / 1000 / 60;
	},
	saveLocalStorage: (name, value) => {
		localStorage.setItem(name, value);
	},
	getLocalStorage: (name) => {
		localStorage.getItem(name);
	},
	removeLocalStorage: (name) => {
		localStorage.removeItem(name);
	},
};
export const { getToken, refreshToken, subtractDates, saveLocalStorage } = userUtils;
