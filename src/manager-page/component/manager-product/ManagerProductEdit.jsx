import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { setIsBack } from "redux/back-action/back-action";
import { useDispatch } from "react-redux";
import { useFieldArray, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import YLButton from "components/custom-field/YLButton";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./scss/add-new-product.scss";
import ManagerCategoryAPI from "api/manager-category-api";
import ManagerFishAPI from "api/manager-fish-api";
import ManagerProductAPI from "api/manager-product-api";
import CategorySelectFormHook from "./CategorySelectFormHook";
import FishCheckBoxFormHook from "./FishCheckBoxFormHook";
import YlInputFormHook from "../../../components/custom-field/YLInputFormHook";
import ChooseProductImage, { ChooseTextures } from "./ChooseProductImage";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import ChooseTextureImage from "./ChooseTextureImage";
import { Tooltip } from "@material-ui/core";

ManagerProductEdit.propTypes = {};

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

  const [isCustomWeight, setIsCustomWeight] = useState(false);
  const [isCustomModel, setIsCustomModel] = useState(false);
  // const [material3d, setMaterial3d] = useState([]);

  //validate form
  const schema = yup.object().shape({
    productName: yup.string().required("Tên sản phẩm không được để trống"),
    categoryId: yup.number().typeError("Danh mục không được để trống"),
  });
  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const {
    register,
    unregister,
    reset,
    getValues,
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
      { name: "material", value: product.material },
      { name: "minWeight", value: product.minWeight },
      { name: "maxWeight", value: product.maxWeight },
      { name: "productName", value: product.productName },
      { name: "visibleInStorefront", value: product.visibleInStorefront },
    ];
    defauValues.forEach(({ name, value }) => setValue(name, value));
    setIsCustomWeight(product.isCustomizeWeight);
    setIsCustomModel(product.customizable);
  };

  const getLinkImageByImgCollection = useCallback(
    (imgCollection) => {
      let imgs = [];
      if (imgCollection?.length > 0)
        for (const imgCollectionElement of imgCollection) {
          imgs.push(imgCollectionElement.linkImage);
        }

      return imgs;
    },
    [product?.data?.imageCollection]
  );
  useEffect(() => {
    console.log("render effect");
    const fetchProduct = async () => {
      try {
        const response = await ManagerProductAPI.getProductByID(productId);
        if (response.error) {
          throw new Error(response.error);
        } else {
          setProduct({
            data: response,
            loading: false,
            success: true,
          });
          setFormValues(response);
        }
      } catch (error) {
        console.log("fail to fetch customer list");
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    if (canBack) {
      const action = setIsBack({
        canBack: canBack.canBack,
        path: canBack.path,
        label: canBack.label,
      });
      dispatch(action);
    }
  }, [canBack]);

  //===========handle form
  const onSubmit = (data) => {
    console.log(data);
  };

  const handleChangeCustomWeight = (e) => {
    console.log(e.target.checked);
    setIsCustomWeight(e.target.checked);
  };
  const handleChangeCustomModel = (e) => {
    setIsCustomModel(e.target.checked);
  };
  const [canAddImgs, setCanAddImgs] = useState([]);
  const onChangeInputFileModel = (e) => {
    const file = e.target.files[0];
    if (file) {
      remove();
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
        setCanAddImgs(materials);
      });
    }
  };

  const handleChangeCanAddImg = (e, index) => {
    let can = [...canAddImgs];
    if (can[index]) can[index].canAddImg = e.target.checked;
    console.log(can, index);
    setCanAddImgs(can);
  };
  //============
  return (
    <div>
      <h3>Tạo sản phẩm mới</h3>
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
                        {...register("isCustomizeWeight")}
                        onChange={handleChangeCustomWeight}
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
                      {isCustomWeight && (
                        <div className="d-flex">
                          <div className="col-6">
                            <YlInputFormHook
                              name={"minWeight"}
                              methods={methods}
                              label={"Tối thiểu"}
                              placeholder={"(g)"}
                              isRequired
                            />
                          </div>
                          <div className="col-6">
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
                        {" "}
                        <input
                          className="form-check-input pointer"
                          type="checkbox"
                          id="customizable"
                          {...register("customizable")}
                          onChange={handleChangeCustomModel}
                        />
                        <label
                          className="form-check-label pointer ps-1"
                          htmlFor="customizable"
                        >
                          Tuỳ biến 3D
                        </label>
                      </div>
                      {/*{isCustomModel && (*/}
                      {/*  <h6 className={"mt-2"}>Tên sản phẩm</h6>*/}
                      {/*)}*/}
                    </td>
                    <td>
                      {isCustomModel && (
                        <div>
                          <label htmlFor="model" className="form-label">
                            Model 3D
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            accept={".glb"}
                            id="model"
                            placeholder="Link model 3D"
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
                {fields?.length > 0 && isCustomModel && (
                  <table className={"table-material mb-3"}>
                    <thead>
                      <tr>
                        <td className={"text-start"}>Thành phần</td>
                        <td>Tên hiển thị</td>
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
                      {fields.map(({ id, defaultName }, index) => (
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
                              />
                            </td>
                            <td>
                              <input
                                type={"checkbox"}
                                {...register(
                                  `defaultMaterials[${index}].canAddImg`
                                )}
                                onChange={(e) =>
                                  handleChangeCanAddImg(e, index)
                                }
                              />
                            </td>
                            <td>
                              <>
                                <input
                                  type={"checkbox"}
                                  {...register(
                                    `defaultMaterials[${index}].canAddText`
                                  )}
                                  className={`${
                                    canAddImgs[index]?.canAddImg ? "d-none" : ""
                                  }`}
                                />
                                <Tooltip
                                  title="Hoạt động khi cho phép thêm ảnh"
                                  placement="right"
                                >
                                  <input
                                    type={"checkbox"}
                                    disabled
                                    className={`${
                                      canAddImgs[index]?.canAddImg
                                        ? ""
                                        : "d-none"
                                    }`}
                                  />
                                </Tooltip>
                              </>
                            </td>
                            <td>
                              <input
                                type={"checkbox"}
                                {...register(
                                  `defaultMaterials[${index}].canAddColor`
                                )}
                              />
                            </td>
                          </tr>
                          {canAddImgs[index]?.canAddImg && (
                            <tr>
                              <td colSpan={5}>
                                <ChooseTextureImage
                                  methods={methods}
                                  name={`defaultMaterials[${index}].textures`}
                                  imgList={[]}
                                />
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
          {/*right side bar*/}
          <div className="side-bar-right bg-white bg-shadow col-12 col-md-3 mb-md-5 mb-2 pb-md-4 pb-2">
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
            </div>
          </div>
          {/*end right side bar*/}
          {/*product image*/}
          <ChooseProductImage
            methods={methods}
            name={"imgList"}
            imgList={getLinkImageByImgCollection(
              product?.data?.imageCollection
            )}
          />
          {/*end product image*/}
          {/*variants*/}
          <div className="product-info bg-white bg-shadow col-12 col-md-8 mb-md-5 mb-2 pb-2">
            <div className="px-3 pt-3 product-images-add">
              <h5>Variant</h5>
              <input
                hidden
                multiple
                id="variant"
                // onChange={imageHandleChange}
              />
              <label htmlFor="variant" className="pointer">
                Tạo biến thể
              </label>
            </div>
            <hr />
          </div>
          {/*end variants*/}
          <div className="col-12 bg-white bg-shadow submit-button-form">
            <YLButton variant="danger" type="submit" value="Hủy" />
            <YLButton variant="primary" type="submit" value="Xong" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default ManagerProductEdit;
