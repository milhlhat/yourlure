import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import YLButton from "components/custom-field/YLButton";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./scss/add-new-product.scss";
import ManagerProductAPI, {
  creatModel,
  updateModelById,
  updateProductById,
  uploadMultiFiles,
} from "api/manager-product-api";
import CategorySelectFormHook from "./CategorySelectFormHook";
import FishCheckBoxFormHook from "./FishCheckBoxFormHook";
import YlInputFormHook from "../../../components/custom-field/YLInputFormHook";
import ChooseProductImage from "./ChooseProductImage";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import ChooseTextureImage from "./ChooseTextureImage";
import { Tooltip } from "@material-ui/core";
import CreateAndUpdateVariant from "./CreateAndUpdateVariant";
import ProductAPI from "../../../api/product-api";
import { promiseTexturesFiles } from "../../../utils/manager-product";
import * as Yup from "yup";

function ManagerProductEdit(props) {
  const canBack = props.location.canBack;
  const history = useHistory();

  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [product, setProduct] = useState({
    data: {},
    loading: true,
    success: false,
  });

  //validate form

  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

  const schema = yup.object().shape({
    productName: yup.string().required("Tên sản phẩm không được để trống"),
    categoryId: yup.number().typeError("Danh mục không được để trống"),
    defaultPrice: yup.number().typeError("Giá là số dương"),
    length: yup.number().typeError("Chiều dài là số dương"),
    hookSize: yup.number().typeError("Cỡ lưỡi là số dương"),
    deepDiving: yup.string().required("Lặn sâu không được để trống"),
    material: yup.string().required("Chất không được để trống"),
    defaultWeight: yup.number().typeError("Trọng lượng là số dương"),
    description: yup.string().required("Chất không được để trống"),
    // imgList: yup
    //   .mixed().when('newImages',(newImages, schema)=>{
    //
    //     }).
    //   .test(
    //     "requiredProdImage",
    //     "Vui lòng chọn ảnh .png, .jpg, .jpeg",
    //     (imgList) => {
    //       const watchNewProductImage = Yup.ref("newImages");
    //       console.log("watchNewProductImage", watchNewProductImage.getValue());
    //       if (watchNewProductImage.length + imgList.length < 1) return false;
    //
    //       for (const v of watchNewProductImage) {
    //         if (!SUPPORTED_FORMATS.includes(v.type)) {
    //           return false;
    //         }
    //       }
    //
    //       return true;
    //     }
    //   ),
  });
  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const {
    register,

    watch,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = methods;
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "defaultMaterials", // unique name for your Field Array
      // keyName: "id", default to "id", you can change the key name
    }
  );
  const watchDefaultMaterials = useWatch({
    control,
    name: "defaultMaterials",
    defaultValue: [],
  });
  const watchCustomizable = useWatch({
    control,
    name: "customizable",
    defaultValue: false,
  });
  const isCustomizeWeight = watch("isCustomizeWeight");

  const setFormValues = (product) => {
    const defauValues = [
      { name: "brand", value: product.brand },
      { name: "categoryId", value: product.category.categoryId },
      { name: "content", value: product.content },
      { name: "customizable", value: product.customizable },
      { name: "deepDiving", value: product.deepDiving },
      { name: "defaultPrice", value: product.defaultPrice },
      { name: "defaultWeight", value: product.defaultWeight },
      { name: "description", value: product.description },
      { name: "hookSize", value: product.hookSize },
      { name: "imgUrlModel", value: product.imgUrlModel },
      { name: "isCustomizeWeight", value: product.isCustomizeWeight },
      { name: "length", value: product.length },
      // { name: "listFishId", value: product.listFishId },
      { name: "material", value: product.material },
      { name: "minWeight", value: product.minWeight },
      { name: "maxWeight", value: product.maxWeight },
      { name: "productName", value: product.productName },
      { name: "imgList", value: product.imageCollection },
      { name: "variantCollection", value: product.variantCollection },
      { name: "imgListRemove", value: [] },
      { name: "imgListInput", value: [] },
      { name: "newImages", value: [] },
    ];
    defauValues.forEach(({ name, value }) => setValue(name, value));
  };

  const [hasModel, setHasModel] = useState(false);
  useEffect(() => {
    const fetchDataByProductId = async (productId) => {
      console.log(productId);
      try {
        const responseFish = await ProductAPI.getAllFish();

        const response = await ManagerProductAPI.getProductByID(productId);
        //set initial form value
        setFormValues(response);
        //check to fish list
        responseFish.forEach((item, index) => {
          if (response.listFishId.includes(item.fishID)) {
            setValue(`listFishId[${index}]`, item.fishID);
          }
        });
        //fill value to model fields
        let currentModel = null;
        try {
          currentModel = await ManagerProductAPI.getModelByProductId(productId);
          console.log(currentModel);
        } catch (e) {
          console.log(e);
        }

        setProduct({
          data: response,
          loading: false,
          success: true,
          currentModel: currentModel,
        });
        //check already has model 3d => can't add new, just update information of model
        setHasModel(currentModel?.modelId);
        //fill value to material field
        setValue(
          "defaultMaterials",
          currentModel?.materials ? currentModel.materials : []
        );
      } catch (error) {
        console.log(error);
      }
    };

    if (productId) fetchDataByProductId(productId);
  }, [productId]);

  //===========handle form

  const onChangeInputFileModel = (e) => {
    const file = e.target.files[0];
    setValue("file3dUpload", [...e.target.files]);
    remove();
    if (file) {
      let url = URL.createObjectURL(file);
      let loader = new GLTFLoader();
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("/examples/js/libs/draco/");
      loader.setDRACOLoader(dracoLoader);
      loader.load(url, function (gltf) {
        const materials = [];
        const scene = gltf.scene;

        scene.traverse(function (object) {
          if (object.material)
            materials.push({ defaultName: object.material.name });
        });

        append(materials);
      });
    }
  };

  const getFishIds = (fishChecked) => {
    if (fishChecked.length > 0) {
      let temp = [];
      fishChecked.forEach((item) => {
        if (item) temp.push(item);
      });

      return temp;
    } else {
      return [];
    }
  };

  const onSubmit = async (data) => {
    try {
      //====product======

      //update product images : upload files to get image links
      let linkImgProdUploaded = [];
      if (data?.newImages?.length > 0) {
        linkImgProdUploaded = await uploadMultiFiles(data.newImages);
        data.imgListInput = linkImgProdUploaded;
      }

      //update list fish
      let fishTemp = data.listFishId;
      data.listFishId = getFishIds(fishTemp);

      await updateProductById(productId, data);

      //========model==========
      // create: model
      if (data.customizable && !hasModel) {
        let modelUrl = await uploadMultiFiles(data.file3dUpload);
        const createModelParams = {
          defaultMaterials: data.defaultMaterials,
          name: product.data.productName,
          productId: product.data.productId,
          url: modelUrl[0],
        };
        await creatModel(createModelParams);
      }

      //update: model
      if (data.customizable && hasModel) {
        //update texture
        let materialDtoInputs = data.defaultMaterials;
        const newTextures = data.newTextureFiles;
        const textureUploaded = await promiseTexturesFiles(newTextures);
        console.log("textureUploaded", textureUploaded);

        //map material with link upload
        if (textureUploaded) {
          materialDtoInputs.forEach((old, i, thisArray) => {
            textureUploaded.forEach((news) => {
              if (old.materialId === news.materialId) {
                thisArray[i].linkTextures = news.linkTextures;
              }
            });
          });
        }

        const updateModelParams = {
          materialDtoInputs: materialDtoInputs,
          modelId: hasModel,
        };
        await updateModelById(updateModelParams);
      }
      console.log(data);
    } catch (e) {}
  };
  //============

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" product-add-new-form row">
          <div className="product-info bg-white bg-shadow col-12 col-md-8 mb-md-5 mb-2 pb-2">
            <div className="px-3 pt-3">
              <h5>Thông tin sản phẩm</h5>
            </div>
            <hr />
            <div className="px-3">
              <table className={"form-edit"}>
                <tbody>
                  <tr>
                    <td>
                      <YlInputFormHook
                        name={"productName"}
                        methods={methods}
                        label={"Tên sản phẩm"}
                        placeholder={"Tên sản phẩm"}
                        isRequired
                      />
                    </td>
                    <td>
                      <YlInputFormHook
                        name={"brand"}
                        methods={methods}
                        label={"Thương hiệu"}
                        placeholder={"Thương hiệu"}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <YlInputFormHook
                        name={"defaultPrice"}
                        methods={methods}
                        label={"Giá"}
                        placeholder={"\u20AB"}
                        isRequired
                      />
                    </td>
                    <td>
                      <YlInputFormHook
                        name={"length"}
                        methods={methods}
                        label={"Chiều dài"}
                        placeholder={"(cm)"}
                        isRequired
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <YlInputFormHook
                        name={"hookSize"}
                        methods={methods}
                        label={"Cỡ lưỡi"}
                        placeholder={"Cỡ lưỡi"}
                        isRequired
                      />
                    </td>
                    <td>
                      <YlInputFormHook
                        name={"deepDiving"}
                        methods={methods}
                        label={"Lặn sâu"}
                        placeholder={"(m)"}
                        isRequired
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <YlInputFormHook
                        name={"material"}
                        methods={methods}
                        label={"Chất liệu"}
                        placeholder={"Nhựa, cao su"}
                        isRequired
                      />
                    </td>
                    <td>
                      <YlInputFormHook
                        name={"defaultWeight"}
                        methods={methods}
                        label={"Trọng lượng"}
                        placeholder={"(g)"}
                        isRequired
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        className="form-check-input pointer"
                        type="checkbox"
                        id="customize-weight"
                        name={"isCustomizeWeight"}
                        {...register("isCustomizeWeight")}
                        // onChange={handleChangeCustomWeight}
                        defaultChecked={product.data.customizable}
                      />
                      <label
                        htmlFor="customize-weight"
                        className="form-label ms-1"
                      >
                        Tuỳ chỉnh trọng lượng
                      </label>
                      <span>{errors.isCustomizeWeight?.message}</span>
                    </td>
                    <td>
                      {isCustomizeWeight && (
                        <div className="d-flex flex-wrap">
                          <div>
                            <YlInputFormHook
                              name={"minWeight"}
                              methods={methods}
                              label={"Tối thiểu"}
                              placeholder={"(g)"}
                              isRequired
                            />
                          </div>
                          <div>
                            <YlInputFormHook
                              name={"maxWeight"}
                              methods={methods}
                              label={"Tối đa"}
                              placeholder={"(g)"}
                              isRequired
                            />
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td colSpan="2">
                      <label htmlFor="description" className="form-label">
                        Mô tả <span className="error-message"> (*)</span>
                      </label>
                      <textarea
                        className="form-control"
                        id="description"
                        placeholder="Mô tả"
                        {...register("description")}
                      />
                      <span>{errors.description?.message}</span>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <label htmlFor="content" className="form-label">
                        Mô tả chi tiết
                      </label>
                      <textarea
                        className="form-control"
                        id="content"
                        placeholder="Mô tả chi tiết "
                        {...register("content")}
                      />
                      <span>{errors.content?.message}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div>
                        <input
                          className="form-check-input pointer"
                          type="checkbox"
                          id="customizable"
                          {...register("customizable")}
                        />
                        <label
                          className="form-check-label pointer ps-1"
                          htmlFor="customizable"
                        >
                          Tuỳ biến 3D
                        </label>
                      </div>
                    </td>
                    <td>
                      {watchCustomizable && !hasModel && (
                        <div>
                          <label htmlFor="model" className="form-label">
                            Model 3D
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            accept={".glb"}
                            id="model"
                            {...register("model")}
                            onChange={(e) => onChangeInputFileModel(e)}
                          />
                          <span>{errors.model?.message}</span>
                        </div>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className={"px-2 pt-3"}>
                {fields?.length > 0 && watchCustomizable && (
                  <table className={"table-material mb-3"}>
                    <thead>
                      <tr>
                        <td className={"text-start"}>Thành phần</td>
                        <td>
                          Tên hiển thị{" "}
                          <span className="error-message"> (*)</span>
                        </td>
                        <td className={"p-1"}>Thêm ảnh</td>
                        <td className={"p-1"}>Thêm chữ</td>
                        <td className={"p-1"}>Thêm màu</td>
                      </tr>
                      <tr>
                        <td>
                          <br />
                        </td>
                      </tr>
                    </thead>

                    <tbody>
                      {fields?.map(
                        (
                          {
                            id,
                            defaultName,
                            vnName,
                            canAddImg,
                            canAddText,
                            canAddColor,
                            materialId,
                          },
                          index
                        ) => (
                          <React.Fragment key={id}>
                            <tr>
                              <td className={"text-start"}>
                                <span className={" text-ellipsis"}>
                                  {defaultName}
                                </span>
                              </td>
                              <td className={"d-flex justify-content-center"}>
                                <input
                                  className={
                                    "form-control w-75 mate-name mb-1 mt-3"
                                  }
                                  required
                                  {...register(
                                    `defaultMaterials[${index}].vnName`
                                  )}
                                  defaultValue={vnName}
                                />
                              </td>
                              <td>
                                <input
                                  className="form-check-input pointer"
                                  type={"checkbox"}
                                  {...register(
                                    `defaultMaterials[${index}].canAddImg`
                                  )}
                                  defaultChecked={canAddImg}
                                />
                              </td>
                              <td>
                                <>
                                  <input
                                    type={"checkbox"}
                                    {...register(
                                      `defaultMaterials[${index}].canAddText`
                                    )}
                                    className={`form-check-input pointer ${
                                      watchDefaultMaterials &&
                                      watchDefaultMaterials[index]?.canAddImg
                                        ? ""
                                        : "d-none"
                                    }`}
                                    defaultChecked={canAddText && canAddImg}
                                  />
                                  <Tooltip
                                    title="Hoạt động khi cho phép thêm ảnh"
                                    placement="right"
                                  >
                                    <input
                                      type={"checkbox"}
                                      disabled
                                      className={`${
                                        watchDefaultMaterials &&
                                        watchDefaultMaterials[index]?.canAddImg
                                          ? "d-none"
                                          : ""
                                      }`}
                                    />
                                  </Tooltip>
                                </>
                              </td>
                              <td>
                                <input
                                  className="form-check-input pointer"
                                  type={"checkbox"}
                                  {...register(
                                    `defaultMaterials[${index}].canAddColor`
                                  )}
                                  defaultChecked={canAddColor}
                                />
                              </td>
                            </tr>
                            {watchDefaultMaterials &&
                              watchDefaultMaterials[index]?.canAddImg && (
                                <tr>
                                  <td colSpan={5}>
                                    <ChooseTextureImage
                                      methods={methods}
                                      name={`defaultMaterials[${index}]`}
                                      nestedFieldIndex={index}
                                      materialId={materialId}
                                    />
                                  </td>
                                </tr>
                              )}
                          </React.Fragment>
                        )
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
          {/*right side bar*/}
          <div className="side-bar-right bg-white bg-shadow col-12 col-md-3 mb-md-5 mb-2 pb-md-4 pb-2">
            {/*<div className={"sticky-bar-top"}>*/}
            <h5 className="px-3 pt-3">Danh mục</h5>
            <hr />
            <div className="px-3">
              <CategorySelectFormHook
                methods={methods}
                name={"categoryId"}
                isRequired
                label={"Chọn danh mục"}
              />
            </div>
            <h5 className="px-3 pt-3">Loại cá</h5>
            <div className="px-3  ">
              <FishCheckBoxFormHook methods={methods} name={"listFishId"} />
              {/*</div>*/}
            </div>
          </div>
          {/*end right side bar*/}
          {/*product image*/}
          <ChooseProductImage
            methods={methods}
            name={"imgList"}
            productId={product.data.productId}
          />
          {/*end product image*/}
          {/*variants*/}
          <CreateAndUpdateVariant
            methods={methods}
            name={"variantCollection"}
          />
          {/*end variants*/}
          <div className={"sticky-bar-bottom"}>
            <div className="col-12 bg-white bg-shadow submit-button-form">
              <YLButton variant="danger" type="submit" value="Hủy" />
              <YLButton variant="primary" type="submit" value="Xong" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ManagerProductEdit;
