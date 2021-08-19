import YLSelectAddress from "components/custom-field/YLSelectAddress";
import React from "react";

function GusestAddressInput(props) {
  let methods = props;
  let {
    register,
    formState: { errors },
    setValue,
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
        onBlur={(e) => {
          e.target.value = e.target.value.trim();
          register("receiverName", {
            required: "Họ và tên không được để trống",
          });
          setValue("receiverName", e.target.value.trim());
        }}
      />
      {errors.receiverName && (
        <span className="text-danger">(*){errors.receiverName.message}</span>
      )}

      <input
        className="form-control mt-3"
        placeholder={"*Số điện thoại"}
        {...register("phone", {
          required: "Vui lòng nhập số điện thoại",
          pattern: {
            value: /((\+84|84|0)[35789][0-9]{8})\b/,
            message: "Vui lòng nhập đúng số điện thoại",
          },
        })}
        onBlur={(e) => {
          e.target.value = e.target.value.trim();
          register("phone", {
            required: "Vui lòng nhập số điện thoại",
          });
          setValue("phone", e.target.value.trim());
        }}
      />
      {errors.phone && (
        <span className="text-danger">(*){errors.phone.message}</span>
      )}
      <YLSelectAddress {...methods} />

      <input
        className="form-control mt-3"
        placeholder={"*Địa chỉ, số nhà, tên đường"}
        {...register("address", {
          required: "Chi tiết địa chỉ không được để trống",
        })}
        onBlur={(e) => {
          e.target.value = e.target.value.trim();
          register("address", {
            required: "Chi tiết địa chỉ không được để trống",
          });
          setValue("address", e.target.value.trim());
        }}
      />
      {errors.address && (
        <span className="text-danger">(*){errors.address.message}</span>
      )}
      <input className="form-control mt-3" placeholder={"Lưu ý"} />
      {errors.note && (
        <span className="text-danger">{errors.note.message}</span>
      )}
    </div>
  );
}

export default GusestAddressInput;
