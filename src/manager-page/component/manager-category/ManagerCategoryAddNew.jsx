import React from "react";
import PropTypes from "prop-types";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import YLButton from "components/custom-field/YLButton";
import ManagerCategoryAPI from "api/manager-category-api";
import { useHistory } from "react-router-dom";

ManagerCategoryAddNew.propTypes = {};

function ManagerCategoryAddNew(props) {
    const history = useHistory();
  const schema = yup.object().shape({
    categoryName: yup.string().required("Tên danh mục không được để trống"),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    try {
        const response = await ManagerCategoryAPI.add(data);
        if (response.error) {
          throw new Error(response.error);
        } else {
          alert("Thêm danh mục thành công");
          history.push("/manager/category");
        }
      } catch (error) {
        alert("Thêm danh mục thất bại");
        console.log("fail to fetch add category");
      }
  };
  return (
    <div>
      <h3>Tạo danh mục mới</h3>
      <div className="bg-box bg-shadow">
        <h3>Thông tin danh mục</h3>
        <hr />
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name">Tên danh mục</label>
          <input
            className="form-control"
            {...register("categoryName")}
            type="text"
            id="name"
            placeholder="Nhập tên sản phẩm"
          />
          <YLButton variant="primary" type="submit" value="Xong" />
        </form>
      </div>
    </div>
  );
}

export default ManagerCategoryAddNew;
