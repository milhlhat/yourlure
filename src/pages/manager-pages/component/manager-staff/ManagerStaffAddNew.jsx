import { yupResolver } from "@hookform/resolvers/yup";
import ManagerUserApi from "api/manager-user-api";
import YLButton from "components/custom-field/YLButton";
import YlInputFormHook from "components/custom-field/YLInputFormHook";
import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import * as yup from "yup";

function ManagerStaffAddNew(props) {
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
  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = methods;
  const onSubmit = async (data) => {
    let fin = { ...data, roles: [data.role] };
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
  return (
    <div>
      <div className="bg-box bg-shadow">
        <h3>Thêm nhân viên mới</h3>
        <hr />
        <form onSubmit={handleSubmit(onSubmit)} className="mx-5">
          <YlInputFormHook
            methods={methods}
            placeholder="Nhập tên"
            name="username"
            label="Tên(*)"
            required={true}
          />

          <label htmlFor="gender">Giới tính</label>
          <select className="form-select" {...register("gender")} id="gender">
            <option value={true} selected>
              Nam
            </option>
            <option value={false}>Nữ</option>
          </select>
          <span className="error-message">{errors?.gender?.message}</span>

          <YlInputFormHook
            methods={methods}
            placeholder="Nhập số điện thoại"
            name="phone"
            label="Số điện thoại(*)"
            required={true}
          />

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
            <YLButton variant="link" to="/manager/staff" value="Hủy" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ManagerStaffAddNew;
