import ProductAPI, {
  createCustomizeByModelId,
  submitCustomizeByModelId,
  updateCustomizeByModelId,
} from "api/product-api";
import { findByFilter, setFilter } from "redux/product-action/fetch-filter";
import { setIsCapture } from "../redux/customize-action/capture-model";
import { parseString2Boolean } from "./common";
import dumyImg from "assets/images/g1.jpg";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

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
        if (element.defaultName === name) return element.color;
      }
    }
    return "";
  },
  getVNNameMaterial: (materials, name) => {
    if (materials.length > 0) {
      for (const i in materials) {
        const element = materials[i];

        if (element.defaultName === name) return element.vnName;
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
  getVNNameMaterial,
} = productUtils;

let customizeUtils = {
  checkCanCustom: (materials) => {
    const check = materials.find((item) => item.canAddColor || item.canAddImg);
    return check;
  },
  getAvailableMid: (materials, from) => {
    const curIndex = materials[from];
    if (!checkCanCustom(materials)) {
      return false;
    }
    if (!curIndex.canAddColor && !curIndex.canAddImg) {
      console.log("run");
      return getAvailableMid(
        materials,
        from >= materials.length - 1 ? 0 : from + 1
      );
    } else {
      return curIndex.materialId;
    }
  },
  getDecreaseId: (materials, from) => {
    const curIndex = materials[from];
    if (!checkCanCustom(materials)) {
      return false;
    }
    if (!curIndex.canAddColor && !curIndex.canAddImg) {
      return getDecreaseId(
        materials,
        from <= 0 ? materials.length - 1 : from - 1
      );
    } else {
      return from;
    }
  },

  getIncreaseId: (materials, from) => {
    const curIndex = materials[from];
    if (!checkCanCustom(materials)) {
      return false;
    }
    if (!curIndex.canAddColor && !curIndex.canAddImg) {
      return getIncreaseId(
        materials,
        from >= materials.length - 1 ? 0 : from + 1
      );
    } else {
      return from;
    }
  },
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
  setDefaultTexture: (defaultMaterials, isEdit) => {
    let tempMaterials = JSON.parse(JSON.stringify(defaultMaterials));
    if (!parseString2Boolean(isEdit)) {
      for (let i = 0; i < tempMaterials.length; i++) {
        const material = tempMaterials[i];
        if (!material.img) {
          tempMaterials[i].img = "";
        }
        const textures = material.textures;
        for (let j = 0; j < textures.length; j++) {
          const texture = textures[j];

          if (texture.isDefault) {
            tempMaterials[i].img = texture.textureUrl;
            tempMaterials[i].imgId = texture.textureId;
            break;
          }
        }
      }
    } else {
      for (let i = 0; i < tempMaterials.length; i++) {
        const material = tempMaterials[i];
        const img = material.img;
        if (!img) {
          tempMaterials[i].img = "";
        }
      }
    }

    return tempMaterials;
  },
  getDefaultMaterials: async (url) => {
    const materials = [];
    let loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/examples/js/libs/draco/");
    loader.setDRACOLoader(dracoLoader);
    await loader.load(url, function (gltf) {
      const scene = gltf.scene;

      scene.traverse(function (object) {
        if (object.material) materials.push(object.material);
      });
      console.log("travel", materials);
    });
    return materials;
  },
  validateTexture: async (currentMaterial) => {
    let imgLink = currentMaterial.img;
    if (imgLink === "") {
      return null;
    }
    if (
      imgLink !== "" &&
      !imgLink?.startsWith("http") &&
      !imgLink?.startsWith("data:image")
    ) {
      imgLink = BE_SERVER + BE_FOLDER + imgLink;
    }
    let image = new Image();
    image.crossOrigin = "anonymous";

    console.log(imgLink, currentMaterial.defaultName);
    await setUrlImage(imgLink, image)
      .then()
      .catch((err) => {
        console.error(err);
      });
    return draw(image, currentMaterial);
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
  submitCustomize: async (params, isEdit) => {
    try {
      if (parseString2Boolean(isEdit)) {
        await updateCustomizeByModelId(params);
      } else {
        await createCustomizeByModelId(params);
      }
    } catch (e) {
      throw e;
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
  validateTexture,
  checkCanCustom,
  getDecreaseId,
  getIncreaseId,
  getAvailableMid,
  getDefaultMaterials,
} = customizeUtils;

const canvasUtils = {
  setUrlImage: async (url, img) => {
    return new Promise(function (resolve, reject) {
      img.onload = function () {
        resolve(url);
      };
      img.onerror = function () {
        reject(url);
      };
      img.src = url;
    });
  },
  scalePreserveAspectRatio: (imgW, imgH, maxW, maxH) => {
    return Math.min(maxW / imgW, maxH / imgH);
  },

  draw: (img, currentMaterial) => {
    //
    let canvas = document.createElement("CANVAS");
    canvas.height = img.height;
    canvas.width = img.width;
    let ctx = canvas.getContext("2d");

    let w = img.width;
    let h = img.height;

    // resize img to fit in the canvas
    // You can alternately request img to fit into any specified width/height
    let sizer = scalePreserveAspectRatio(w, h, canvas.width, canvas.height);

    // resize canvas height to fit with the image
    canvas.height = h * sizer;
    ctx.drawImage(img, 0, 0, w, h, 0, 0, w * sizer, h * sizer);
    // ctx.drawImage(img, 10, 10);
    let textSize = currentMaterial.textSize ? currentMaterial.textSize : 100;
    let fontFamily = currentMaterial.textFont
      ? currentMaterial.textFont
      : "Big Shoulders Display";
    let textColor = currentMaterial.textColor
      ? currentMaterial.textColor
      : "#0000FF";
    // write text to canvas
    ctx.fillStyle = textColor;
    //  "50px 'Kirang Haerang'";
    ctx.font = `${textSize}px ${fontFamily}`;
    console.log(ctx.font);
    let textString = currentMaterial.text ? currentMaterial.text : "";

    let textWidth = ctx.measureText(textString).width;

    ctx.fillText(
      textString,
      canvas.width / 2 - textWidth / 2,
      img.height / 2 + textSize / 2
    );
    const combineImg = canvas.toDataURL("image/png");
    // console.log(combineImg);
    // img.src = combineImg;
    return combineImg;
  },
};

export const { scalePreserveAspectRatio, draw, setUrlImage } = canvasUtils;
export default productUtils;
