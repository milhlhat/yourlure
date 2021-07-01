import { findByFilter, setFilter } from "redux/product-action/fetch-filter";

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
  getListImgByMId: (mId, materials) => {
    for (let i = 0; i < materials.length; i++) {
      let item = materials[i];
      if (item.materialId === mId) {
        return item.textures;
      }
    }
    return null;
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
};
export const { getListImgByMId, getMaterialByMId } = customizeUtils;
export default productUtils;
