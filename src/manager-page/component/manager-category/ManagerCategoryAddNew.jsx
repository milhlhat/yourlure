import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import YLButton from "components/custom-field/YLButton";
import ManagerCategoryAPI from "api/manager-category-api";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsBack } from "redux/back-action/back-action";
import YlInputFormHook from "components/custom-field/YLInputFormHook";

ManagerCategoryAddNew.propTypes = {};

function ManagerCategoryAddNew(props) {
  const canBack = props.location.canBack;
  const listName = props.location.listName;
  const dispatch = useDispatch();
  const history = useHistory();
  const schema = yup.object().shape({
    categoryName: yup.string().required("Tên danh mục không được để trống"),
  });
  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = methods;
  const onSubmit = async (data) => {
    try {
      const response = await ManagerCategoryAPI.add(data);

      if (response.error) {
        throw new Error(response.error);
      } else if (response === false || response?.data === false) {
        throw new Error();
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
      <div className="bg-box bg-shadow">
        <h3>Thêm danh mục</h3>
        <hr />
        <form onSubmit={handleSubmit(onSubmit)}>
          <YlInputFormHook
            methods={methods}
            placeholder="Nhập tên sản phẩm"
            name="categoryName"
            label="Tên danh mục(*)"
            required={true}
          />
          <div className="mt-3 d-flex justify-content-center">
            <YLButton variant="primary" type="submit" value="Xong" />
            <YLButton variant="link" to="/manager/category" value="Hủy" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ManagerCategoryAddNew;
