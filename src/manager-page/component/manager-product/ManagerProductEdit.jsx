import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import YLButton from "components/custom-field/YLButton";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import "./scss/manage-product-and-variant.scss";
import ManagerProductAPI, {
  creatModel,
  updateModelById,
  updateProductById,
  uploadMultiFiles,
} from "api/manager-product-api";
import CategorySelectFormHook from "./CategorySelectFormHook";
import FishCheckBoxFormHook from "./FishCheckBoxFormHook";
import YlInputFormHook from "../../../components/custom-field/YLInputFormHook";
import ChooseProductImage from "../../../components/choose-image/ChooseMultiImages";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import ChooseTextureImage from "./ChooseTextureImage";
import { Tooltip } from "@material-ui/core";
import ShowVariant from "./variant/ShowVariant";
import ProductAPI from "../../../api/product-api";
import { promiseTexturesFiles } from "../../../utils/manager-product";
import { toast } from "react-toastify";
import DEFINELINK from "../../../routes/define-link";
import Loading from "../../../components/Loading";
import ErrorLoad from "../../../components/error-notify/ErrorLoad";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  ADD_PRODUCT_STEPS,
  SUPPORTED_IMAGE_FORMATS,
} from "../../../constant/product-config";

import HorizontalStepper from "./stepper/Stepper";

export const VALIADATE_SCHEMA_PRODUCT_BASE = {
  productName: yup
    .string()
    .typeError("Tên không được để trống")
    .required("Tên sản phẩm không được để trống"),
  categoryId: yup.number().typeError("Danh mục không được để trống"),
  defaultPrice: yup
    .number()
    .min(1, "Giá lớn hơn 0")
    .typeError("Giá không được để trông"),
  length: yup
    .number()
    .min(1, "Chiều dài lớn hơn 0")
    .typeError("Chiều dài không được để trống"),
  hookSize: yup
    .number()
    .min(1, "Cỡ lưỡi lớn hơn 0")
    .typeError("Cỡ lưỡi không được để trống"),
  deepDiving: yup.string().required("Lặn sâu không được để trống"),
  material: yup.string().required("Chất liệu không được để trống"),
  defaultWeight: yup
    .number()
    .min(1, "Trọng lượng lớn hơn 0")
    .typeError("Trọng lượng không được để trống"),
  minWeight: yup.mixed().when("isCustomizeWeight", {
    is: false,
    then: yup.mixed().nullable(),
    otherwise: yup
      .number()
      .typeError("Trọng lượng không được để trống")
      .max(yup.ref("defaultWeight"), "Nhỏ hơn hoặc bằng trọng lượng mặc định")
      .lessThan(yup.ref("maxWeight"), `Nhỏ hơn trọng lượng tối đa`),
  }),
  maxWeight: yup.mixed().when("isCustomizeWeight", {
    is: false,
    then: yup.mixed().nullable(),
    otherwise: yup
      .number()
      .typeError("Trọng lượng không được để trống")
      .min(yup.ref("defaultWeight"), "Lớn hơn hoặc bằng trọng lượng mặc định")
      .moreThan(yup.ref("minWeight"), `Lớn hơn trọng lượng tối thiểu`),
  }),
  description: yup.string().required("Mô tả không được để trống"),
};

