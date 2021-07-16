import YLSelectAddress from "components/custom-field/YLSelectAddress";
import React, { useState } from "react";

function GusestAddressInput(props) {
  let methods = props;
  let {
    register,
    formState: { errors },
  } = props;
  return (
    <div className="px-5">
      <h5>
        <i className="fas fa-map-marker-check"></i> ĐỊA CHỈ GIAO HÀNG
      </h5>
      <input
        className="form-control mb-3"
        placeholder={"*Họ và Tên"}
        {...register("receiverName", {
          required: "Trường bắt buộc",
        })}
      />
      {errors.receiverName && (
        <span className="text-danger">(*){errors.receiverName.message}</span>
      )}

      <YLSelectAddress {...methods}  />

      <input
        className="form-control my-3"
        placeholder={"*Địa chỉ, số nhà, tên đường"}
        {...register("address", {
          required: "Trường bắt buộc",
        })}
      />
      {errors.address && (
        <span className="text-danger">(*){errors.address.message}</span>
      )}
      <input
        className="form-control my-3"
        placeholder={"*Số điện thoại"}
        {...register("phone", {
          required: "Trường bắt buộc",
        })}
      />
      {errors.phone && (
        <span className="text-danger">(*){errors.phone.message}</span>
      )}
      <input className="form-control my-3" placeholder={"Email"} />
      {errors.email && (
        <span className="text-danger">{errors.email.message}</span>
      )}
      <input className="form-control my-3" placeholder={"Lưu ý"} />
      {errors.note && (
        <span className="text-danger">{errors.note.message}</span>
      )}
    </div>
  );
}

export default GusestAddressInput;
