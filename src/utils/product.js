import ProductAPI, {
  createCustomizeByModelId,
  submitCustomizeByModelId,
  updateCustomizeByModelId,
} from "api/product-api";
import { findByFilter, setFilter } from "redux/product-action/fetch-filter";
import { setIsCapture } from "../redux/customize-action/capture-model";

const BE_SERVER = process.env.REACT_APP_API_URL;
const BE_FOLDER = process.env.REACT_APP_URL_FILE_DOWNLOAD;
let productUtils = {
  getNodesInfoBy: (list, type) => {
    let listTemp = [];
    for (const i in list) {
      const element = list[i];
      if (element.type === type) {
        listTemp.push({ name: element.name, geometry: element.geometry });
      }
    }
    return listTemp;
  },
  getMaterialsInfoBy: (list, type, type2) => {
    let listTemp = [];
    for (const i in list) {
      const element = list[i];
      if (element.type === type || element.type === type2) {
        listTemp.push(element);
      }
    }
    return listTemp;
  },
  getMaterialsName: (list, type, type2) => {
    let listTemp = [];
    let id = 0;
    for (const i in list) {
      const element = list[i];
      if (element.type === type || element.type === type2) {
        listTemp.push({
          id: id,
          name: element.name,
          img: "",
          color: "",
          text: "",
          canAddText: false,
          canAddImg: true,
          canAddColor: true,
        });
        id++;
      }
    }
    return listTemp;
  },
  getColorMaterialByName: (listmaterial, name) => {
    if (listmaterial.length > 0) {
      for (const i in listmaterial) {
        const element = listmaterial[i];
        if (element.name === name) return element.color;
      }
    }
    return "";
  },
  saveFilter: (dispatch, value) => {
    const action = setFilter({ ...value });
    dispatch(action);
  },
  fetchFilter: (dispatch, value) => {
    const action = findByFilter({ ...value });
    dispatch(action);
  },
};
export const {
  getNodesInfoBy,
  getMaterialsInfoBy,
  getMaterialsName,
  getColorMaterialByName,
  saveFilter,
  fetchFilter,
} = productUtils;

let customizeUtils = {
  getPositionSelectedByMId: (id, materials) => {
    if (materials.length > 0) {
      for (let i = 0; i < materials.length; i++) {
        if (materials[i].materialId === id) return i;
      }
    }
    return 0;
  },
  getSelectMatNameByMatId: (id, materials) => {
    if (materials.length > 0) {
      for (let i = 0; i < materials.length; i++) {
        if (materials[i].materialId === id) return materials[i].vnName;
      }
    }
    return "";
  },
  getListImgByMId: (mId, materials) => {
    for (let i = 0; i < materials.length; i++) {
      let item = materials[i];
      if (item.materialId === mId) {
        return item.textures;
      }
    }
    return null;
  },
  getImgTexturesByImgId: (currentMaterial) => {
    const imgId = currentMaterial.imgId;
    const textures = currentMaterial.textures;
    for (let i = 0; i < textures.length; i++) {
      if (textures[i].textureId === imgId) {
        return BE_SERVER + BE_FOLDER + textures[i].textureUrl;
      }
    }
    return "";
  },
  setDefaultTexture: (defaultMaterials) => {
    let tempMaterials = JSON.parse(JSON.stringify(defaultMaterials));
    for (let i = 0; i < tempMaterials.length; i++) {
      const material = tempMaterials[i];
      const textures = material.textures;
      for (let j = 0; j < textures.length; j++) {
        const texture = textures[j];
        console.log(texture.isDefault);
        if (texture.isDefault) {
          tempMaterials[i].img = BE_SERVER + BE_FOLDER + texture.textureUrl;
          tempMaterials[i].imgId = texture.textureId;
          break;
        }
      }
    }
    return tempMaterials;
  },
  getMaterialByMId: (mId, materials) => {
    for (let i = 0; i < materials.length; i++) {
      let item = materials[i];
      if (item.materialId === mId) {
        return item;
      }
    }
    return null;
  },
  submitCustomize: async (params, isEdit, setExportStatus) => {
    setExportStatus({ isLoading: true, isSuccess: false });

    try {
      if (isEdit) {
        await createCustomizeByModelId(params);
      } else {
        await updateCustomizeByModelId(params);
      }
      setExportStatus({
        isLoading: false,
        isSuccess: true,
      });
    } catch (e) {
      setExportStatus({ isLoading: false, isSuccess: false });

      console.log(e);
    }
  },
};
export const {
  getPositionSelectedByMId,
  getSelectMatNameByMatId,
  getListImgByMId,
  getMaterialByMId,
  setDefaultTexture,
  getImgTexturesByImgId,
  submitCustomize,
} = customizeUtils;
export default productUtils;
