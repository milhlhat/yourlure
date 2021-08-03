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
import ManagerUserApi from "api/manager-user-api";

function ManagerStaffAddNew(props) {
  const canBack = props.location.canBack;
  const dispatch = useDispatch();
  const history = useHistory();
  const schema = yup.object().shape({
    phone: yup
      .string()
      .required("Vui lòng nhập số điện thoại.")
      .matches(
        /((\+84|84|0)[35789][0-9]{8})\b/,
        "Vui lòng nhập đúng số điện thoại"
      ),
    username: yup.string().required("Vui lòng nhập tên."),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    let fin = { ...data, roles: [data.role] };
    console.log(fin);
    try {
      const response = await ManagerUserApi.createAdminAccount(fin);
      console.log(response);
      if (response.data != null && !response.data) {
        throw new Error();
      } else if (response.error) {
        throw new Error(response.error);
      } else {
        alert("Thêm nhân viên thành công");
        history.push("/manager/staff");
      }
    } catch (error) {
      alert("Thêm nhân viên thất bại");
      console.log("fail to fetch add staff");
    }
  };
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
  return (
    <div>
      <div className="bg-box bg-shadow">
        <h3>Thêm nhân viên mới</h3>
        <hr />
        <form onSubmit={handleSubmit(onSubmit)} className="mx-5">
          <label htmlFor="username">Tên</label>
          <input
            className="form-control"
            {...register("username")}
            type="text"
            id="username"
            placeholder="Nhập tên "
          />
          {errors?.username && (
            <span className="error-message">
              {errors?.username?.message} <br />
            </span>
          )}

          <label htmlFor="gender">Giới tính</label>
          <select className="form-select" {...register("gender")} id="gender">
            <option value={true} selected>
              Nam
            </option>
            <option value={false}>Nữ</option>
          </select>
          <span className="error-message">{errors?.gender?.message}</span>

          <label htmlFor="phone">Số điện thoại</label>
          <input
            className="form-control"
            {...register("phone")}
            type="text"
            id="phone"
            placeholder="Nhập số điện thoại "
          />
          {errors?.phone && (
            <span className="error-message">
              {errors?.phone?.message}
              <br />
            </span>
          )}


          <label htmlFor="role">Vị trí</label>
          <select className="form-select" {...register("role")} id="role">
            <option value="ROLE_STAFF" selected>
              Nhân viên
            </option>
            <option value="ROLE_ADMIN">Quản lý</option>
          </select>
          <span className="error-message">{errors?.role?.message}</span>
          <div className="mt-3 d-flex justify-content-center">
            <YLButton variant="primary" type="submit" value="Xong" />
            <YLButton variant="link" to="/manager/category" value="Hủy" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ManagerStaffAddNew;
