import { yupResolver } from "@hookform/resolvers/yup";
import ManagerCategoryAPI from "api/manager-category-api";
import ManagerFishAPI from "api/manager-fish-api";
import ProductAPI from "api/product-api";
import YLButton from "components/custom-field/YLButton";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setIsBack } from "redux/back-action/back-action";
import * as yup from "yup";
import "./scss/add-new-product.scss";
import Generate3DMaterial from "./Generate3dMaterial";
import { uploadMultiFiles } from "../../../api/manager-product-api";

ManagerProductAddNew.propTypes = {};

function ManagerProductAddNew(props) {
  const canBack = props.location.canBack;
  const history = useHistory();
  const dispatch = useDispatch();
  const productId = props.match.params.id;

  const [selectedImages, setSelectedImage] = useState([]);
  const [fileImages, setFileImage] = useState([]);
  const [selectedImagesName, setSelectedImageName] = useState([]);
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
    // console.log(e.target.files);
    let file = Array.from(e.target.files);
    if (file) {
      setFileImage((prevState) => prevState.concat(file));
      // let bb = isExist(selectedImagesName, file);
      // console.log(bb);
      console.log(file);
      // console.log(selectedImagesName);

      for (let i = 0; i < file.length; i++) {
        setSelectedImageName((preName) => preName.concat(file[i]?.name));
      }
      if (selectedImagesName) {
        for (let i = 0; i < selectedImagesName.length; i++) {
          let nameImage = selectedImagesName[i];
          file = file.filter((f) => f.name != nameImage);
        }
      }

      const fileArray = file.map((file) => URL.createObjectURL(file));
      // console.log(fileArray);
      setSelectedImage((preImages) => preImages.concat(fileArray));
      file.map((file) => URL.revokeObjectURL(file));
    }
  };
  const handleDeleteImage = (e) => {
    console.log(e.target.src);
    console.log(selectedImages);
    setSelectedImage((preImages) =>
      preImages.filter((value) => value != e.target.src)
    );
    // let blob = await fetch(url).then(r => r.blob());
  };
  const RenderPhotos = (sourse) => {
    if (sourse?.length < 1) return <span>Chưa có hình ảnh</span>;
    return sourse?.map((src, i) => {
      return (
        <div className="img-item" key={"imgfile" + i}>
          <img
            src={src}
            key={"img-list-" + i}
            className="pointer"
            onClick={handleDeleteImage}
          />
          <button className="btn btn-light">Xóa</button>
        </div>
      );
    });
  };

  const [changeWeight, setChangeWeight] = useState(false);
  const [changeModel, setChangeModel] = useState(false);
  const schema = yup.object().shape({
    // productname: yup.string().required("Tên sản phẩm không được để trống"),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    // let fin = { ...data, imgList: fileImages };
    // console.log(fin);
    try {
      const fileLinks = await uploadMultiFiles(fileImages);
      console.log(fileLinks);
    } catch (e) {
      console.log("errors at upload product", e);
    }

    //selectedImages
  };

  const Select = React.forwardRef(({ onChange, onBlur, name, label }, ref) => (
    <>
      <label>{label}</label>
      <select
        name={name}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        className="form-select"
        defaultValue={categoryList[0]?.categoryID}
      >
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
              name="fishList"
              className="form-check-input pointer"
              type="checkbox"
              value={fish.fishID}
              id={"fishId" + fish.fishID}
              {...register("fishList")}
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
              <table>
                <tbody>
                  <tr>
                    <td>
                      <label htmlFor="productname" className="form-label">
                        Tên sản phẩm <span className="error-message">(*)</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.productname ? "outline-red" : ""
                        }`}
                        id="productname"
                        placeholder="Tên sản phẩm"
                        {...register("productname")}
                      />
                      <span className="error-message">
                        {errors.productname?.message}
                      </span>
                    </td>
                    <td>
                      <label htmlFor="brand" className="form-label">
                        Thương hiệu <span className="error-message">(*)</span>
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
                        type="text"
                        className="form-control"
                        id="price"
                        placeholder="Giá"
                        {...register("defaultPrice")}
                      />
                      <span>{errors.price?.message}</span>
                    </td>
                    <td>
                      <label htmlFor="length" className="form-label">
                        Chiều dài
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="length"
                        placeholder="Chiều dài (cm)"
                        {...register("length")}
                      />
                      <span>{errors.length?.message}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="hook" className="form-label">
                        Cỡ lưỡi <span className="error-message">(*)</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="hook"
                        placeholder="Cỡ lưỡi"
                        {...register("hookSize")}
                      />
                      <span>{errors.hook?.message}</span>
                    </td>
                    <td>
                      <label htmlFor="deepDiving" className="form-label">
                        Lặn sâu
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="deepDiving"
                        placeholder="Lặn sâu"
                        {...register("deepDiving")}
                      />
                      <span>{errors.deepDiving?.message}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="material" className="form-label">
                        Chất liệu
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="material"
                        placeholder="Chất liệu"
                        {...register("material")}
                      />
                      <span>{errors.material?.message}</span>
                    </td>

                    <td>
                      <label htmlFor="weight-default" className="form-label">
                        Độ nặng mặc định (g)
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="weight-default"
                        placeholder="Độ nặng mặc định (g)"
                        {...register("defaultWeight")}
                      />
                      <span>{errors.weightDefault?.message}</span>
                    </td>
                  </tr>

                  <tr>
                    <td colSpan="2">
                      <label htmlFor="description" className="form-label">
                        Mô tả
                      </label>
                      <textarea
                        type="text"
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
              <h5>Danh mục</h5>
            </div>
            <hr />
            <div className="px-3">
              <Select {...register("categoryId")} />
            </div>
            <div className="px-3 pt-3">
              <h5>Loại cá</h5>
            </div>
            <hr />
            <div className="px-3 mb-3 cate-fish">
              <CheckBox {...register("listFishId")} />
            </div>
            <hr />
          </div>
          <div className="product-info bg-white bg-shadow col-12 col-md-8 mb-md-5 mb-2 pb-2">
            <div className="px-3 pt-3 product-images-add">
              <h5>Hình ảnh</h5>
              <input
                {...register("imgList")}
                hidden
                type="file"
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
              {RenderPhotos(selectedImages)}
            </div>
          </div>

          <div className="col-12 bg-white bg-shadow submit-button-form">
            <YLButton variant="danger" type="submit" value="Hủy" />
            <YLButton variant="primary" type="submit" value="Xong" />
          </div>
        </div>
      </form>
      {/*<Generate3DMaterial />*/}
    </div>
  );
}

export default ManagerProductAddNew;
