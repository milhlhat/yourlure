import { findByManagerFilter, setFilter } from "redux/product-action/manager/fetch-manager-filter";

let managerProductUtils = {
	saveFilter: (dispatch, value) => {
		const action = setFilter({ ...value });
		dispatch(action);
	},
	fetchFilter: (dispatch, value) => {
		const action = findByManagerFilter({ ...value });
		dispatch(action);
	},
};
export const {saveFilter, fetchFilter } =
	managerProductUtils;
export default managerProductUtils;
