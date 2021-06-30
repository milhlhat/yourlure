import React, { useEffect, useState } from "react";
import YLButton from "components/custom-field/YLButton";
import "assets/scss/scss-components/customer/add-new-addres.scss";
import { useForm } from "react-hook-form";
import UserApi from "api/user-api";
import DEFINELINK from "routes/define-link";
import { useHistory, useLocation } from "react-router-dom";
import YLSelectAddress from "components/custom-field/YLSelectAddress";

function ChangeAddress(props) {
  const location = useLocation();
  const { address } = location.state;
  console.log(address);
  const history = useHistory();
  const defaultValues = { name: "" };

  const methods = useForm();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await UserApi.updateAddress(data, address.userAddressID);
      if (response.error) {
        throw new Error(response.error);
      } else {
        alert("update thành công");
        history.push("/customer/account");
      }
    } catch (error) {
      alert("update thất bại");
      console.log("fail to fetch customer list");
    }
  };
  const initialData = () => {
    setValue("userName", address?.userName);
    setValue("phone", address?.phone);
    setValue("userEmail", address?.userEmail);
    setValue("description", address?.description);
  };
  useEffect(() => {
    initialData();
  }, []);
  return (
    <div className="bg-box">
      <form onSubmit={handleSubmit(onSubmit)}>
        <table className="add-address-table">
          <tbody>
            <tr>
              <td className="text-end title-table align-top">Họ Và Tên(*)</td>
              <td>
                <input
                  className="form-control"
                  {...register("userName", {
                    required: "Vui lòng nhập họ tên",
                  })}
                ></input>
                {errors.userName && (
                  <span className="text-danger">
                    (*){errors.userName.message}
                  </span>
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
                    pattern: /((\+84|84|0)[35789][0-9]{8})\b/,
                  })}
                  type="number"
                ></input>
                {errors.phone && (
                  <span className="text-danger">
                    (*)Vui lòng nhập số điện thoại
                  </span>
                )}
              </td>
            </tr>
            <YLSelectAddress {...methods} address={address} />

            <tr>
              <td className="text-end title-table">Địa Chỉ(*)</td>
              <td>
                <input
                  className="form-control"
                  {...register("description", {
                    required: "Vui lòng nhập địa chỉ cụ thể",
                  })}
                  placeholder="Số nhà, tên đường,.."
                ></input>
                {errors.description && (
                  <span className="text-danger">
                    (*){errors.adddescriptionress.message}
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
              <td className="d-flex justify-content-end">
                <YLButton
                  variant="warning"
                  to={DEFINELINK.customer + DEFINELINK.address}
                >
                  Hủy
                </YLButton>
              </td>
              <td>
                <YLButton variant="primary" type="submit">
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

export default ChangeAddress;
