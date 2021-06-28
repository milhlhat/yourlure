import React from "react";
import { useForm } from "react-hook-form";
import YLButton from "components/custom-field/YLButton";
import DEFINELINK from "routes/define-link";

function EditCustomerAccount(props) {
  const { account } = props;
  const defaultValues = {};
  const methods = useForm({ defaultValues: defaultValues });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  const onSubmit = (data) => {};
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
                  {...register("name", {
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
                    validate: (value) => {
                      return value === "true" || value === "false";
                    },
                  })}
                  defaultValue={true}
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
                0123456789
              </td>
            </tr>
            <tr>
              <td className="text-end title-table">Email:</td>
              <td>
                <input
                  className="form-control"
                  {...register("email", {
                    required: "Trường bắt buộc",
                  })}
                  type="email"
                ></input>
                {errors.email && (
                  <span className="text-danger">(*){errors.email.message}</span>
                )}
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
