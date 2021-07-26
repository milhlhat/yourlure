import AxiosClient from './axios-client';
import queryString from 'query-string';

const PhoneAPI = {
	checkPhoneExist: (param) => {
		const url = `/user/check-phone-exist?phone=${param}`;
		return AxiosClient.post(url);
	},
	verifyNewPhoneNumber: (param) => {
		const url = `/user/send-otp`;
		return AxiosClient.post(url,param);
	},
	verifyOldPhoneNumber: (param) => {
		const url = `/user/forgot-password`;
		return AxiosClient.post(url,param);
	},
	
};
export default PhoneAPI;
