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
  const renderPhotos = (sourse) => {
    if (sourse?.length < 1) return <span>Chưa có hình ảnh</span>;
    return sourse?.map((src, i) => {
      return (
        <div className="img-item">
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
    productname: yup.string().required("Tên sản phẩm không được để trống"),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    let fin = { ...data, imgList: fileImages };
    console.log(fin);

    //selectedImages
  };

  const handleChangeCustomWeight = (e) => {
    console.log(e.target.checked);
    setChangeWeight(e.target.checked);
  };
  const handleChangeCustomModel = (e) => {
    setChangeModel(e.target.checked);
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
      >
        {categoryList?.list.map((cate, i) => (
          <option key={"option" + i} value={cate.categoryID}>
            {cate.categoryName}
          </option>
        ))}
      </select>
    </>
  ));
  const CheckBox = React.forwardRef(
    ({ onChange, onBlur, name, label }, ref) => (
      <div class="form-check">
        {fishList?.list?.map((fish, i) => (
          <div key={"fish" + i}>
            <input
              name="fishList"
              class="form-check-input pointer"
              type="checkbox"
              value={fish.fishID}
              id={fish.fishID}
              {...register("fishList")}
            />
            <label class="form-check-label pointer" for={fish.fishID}>
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
                      <label for="productname" className="form-label">
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
                      <label for="weight-default" className="form-label">
                        Độ nặng mặc định (g)
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="weight-default"
                        placeholder="Độ nặng mặc định (g)"
                        {...register("weightDefault")}
                      />
                      <span>{errors.weightDefault?.message}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label for="price" className="form-label">
                        Giá
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="price"
                        placeholder="Giá"
                        {...register("price")}
                      />
                      <span>{errors.price?.message}</span>
                    </td>
                    <td>
                      <label for="length" className="form-label">
                        chiều dài (cm)
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="length"
                        placeholder="chiều dài (cm)"
                        {...register("length")}
                      />
                      <span>{errors.length?.message}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label for="hook" className="form-label">
                        Số lượng móc
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="hook"
                        placeholder="Số lượng móc"
                        {...register("hook")}
                      />
                      <span>{errors.hook?.message}</span>
                    </td>
                    <td>
                      <label for="deepDiving" className="form-label">
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
                      <label for="material" className="form-label">
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
                      <label for="brand" className="form-label">
                        Nhãn hiệu
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="brand"
                        placeholder="Nhãn hiệu"
                        {...register("brand")}
                      />
                      <span>{errors.brand?.message}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        class="form-check-input pointer"
                        type="checkbox"
                        id="customize"
                        {...register("customize")}
                        onChange={handleChangeCustomModel}
                        defaultChecked={false}
                      />
                      <label class="form-check-label pointer" for="customize">
                        Customize
                      </label>
                      <span>{errors.customize?.message}</span>
                    </td>
                    <td>
                      <input
                        class="form-check-input pointer"
                        type="checkbox"
                        id="customize-weight"
                        {...register("customizeWeight")}
                        onChange={handleChangeCustomWeight}
                        defaultChecked={false}
                      />
                      <label for="customize-weight" className="form-label">
                        Customizable độ nặng
                      </label>
                      <span>{errors.customizeWeight?.message}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {changeModel && (
                        <div>
                          <label for="model" className="form-label">
                            Link model 3D
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="model"
                            placeholder="Link model 3D"
                            {...register("model")}
                          />
                          <span>{errors.model?.message}</span>
                        </div>
                      )}
                    </td>
                    <td>
                      {changeWeight && (
                        <div className="d-flex">
                          <div className="col-6">
                            <label for="weight-max" className="form-label">
                              Max (g)
                            </label>
                            <input
                              type="number"
                              className="form-control input-customize-weight"
                              id="weight-max"
                              placeholder="Max"
                              {...register("weightMax")}
                            />

                            <span>{errors.weightMax?.message}</span>
                          </div>
                          <div className="col-6">
                            <label for="weight-min" className="form-label">
                              Min
                            </label>
                            <input
                              type="number"
                              className="form-control  input-customize-weight"
                              id="weight-min"
                              placeholder="Min (g)"
                              {...register("weightMin")}
                            />

                            <span>{errors.weightMin?.message}</span>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td colSpan="2">
                      <label for="description" className="form-label">
                        Mô tả
                      </label>
                      <textarea
                        type="text"
                        className="form-control"
                        id="description"
                        placeholder="Mô tả"
                        {...register("description")}
                      ></textarea>
                      <span>{errors.description?.message}</span>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <label for="descriptionMore" className="form-label">
                        Mô tả chi tiết
                      </label>
                      <textarea
                        type="text"
                        className="form-control"
                        id="descriptionMore"
                        placeholder="Mô tả chi tiết "
                        {...register("descriptionMore")}
                      ></textarea>
                      <span>{errors.descriptionMore?.message}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div
            className="cate-fish bg-box bg-shadow col-12 col-md-3 mb-md-5 mb-2 pb-md-4 pb-2"
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
            <div className="px-3">
              <CheckBox {...register("fishList")} />
            </div>
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
                onChange={imageHandleChange}
              />
              <label htmlFor="file" className="pointer">
                <i className="fal fa-images"></i> Thêm hình ảnh
              </label>
            </div>
            <hr />
            <div className="px-3 manager-product-imgList">
              {renderPhotos(selectedImages)}
            </div>
          </div>
          {/* <div className="product-info bg-white bg-shadow col-12 col-md-8 mb-md-5 mb-2 pb-2">
            <div className="px-3 pt-3 product-images-add">
              <h5>Variant</h5>
              <input
                hidden
                multiple
                id="variant"
                onChange={imageHandleChange}
              />
              <label htmlFor="variant" className="pointer">
                Tạo biến thể
              </label>
            </div>
            <hr />
          </div> */}
          <div className="col-12 bg-white bg-shadow submit-button-form">
            <YLButton variant="danger" type="submit" value="Hủy" />
            <YLButton variant="primary" type="submit" value="Xong" />
          </div>
        </div>
      </form>
      <Generate3DMaterial />
    </div>
  );
}

export default ManagerProductAddNew;
