import { yupResolver } from "@hookform/resolvers/yup";
import ManagerCategoryAPI from "api/manager-category-api";
import ProductAPI from "api/product-api";
import YLButton from "components/custom-field/YLButton";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import * as yup from "yup";

import "./scss/manage-product-and-variant.scss";
import {
  creatProduct,
  uploadMultiFiles,
} from "../../../../api/manager-product-api";
import CircularProgress from "@material-ui/core/CircularProgress";
import DEFINELINK from "../../../../routes/define-link";
import YlInputFormHook from "../../../../components/custom-field/YLInputFormHook";
import { VALIADATE_SCHEMA_PRODUCT_BASE } from "./ManagerProductEdit";
import { createVariant } from "../../../../api/manager-variant-api";
import {
  ADD_PRODUCT_STEPS,
  SUPPORTED_IMAGE_FORMATS,
} from "../../../../constants/product-config";
import Stepper from "./stepper/Stepper";
import { getUniqueFiles } from "utils/prototype";
import useUnsavedChangeWarning from "../../../../hook/useUnsavedChangeWarning";

ManagerProductAddNew.propTypes = {};

function ManagerProductAddNew(props) {
  const history = useHistory();

  const [submitStatus, setSubmitStatus] = useState({
    isLoading: false,
    isSuccess: false,
  });
  const [fileImages, setFileImage] = useState([]);
  const [categoryList, setCategoryList] = useState({
    list: [],
    loading: true,
    success: false,
  });
  const [fishList, setFishList] = useState({
    list: [],
    loading: true,
    success: false,
  });
  const handleChangeCustomWeight = (e) => {
    const value = e.target.checked;
    setChangeWeight(value);
    if (!value) {
      unregister("minWeight");
      unregister("maxWeight");
    }
  };
  const fetchFish = async () => {
    try {
      const response = await ProductAPI.getAllFish();
      if (response.error) {
        throw new Error(response.error);
      } else {
        setFishList({
          list: response,
          loading: false,
          success: true,
        });
      }
    } catch (error) {
      console.log("fail to fetch customer list");
    }
  };
  const fetchCategory = async () => {
    try {
      const response = await ManagerCategoryAPI.getAll();
      if (response.error) {
        throw new Error(response.error);
      } else {
        setCategoryList({
          list: response,
          loading: false,
          success: true,
        });
      }
    } catch (error) {
      console.log("fail to fetch customer list");
    }
  };
  const imageHandleChange = (e) => {
    let file = Array.from(e.target.files);

    if (file) {
      let temp = [...fileImages];
      setFileImage(getUniqueFiles(temp.concat(file)));
    }
  };
  const handleDeleteImage = (e) => {
    let files = [];
    for (let i = 0; i < fileImages.length; i++) {
      if (e.target.id !== "imgUpload" + i) {
        files.push(fileImages[i]);
      }
    }
    setFileImage(files);
  };
  const RenderPhotos = (sourse) => {
    if (sourse?.length < 1) return <span>Chưa có hình ảnh</span>;
    return sourse?.map((src, i) => {
      return (
        <div className="img-item" key={"imgfile" + i}>
          <img
            id={"imgUpload" + i}
            src={URL.createObjectURL(src)}
            key={i}
            className="pointer"
            onClick={handleDeleteImage}
          />
          <button className="btn btn-light">Xóa</button>
        </div>
      );
    });
  };

  const [changeWeight, setChangeWeight] = useState(false);

  const schema = yup.object().shape({
    ...VALIADATE_SCHEMA_PRODUCT_BASE,
    description: yup.string().required("Mô tả không được để trống"),
    imgList: yup
      .mixed()
      .test("fileType", "Vui lòng chọn ảnh .png, .jpg, .jpeg", () => {
        for (const file of fileImages) {
          if (!SUPPORTED_IMAGE_FORMATS.includes(file.type)) {
            return false;
          }
        }
        return true;
      })
      .test("fileRequired", "Vui lòng chọn ảnh sản phẩm", () => {
        return fileImages.length > 0;
      }),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  const {
    register,
    unregister,
    formState: { errors, isDirty },
    handleSubmit,
  } = methods;
  console.log(errors);

  // const [Prompt, setIsDirty] = useUnsavedChangeWarning();
  // useEffect(() => {
  //   setIsDirty(isDirty);
  // }, [isDirty]);

  const onSubmit = async (data) => {
    // setIsDirty(false);
    if (data.listFishId === false) {
      data.listFishId = [];
    }
    // load status
    setSubmitStatus({
      isLoading: true,
      isSuccess: false,
    });
    try {
      //upload product image
      const fileLinks = await uploadMultiFiles(fileImages);
      console.log(fileLinks);
      const submitParam = {
        ...data,
        customizable: false,
        imgListInput: fileLinks,
        visibleInStorefront: true,
      };
      const response = await creatProduct(submitParam);
      //create default variant
      const variantParam = {
        imageUrl: fileLinks[0],
        newPrice: data.defaultPrice,
        productId: response,
        quantity: 1,
        variantName: "Mặc định",
      };
      await createVariant(variantParam);
      // load status
      setSubmitStatus({
        isLoading: false,
        isSuccess: true,
      });
      history.push(
        `${
          DEFINELINK.manager + DEFINELINK.managementProduct
        }/edit/${response}?continuesAdd=true#imgList`
      );
    } catch (e) {
      setSubmitStatus({
        isLoading: false,
        isSuccess: false,
      });
      console.log("errors at upload product", e);
    }
  };

  const Select = React.forwardRef(({ onChange, onBlur, name, label }, ref) => (
    <>
      <select
        name={name}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        className="form-select"
      >
        <option>Chọn danh mục</option>
        {categoryList?.list.map((cate, i) => (
          <option key={"cateOption" + i} value={cate.categoryID}>
            {cate.categoryName}
          </option>
        ))}
      </select>
    </>
  ));
  const CheckBox = React.forwardRef(
    ({ onChange, onBlur, name, label }, ref) => (
      <div className="form-check">
        {fishList?.list?.map((fish, i) => (
          <div key={"fish" + i}>
            <input
              className="form-check-input pointer"
              type="checkbox"
              value={fish.fishID}
              id={"fishId" + fish.fishID}
              {...register("listFishId")}
            />
            <label
              className="form-check-label pointer text-ellipsis w-100"
              htmlFor={"fishId" + fish.fishID}
            >
              {fish.fishName}
            </label>
          </div>
        ))}
      </div>
    )
  );

  useEffect(async () => {
    await fetchCategory();
    await fetchFish();
  }, []);

  return (
    <div>
      {/* {Prompt} */}
      <h3>Tạo sản phẩm mới</h3>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className=" product-add-new-form row">
          <div
            className="product-info bg-box bg-shadow col-12 col-md-8 mb-md-5 mb-2 pb-2"
            id="product-info"
          >
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
                        type={"number"}
                        placeholder={"\u20AB"}
                        isRequired
                      />
                    </td>
                    <td>
                      <YlInputFormHook
                        name={"length"}
                        methods={methods}
                        label={"Chiều dài"}
                        type={"number"}
                        step={"any"}
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
                        label={"Trọng lượng"}
                        type={"number"}
                        placeholder={"(g)"}
                        step={"any"}
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
                        defaultChecked={false}
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
                      {changeWeight && (
                        <div className="d-flex flex-wrap justify-content-between">
                          <div className={"w-100"}>
                            <YlInputFormHook
                              name={"minWeight"}
                              methods={methods}
                              label={"Tối thiểu"}
                              placeholder={"(g)"}
                              type={"number"}
                              step={"any"}
                              isRequired
                            />
                          </div>
                          <div className={"w-100"}>
                            <YlInputFormHook
                              name={"maxWeight"}
                              methods={methods}
                              label={"Tối đa"}
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
                        Mô tả <span className="error-message">(*)</span>
                      </label>
                      <textarea
                        className={`form-control ${
                          errors.description ? "outline-red" : ""
                        }`}
                        id="description"
                        placeholder="Mô tả"
                        {...register("description")}
                        onBlur={(e) => {
                          e.target.value = e.target.value.trim();
                          register("description").onBlur(e);
                        }}
                      />
                      <span className="error-message">
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
                        onBlur={(e) => {
                          e.target.value = e.target.value.trim();
                          register("content").onBlur(e);
                        }}
                      />
                      <span>{errors.descriptionMore?.message}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div
            className=" bg-box bg-shadow col-12 col-md-3 mb-md-5 mb-2 pb-md-4 pb-2"
            id="cate-fish"
          >
            <div className="px-3 pt-3">
              <h5>
                Danh mục <span className="error-message">(*)</span>
              </h5>{" "}
            </div>
            <hr />
            <div className="px-3">
              <Select {...register("categoryId")} />
              <span className="error-message">
                {errors.categoryId?.message}
              </span>{" "}
            </div>
            <div className="px-3 pt-3">
              <h5>Loại cá</h5>
            </div>
            <hr className={"mb-1"} />
            <div className="px-3 mb-3 cate-fish">
              <CheckBox {...register("listFishId")} />
            </div>
            <hr className={"mt-1"} />
          </div>
          <div className="product-info bg-white bg-shadow col-12 col-md-8 mb-md-5 mb-2 pb-2">
            <div className="px-3 pt-3 product-images-add">
              <h5>
                Hình ảnh <span className="error-message">(*)</span>
              </h5>
              <input
                type="file"
                hidden
                multiple
                id="file"
                accept={"image/*"}
                onChange={imageHandleChange}
              />
              <label htmlFor="file" className="pointer">
                <i className="fal fa-images" /> Thêm hình ảnh
              </label>
            </div>
            <hr />
            <div className="px-3 manager-product-imgList">
              {RenderPhotos(fileImages)}
            </div>
            <br />
            <span className={"error-message ms-3"}>
              {errors.imgList?.message}
            </span>
          </div>
          <div className={"sticky-bar-bottom"}>
            <div className="col-12 bg-white bg-shadow submit-button-form">
              <YLButton
                variant="danger"
                to={DEFINELINK.manager + DEFINELINK.managementProduct}
                value="Hủy"
                height={"38px"}
              />
              <Stepper steps={ADD_PRODUCT_STEPS} />
              <YLButton
                variant="primary"
                type="submit"
                disabled={submitStatus.isLoading}
                height={"38px"}
              >
                {submitStatus.isLoading ? (
                  <CircularProgress size={20} className="circle-progress" />
                ) : (
                  "Thêm"
                )}
              </YLButton>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ManagerProductAddNew;
