import { yupResolver } from "@hookform/resolvers/yup";
import ManagerCategoryAPI from "api/manager-category-api";
import ProductAPI from "api/product-api";
import YLButton from "components/custom-field/YLButton";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setIsBack } from "redux/back-action/back-action";
import * as yup from "yup";
import * as Yup from "yup";
import "./scss/add-new-product.scss";
import {
  creatProduct,
  uploadMultiFiles,
} from "../../../api/manager-product-api";
import CircularProgress from "@material-ui/core/CircularProgress";
import DEFINELINK from "../../../routes/define-link";

ManagerProductAddNew.propTypes = {};

function ManagerProductAddNew(props) {
  const canBack = props.location.canBack;
  const history = useHistory();
  const dispatch = useDispatch();

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
      Array.prototype.uniqueName = function () {
        let a = this.concat();
        for (let i = 0; i < a.length; ++i) {
          for (let j = i + 1; j < a.length; ++j) {
            if (a[i].name === a[j].name) a.splice(j--, 1);
          }
        }
        return a;
      };
      setFileImage(fileImages.concat(file).uniqueName());
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
  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
  const schema = yup.object().shape({
    productName: yup.string().required("Tên sản phẩm không được để trống"),
    defaultPrice: yup.number().positive().required(),
    length: yup.number().positive().required(),
    hookSize: yup.number().typeError("Cỡ lưỡi là số dương"),
    deepDiving: yup.number().positive().required(),
    material: yup.string().required("Chất liệu không được để trống"),
    defaultWeight: yup.number().positive().required(),
    isCustomizeWeight: yup.boolean().required(),
    minWeight: yup
      .number()
      .typeError("Trọng lượng là số dương")
      .max(Yup.ref("defaultWeight"), `Nhỏ hơn hoặc bằng trọng lượng mặc định`),
    maxWeight: yup
      .number()
      .typeError("Trọng lượng là số dương")
      .min(Yup.ref("defaultWeight"), `Lớn hơn hoặc bằng trọng lượng mặc định`),

    description: yup.string().required("Mô tả không được để trống"),
    imgList: yup
      .mixed()
      .test("fileType", "Vui lòng chọn ảnh .png, .jpg, .jpeg", () => {
        for (const file of fileImages) {
          if (!SUPPORTED_FORMATS.includes(file.type)) {
            return false;
          }
        }
        return true;
      })
      .test("fileRequired", "Ảnh không được để trống", () => {
        return fileImages.length > 0;
      }),
    categoryId: yup.number().typeError("Danh mục không được để trống"),
  });

  const {
    register,
    unregister,
    formState: { errors },
    getValues,
    handleSubmit,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log(errors);
  const onSubmit = async (data) => {
    if (data.listFishId === false) {
      data.listFishId = [];
    }

    setSubmitStatus({
      isLoading: true,
      isSuccess: false,
    });
    try {
      const fileLinks = await uploadMultiFiles(fileImages);
      console.log(fileLinks);
      const submitParam = {
        ...data,
        customizable: false,
        imgList: fileLinks,
      };
      const response = await creatProduct(submitParam);
      setSubmitStatus({
        isLoading: false,
        isSuccess: true,
      });
      history.push(
        `${DEFINELINK.manager + DEFINELINK.managementProduct}/edit/${response}`
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
  useEffect(() => {
    fetchCategory();
    fetchFish();
  }, []);
  // trigger validate imgList
  useEffect(() => {
    trigger("imgList");
  }, [fileImages]);
  return (
    <div>
      <h3>Tạo sản phẩm mới</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                      <label htmlFor="productName " className="form-label">
                        Tên sản phẩm <span className="error-message">(*)</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.productName ? "outline-red" : ""
                        }`}
                        id="productName "
                        placeholder="Tên sản phẩm"
                        {...register("productName")}
                      />
                      <span className="error-message">
                        {errors.productName?.message}
                      </span>
                    </td>
                    <td>
                      <label htmlFor="brand" className="form-label">
                        Thương hiệu
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="brand"
                        placeholder="Thương hiệu"
                        {...register("brand")}
                      />
                      <span>{errors.brand?.message}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="price" className="form-label">
                        Giá <span className="error-message">(*)</span>
                      </label>
                      <input
                        type="number"
                        className={`form-control ${
                          errors.defaultPrice ? "outline-red" : ""
                        }`}
                        id="price"
                        placeholder={"\u20AB"}
                        {...register("defaultPrice")}
                      />
                      {errors.defaultPrice && (
                        <span className="error-message">Giá là số dương</span>
                      )}
                    </td>
                    <td>
                      <label htmlFor="length" className="form-label">
                        Chiều dài <span className="error-message">(*)</span>
                      </label>
                      <input
                        type="number"
                        className={`form-control ${
                          errors.length ? "outline-red" : ""
                        }`}
                        id="length"
                        placeholder="(cm)"
                        {...register("length")}
                      />
                      {errors.length && (
                        <span className="error-message">
                          Chiều dài là số dương
                        </span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="hook" className="form-label">
                        Cỡ lưỡi <span className="error-message">(*)</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.hookSize ? "outline-red" : ""
                        }`}
                        id="hook"
                        placeholder="Cỡ lưỡi"
                        {...register("hookSize")}
                      />

                      <span className="error-message">
                        {errors.hookSize?.message}
                      </span>
                    </td>
                    <td>
                      <label htmlFor="deepDiving" className="form-label">
                        Lặn sâu <span className="error-message">(*)</span>
                      </label>
                      <input
                        type="number"
                        className={`form-control ${
                          errors.deepDiving ? "outline-red" : ""
                        }`}
                        id="deepDiving"
                        placeholder="(m)"
                        {...register("deepDiving")}
                      />
                      {errors.deepDiving && (
                        <span className="error-message">
                          Lặn sâu là số dương
                        </span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="material" className="form-label">
                        Chất liệu <span className="error-message">(*)</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.material ? "outline-red" : ""
                        }`}
                        id="material"
                        placeholder="Nhựa, cao su..."
                        {...register("material")}
                      />
                      <span className="error-message">
                        {errors.material?.message}
                      </span>
                    </td>

                    <td>
                      <label htmlFor="weight-default" className="form-label">
                        Trọng lượng <span className="error-message">(*)</span>
                      </label>
                      <input
                        type="number"
                        className={`form-control ${
                          errors.defaultWeight ? "outline-red" : ""
                        }`}
                        id="weight-default"
                        placeholder="(g)"
                        {...register("defaultWeight")}
                      />
                      {errors.defaultWeight && (
                        <span className="error-message">
                          Trọng lượng là số dương
                        </span>
                      )}
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
                        <div className="d-flex">
                          <div className="col-6">
                            <label htmlFor="weight-min" className="form-label">
                              Tối thiểu
                            </label>
                            <input
                              type="number"
                              className={`form-control input-customize-weight ${
                                errors.minWeight ? "outline-red" : ""
                              }`}
                              id="weight-min"
                              placeholder="(g)"
                              {...register("minWeight")}
                            />

                            <span className="error-message">
                              {errors.minWeight?.message}
                            </span>
                          </div>
                          <div className="col-6">
                            <label htmlFor="weight-max" className="form-label">
                              Tối đa
                            </label>
                            <input
                              type="number"
                              className={`form-control input-customize-weight ${
                                errors.maxWeight ? "outline-red" : ""
                              }`}
                              id="weight-max"
                              placeholder="(g)"
                              {...register("maxWeight")}
                            />

                            <span className="error-message">
                              {errors.maxWeight?.message}
                            </span>
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
                        type="text"
                        className={`form-control ${
                          errors.description ? "outline-red" : ""
                        }`}
                        id="description"
                        placeholder="Mô tả"
                        {...register("description")}
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
                        type="text"
                        className="form-control"
                        id="content"
                        placeholder="Mô tả chi tiết "
                        {...register("content")}
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

          <div className="col-12 bg-white bg-shadow submit-button-form">
            <YLButton variant="danger" type="submit" value="Hủy" />
            <YLButton
              variant="primary"
              type="submit"
              disabled={submitStatus.isLoading}
            >
              {submitStatus.isLoading ? (
                <CircularProgress size={20} className="circle-progress" />
              ) : (
                "Thêm"
              )}
            </YLButton>
          </div>
        </div>
      </form>
      {/*<Generate3DMaterial />*/}
    </div>
  );
}

export default ManagerProductAddNew;
