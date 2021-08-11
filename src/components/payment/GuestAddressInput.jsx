import YLSelectAddress from "components/custom-field/YLSelectAddress";
import React from "react";

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
        className="form-control"
        placeholder={"*Họ và Tên"}
        {...register("receiverName", {
          required: "Tên người nhận không được để trống",
        })}
      />
      {errors.receiverName && (
        <span className="text-danger">(*){errors.receiverName.message}</span>
      )}

      <YLSelectAddress {...methods} />

      <input
        className="form-control mt-3"
        placeholder={"*Địa chỉ, số nhà, tên đường"}
        {...register("address", {
          required: "Chi tiết địa chỉ không được để trống",
        })}
      />
      {errors.address && (
        <span className="text-danger">(*){errors.address.message}</span>
      )}
      <input
        className="form-control mt-3"
        placeholder={"*Số điện thoại"}
        {...register("phone", {
          required: "Số điện thoại không được để trống",
          pattern: {
            value: /((\+84|84|0)[35789][0-9]{8})\b/,
            message: "Vui lòng nhập đúng số điện thoại",
          },
        })}
      />
      {errors.phone && (
        <span className="text-danger">(*){errors.phone.message}</span>
      )}
      <input className="form-control mt-3" placeholder={"Lưu ý"} />
      {errors.note && (
        <span className="text-danger">{errors.note.message}</span>
      )}
    </div>
  );
}

export default GusestAddressInput;
