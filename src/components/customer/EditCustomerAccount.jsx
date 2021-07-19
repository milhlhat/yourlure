import React from "react";
import { useForm } from "react-hook-form";
import YLButton from "components/custom-field/YLButton";
import DEFINELINK from "routes/define-link";
import UserApi from "api/user-api";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect } from "react";

function EditCustomerAccount(props) {
  const { properties } = props;
  const location = useLocation();
  const { account } = location.state;
  const defaultValues = {};
  const methods = useForm({ defaultValues: defaultValues });
  const history = useHistory();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;
  const onSubmit = async (data) => {
    try {
      const response = await UserApi.update(data);
      if (response.error) {
        throw new Error(response.error);
      } else {
        alert("update thành công");
        properties();
        history.push("/customer/account");
      }
    } catch (error) {
      alert("update thất bại");
      console.log("fail to fetch customer list");
    }
  };
  const initialData = () => {
    setValue("username", account?.data?.username);
    setValue("gender", account?.data?.gender);
  };
  useEffect(() => {
    initialData();
  }, []);
  return (
    <div className="bg-box">
      <form onSubmit={handleSubmit(onSubmit)}>
        <table className="table-account w-75">
          <tbody>
            <tr>
              <td className="text-end title-table">Họ và Tên(*):</td>
              <td>
                <input
                  className="form-control"
                  {...register("username", {
                    required: "Trường bắt buộc",
                  })}
                ></input>
                {errors.name && (
                  <span className="text-danger">(*){errors.name.message}</span>
                )}
              </td>
            </tr>
            <tr>
              <td className="text-end title-table">Giới tính(*):</td>
              <td>
                <select
                  className="form-select"
                  {...register("gender", {
                    // validate: (value) => {
                    //   return value === "true" || value === "false";
                    // },
                  })}
                >
                  <option value="true">Nam</option>
                  <option value="false">Nữ</option>
                </select>
              </td>
            </tr>
            <tr>
              <td className="text-end title-table">Số điện thoại(*):</td>
              <td>
                {/* <input
                  className="form-control"
                  {...register("phone", {
                    required: "Trường bắt buộc",
                  })}
                ></input>
                {errors.phone && (
                  <span className="text-danger">(*){errors.phone.message}</span>
                )} */}
                {account?.data?.phone}
              </td>
            </tr>
            <tr>
              <td className="d-flex justify-content-end">
                <YLButton
                  variant="warning"
                  height="30px"
                  to={DEFINELINK.customer + DEFINELINK.account}
                >
                  Hủy
                </YLButton>
              </td>
              <td>
                <YLButton
                  variant="primary"
                  height="30px"
                  className="float-end"
                  type="submit"
                >
                  Cập nhật
                </YLButton>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default EditCustomerAccount;