function ManagerProductEdit(props) {
  const history = useHistory();

  const productId = props.match.params.id;
  const continuesAdd = new URLSearchParams(props.location.search).get(
    "continuesAdd"
  );

  const [product, setProduct] = useState({
    data: {},
    loading: true,
    success: false,
  });

  //validate form

  const schema = yup.object().shape({
    ...VALIADATE_SCHEMA_PRODUCT_BASE,

    imgList: yup
      .mixed()
      .when(["newImages"], {
        is: (newImages) => {
          console.log(newImages);
          return newImages.length < 1;
        },
        then: yup.array().min(1, "Vui lòng chọn ảnh sản phẩm"),
        otherwise: yup.array().min(0),
      })
      .test(
        "prodImgType",
        "Vui lòng chọn ảnh .png, .jpg, .jpeg",
        (value, context) => {
          const newImgs = context.parent.newImages;
          for (const file of newImgs) {
            if (!SUPPORTED_IMAGE_FORMATS.includes(file.type)) {
              return false;
            }
          }
          return true;
        }
      ),
    model: yup.mixed().when("customizable", {
      is: true,
      then: yup
        .mixed()
        .test("modelRq", "Vui lòng chọn 1 file model", (value, context) => {
          console.log(value);
          if (hasModel) return true;
          else {
            if (!value) return false;
            else {
              const v = value[0] && value[0]?.name ? value[0].name : false;
              return v;
            }
          }
        })
        .test(
          "modelType",
          "Vui lòng chọn 1 file model định dạng .glb",
          (value) => {
            if (hasModel) return true;
            if (value) {
              const v = value[0] && value[0]?.name ? value[0].name : "";
              if (v.endsWith(".glb")) return true;
            } else return false;
          }
        ),
      otherwise: yup.mixed().nullable(),
    }),

    defaultMaterials: yup.mixed().when("customizable", {
      is: true,
      then: yup.array().of(
        yup.object().shape({
          vnName: yup.string().required("Tên hiển thị không được để trống"),
          textureBeforeUpload: yup
            .mixed()
            .test(
              "rqTexture",
              "Vui lòng chọn ảnh texture .png, .jpg, .jpeg",
              (value, testContext) => {
                const parent = testContext.parent;
                const canAddImg = parent?.canAddImg;

                if (canAddImg) {
                  const bf = parent.textureBeforeUpload?.length
                    ? parent.textureBeforeUpload.length
                    : 0;
                  const tt = parent.textures?.length
                    ? parent.textures.length
                    : 0;
                  return tt + bf > 0;
                } else {
                  return true;
                }
              }
            ),
        })
      ),
      otherwise: yup.mixed().nullable(),
    }),
  });
  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  const {
    register,
    watch,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
  } = methods;
  console.log(errors);
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
      { name: "visibleInStorefront", value: product.visibleInStorefront },
      { name: "imgListRemove", value: [] },
      { name: "imgListInput", value: [] },
      { name: "newImages", value: [] },
    ];
    defauValues.forEach(({ name, value }) => setValue(name, value));
  };

  const [hasModel, setHasModel] = useState(false);
  useEffect(() => {
    const fetchDataByProductId = async (productId) => {
      setProduct({ loading: true, success: false });

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
  const handleGetProductImageById = useCallback(async () => {
    const response = await ManagerProductAPI.getProductByID(productId);
    return response.imageCollection;
  }, [productId]);

  // generate material
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
            materials.push({
              defaultName: object.material.name,
              textureBeforeUpload: [],
              listIdTexturesRemove: [],
              canAddColor : true
            });
        });

        append(materials);
      });
    }
  };
  // for update check box fish
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
  // console.log(watch());
  const onSubmit = async (data) => {
    console.log("form submit", data);
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
        //handle upload texture
        let materialDtoInputs = data.defaultMaterials;
        const newTextures = data.newTextureFiles;
        const textureUploaded = await promiseTexturesFiles(newTextures);
        console.log("textureUploaded", textureUploaded);

        //map material with link upload
        if (textureUploaded) {
          materialDtoInputs.forEach((old, i, thisArray) => {
            textureUploaded.forEach((news) => {
              if (i === news.materialId) {
                thisArray[i].linkTextures = news.linkTextures;
              }
            });
          });
        }

        //upload model
        let modelUrl = await uploadMultiFiles(data.file3dUpload);
        const createModelParams = {
          defaultMaterials: materialDtoInputs,
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

      history.push(DEFINELINK.manager + DEFINELINK.product);
      toast.success("Thành công");
    } catch (e) {
      toast.error("Cập nhật thất bại");
    }
  };
  //============
  if (product.loading) {
    return <Loading hasLayout />;
  } else if (!product.success) {
    return <ErrorLoad hasLayout />;
  } else
    return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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
                          label={"Giá (\u20AB) "}
                          placeholder={"\u20AB"}
                          type={"number"}
                          step={"any"}
                          isRequired
                        />
                      </td>
                      <td>
                        <YlInputFormHook
                          name={"length"}
                          methods={methods}
                          label={"Chiều dài (cm)"}
                          placeholder={"(cm)"}
                          step={"any"}
                          type={"number"}
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
                          step={"any"}
                          type={"number"}
                          isRequired
                        />
                      </td>
                      <td>
                        <YlInputFormHook
                          name={"deepDiving"}
                          methods={methods}
                          label={"Lặn sâu"}
                          placeholder={"1m-4m ..."}
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
                          label={"Trọng lượng (g)"}
                          type={"number"}
                          step={"any"}
                          placeholder={"(g)"}
                          isRequired
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className={"my-2"}>
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
                        </div>
                      </td>
                      <td>
                        {isCustomizeWeight && (
                          <div className="d-flex flex-wrap  justify-content-between">
                            <div className={"w-100"}>
                              <YlInputFormHook
                                name={"minWeight"}
                                methods={methods}
                                label={"Tối thiểu (g) "}
                                placeholder={"(g)"}
                                step={"any"}
                                type={"number"}
                                isRequired
                              />
                            </div>
                            <div className={"w-100"}>
                              <YlInputFormHook
                                name={"maxWeight"}
                                methods={methods}
                                label={"Tối đa (g) "}
                                placeholder={"(g)"}
                                step={"any"}
                                type={"number"}
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
                        <span className={"error-message"}>
                          {errors.description?.message}
                        </span>
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
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <div className={"my-2"}>
                          <input
                            className="form-check-input pointer "
                            type="checkbox"
                            id="visibleInStorefront"
                            {...register("visibleInStorefront")}
                          />
                          <label
                            className="form-check-label pointer ps-1"
                            htmlFor="visibleInStorefront"
                          >
                            Cho phép kinh doanh
                          </label>
                        </div>
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
                            <span className="error-message">
                              {errors.model?.message}
                            </span>
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
                                  {/*none display*/}
                                </td>
                                <td className={"d-flex   flex-column"}>
                                  <input
                                    className={
                                      "form-control w-75 mate-name mb-1 mt-3"
                                    }
                                    {...register(
                                      `defaultMaterials[${index}].vnName`
                                    )}
                                    defaultValue={vnName}
                                  />
                                  <span className="error-message error-message-material-item text-left ">
                                    {errors?.defaultMaterials &&
                                      errors?.defaultMaterials[index]?.vnName
                                        ?.message}
                                  </span>
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
                                          watchDefaultMaterials[index]
                                            ?.canAddImg
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
                                      <span className="error-message error-message-material-item text-left ">
                                        {errors?.defaultMaterials &&
                                          errors?.defaultMaterials[index]
                                            ?.textureBeforeUpload?.message}
                                      </span>
                                    </td>
                                  </tr>
                                )}
                            </React.Fragment>
                          )
                        )}
                      </tbody>
                    </table>
                  )}
                  <span className="error-message">
                    {errors.defaultMaterials?.message}
                  </span>
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

            <div className=" bg-white bg-shadow  col-12 col-md-8 mb-md-5   ">
              <ChooseProductImage
                methods={methods}
                name={"imgList"}
                removeName={"imgListRemove"}
                getOldImage={handleGetProductImageById}
                fieldNameImgFromOldList={"linkImage"}
              />
              <span className="error-message">{errors.imgList?.message}</span>
            </div>
            {/*end product image*/}
            {/*variants*/}
            <ShowVariant productId={productId} />
            {/*end variants*/}
            <div className={"sticky-bar-bottom"}>
              <div className="col-12 bg-white bg-shadow submit-button-form">
                <YLButton variant="danger" type="submit" value="Hủy" />
                {continuesAdd && (
                  <HorizontalStepper
                    steps={ADD_PRODUCT_STEPS}
                    active={1}
                    completed={[0]}
                  />
                )}

                <YLButton
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <CircularProgress size={20} className="circle-progress" />
                  ) : (
                    "Xong"
                  )}
                </YLButton>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
}

export default ManagerProductEdit;
