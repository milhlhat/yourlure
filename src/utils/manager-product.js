import {
  findByManagerFilter,
  setFilter,
} from "redux/product-action/manager/fetch-manager-filter";

let managerProductUtils = {
  saveFilter: (dispatch, value) => {
    const action = setFilter({ ...value });
    dispatch(action);
  },
  fetchFilter: (dispatch, value) => {
    const action = findByManagerFilter({ ...value });
    dispatch(action);
  },
  toBase64: (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    }),
};
export const { saveFilter, fetchFilter, toBase64 } = managerProductUtils;
export default managerProductUtils;
