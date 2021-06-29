import React, { useEffect } from "react";
import YLButton from "components/custom-field/YLButton";
import "assets/scss/scss-components/customer/add-new-addres.scss";
import { useForm } from "react-hook-form";
import { Prompt } from "react-router-dom";
import DEFINELINK from "routes/define-link";
import YLSelectAddress from "components/custom-field/YLSelectAddress";

function AddNewAddress() {
  const methods = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitted },
  } = methods;
  const onSubmit = (data) => {
    console.log(data);
  };
  console.log(isDirty, isSubmitted);
  useEffect(() => {
    return () => {
      console.log('diiii',isDirty, isSubmitted);
      if (isDirty && !isSubmitted) return (window.onbeforeunload = () => true);
    };
  });
  return (
    <div className="bg-box">
      <Prompt
        when={isDirty && !isSubmitted}
        message="Changes you made may not be saved."
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <table className="add-address-table">
          <tbody>
            <tr>
              <td className="text-end title-table align-top">Họ Và Tên(*)</td>
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
              <td className="text-end title-table">Số Điện Thoại(*)</td>
              <td>
                <input
                  className="form-control"
                  {...register("phone", {
                    required: true,
                    pattern: /^([+|\d]){1}[0-9]{8,11}$/g,
                  })}
                  type="number"
                ></input>
                {errors.phone && (
                  <span className="text-danger">
                    (*)Số điện thoại 9-11 chữ số
                  </span>
                )}
              </td>
            </tr>
            <YLSelectAddress {...methods} />
            <tr>
              <td className="text-end title-table">Địa Chỉ(*)</td>
              <td>
                <input
                  className="form-control"
                  {...register("address", {
                    required: "Trường bắt buộc",
                  })}
                ></input>
                {errors.address && (
                  <span className="text-danger">
                    (*){errors.address.message}
                  </span>
                )}
              </td>
            </tr>
            <tr>
              <td className="text-end title-table">Email</td>
              <td>
                <input
                  type="email"
                  className="form-control"
                  {...register("email")}
                ></input>
              </td>
            </tr>
            <tr>
              <td className=" d-flex justify-content-end">
                <YLButton
                  variant="warning"
                  to={DEFINELINK.customer + DEFINELINK.address}
                >
                  Hủy
                </YLButton>
              </td>
              <td>
                <YLButton variant="primary" type="submit">
                  Thêm
                </YLButton>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default AddNewAddress;
