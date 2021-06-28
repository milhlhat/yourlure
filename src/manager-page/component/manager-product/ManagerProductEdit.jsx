import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { setIsBack } from "redux/back-action/back-action";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import YLButton from "components/custom-field/YLButton";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./scss/add-new-product.scss";
import ManagerCategoryAPI from "api/manager-category-api";
import ManagerFishAPI from "api/manager-fish-api";
import ManagerProductAPI from "api/manager-product-api";

ManagerProductEdit.propTypes = {};

function ManagerProductEdit(props) {
  const canBack = props.location.canBack;
  const history = useHistory();
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [product, setProduct] = useState({
    list: null,
    loading: true,
    success: false,
  });
  const fetchProduct = async () => {
    try {
      const response = await ManagerProductAPI.getProductByID(productId);
      if (response.error) {
        throw new Error(response.error);
      } else {
        setProduct({
          list: response,
          loading: false,
          success: true,
        });
      }
    } catch (error) {
      console.log("fail to fetch customer list");
    }
  };

  const [selectedImages, setSelectedImage] = useState([]);
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
      const response = await ManagerFishAPI.getAll();
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
      setSelectedImage((preImages) => preImages.concat(fileArray));
      file.map((file) => URL.revokeObjectURL(file));
    }
  };
  const renderPhotos = (sourse) => {
    return sourse?.map((src, i) => {
      return <img width={50} src={src} key={i} />;
    });
  };

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
    console.log(data);
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
        {fishList?.list?.fishDtoOuts?.map((fish, i) => (
          <div key={"fish" + i}>
            <input
              class="form-check-input pointer"
              type="checkbox"
              value=""
              id={fish.fishID}
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
    fetchProduct();
  }, []);
  useEffect(() => {
    fetchProduct();
  }, [productId]);
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
              <table>
                <tbody>
                  <tr>
                    <td>
                      <label for="productname" className="form-label">
                        Tên sản phẩm <span className="error-message">(*)</span>
                      </label>
                      {console.log(product?.list)}
                      <input
                        defaultValue={product?.list?.productName}
                        type="text"
                        className={`form-control ${
                          errors.productname ? "outline-red" : ""
                        }`}
                        id="productname"
                        placeholder="Tên sản phẩm"
                        {...register("productname")}
                      />
                      <p className="error-message">
                        {errors.productname?.message}
                      </p>
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
                      <p>{errors.weightDefault?.message}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label for="price" className="form-label">
                        Giá
                      </label>
                      <input
                        defaultValue={product?.list?.productName}
                        type="number"
                        className="form-control"
                        id="price"
                        placeholder="Giá"
                        {...register("price")}
                      />
                      <p>{errors.price?.message}</p>
                    </td>
                    <td>
                      <label for="weight-min" className="form-label">
                        Độ nặng tối thiểu (g)
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="weight-min"
                        placeholder="Độ nặng tối thiểu (g)"
                        {...register("weightMin")}
                      />
                      <p>{errors.weightMin?.message}</p>
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
                      <p>{errors.hook?.message}</p>
                    </td>
                    <td>
                      <label for="weight-max" className="form-label">
                        Độ nặng tối đa (g)
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="weight-max"
                        placeholder="Độ nặng tối đa (g)"
                        {...register("weightmax")}
                      />
                      <p>{errors.weightmax?.message}</p>
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
                      <p>{errors.material?.message}</p>
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
                      <p>{errors.length?.message}</p>
                    </td>
                  </tr>
                  <tr>
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
                      <p>{errors.brand?.message}</p>
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
                      <p>{errors.deepDiving?.message}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        class="form-check-input pointer"
                        type="checkbox"
                        id="customize"
                        {...register("customize")}
                      />
                      <label class="form-check-label pointer" for="customize">
                        Customize
                      </label>
                      <p>{errors.customize?.message}</p>
                    </td>
                    <td>
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
                      <p>{errors.model?.message}</p>
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
                      <p>{errors.description?.message}</p>
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
                      <p>{errors.descriptionMore?.message}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="cate-fish bg-white bg-shadow col-12 col-md-3 mb-md-5 mb-2 pb-md-4 pb-2">
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
              <CheckBox {...register("fish")} />
            </div>
          </div>
          <div className="product-info bg-white bg-shadow col-12 col-md-8 mb-md-5 mb-2 pb-2">
            <div className="px-3 pt-3 product-images-add">
              <h5>Hình ảnh</h5>
              <input
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
            <div className="px-3 ">{renderPhotos(selectedImages)}</div>
          </div>
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
