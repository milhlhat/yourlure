import {
  findByManagerFilter,
  setFilter,
} from "redux/product-action/manager/fetch-manager-filter";
import ManagerProductAPI, {
  uploadMultiFiles,
  uploadMultiTexture,
} from "../api/manager-product-api";
const BE_SERVER = process.env.REACT_APP_API_URL;
const BE_FOLDER = process.env.REACT_APP_URL_FILE_DOWNLOAD;
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
      let extension = file.name.split(".").pop().toLowerCase();
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    }),
  createImageUrlByLinkOrFile: (file) => {
    if (typeof file === "string") {
      if (file.startsWith("http")) {
        return file;
      }
      return BE_SERVER + BE_FOLDER + file;
    } else {
      return URL.createObjectURL(file);
    }
  },

  promiseTexturesFiles: (newTextureFiles) => {
    if (newTextureFiles && newTextureFiles?.length > 0) {
      let promiseQueue = [];
      newTextureFiles.forEach((item) => {
        promiseQueue.push(uploadMultiTexture(item.files, item.materialId));
      });
      return Promise.all(promiseQueue);
    } else {
      return false;
    }
  },
};
export const {
  saveFilter,
  fetchFilter,
  toBase64,
  createImageUrlByLinkOrFile,

  promiseTexturesFiles,
} = managerProductUtils;
export default managerProductUtils;
