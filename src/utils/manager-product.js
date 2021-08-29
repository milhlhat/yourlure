import {
  findByManagerFilter,
  setFilter,
} from "store/product-action/manager/fetch-manager-filter";
import { uploadMultiTexture } from "../api/manager-product-api";

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
  toBase64: (file) => {
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  },
  toBase64WithMaterialId: (texture) => {
    const file = texture.file;
    new Promise((resolve, reject) => {
      let extension = file.name.split(".").pop().toLowerCase();
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () =>
        resolve({
          contenBase64: reader.result,
          materialId: texture.materialId,
          format: "jpg",
          isDefault: false,
        });
      reader.onerror = (error) => reject(error);
    });
  },
  promiseTextureBase64: (newTextureFiles) => {
    let promise = [];
    if (newTextureFiles?.length > 0) {
      newTextureFiles.forEach((item) => {
        promise.push(toBase64WithMaterialId(item));
      });
      return Promise.all(promise);
    } else {
      return [];
    }
  },
  createImageUrlByLinkOrFile: (file) => {
    if (!file) return "";
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
        if (Array.isArray(item.files) && item.files?.length > 0) {
          promiseQueue.push(uploadMultiTexture(item.files, item.materialId));
        }
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
  toBase64WithMaterialId,
  promiseTexturesFiles,
  promiseTextureBase64,
} = managerProductUtils;
export default managerProductUtils;
