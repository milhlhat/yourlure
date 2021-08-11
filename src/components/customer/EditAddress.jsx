import React, { useEffect } from "react";
import YLButton from "components/custom-field/YLButton";
import "assets/scss/scss-components/customer/add-new-addres.scss";
import { useForm } from "react-hook-form";
import UserApi from "api/user-api";
import DEFINELINK from "routes/define-link";
import { useHistory, useLocation } from "react-router-dom";
import YLSelectAddress from "components/custom-field/YLSelectAddress";
import { toast } from "react-toastify";

function ChangeAddress(props) {
  const location = useLocation();
  const { address } = location.state;
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
    try {
      const response = await UserApi.updateAddress(data, address.userAddressID);
      if (response.error) {
        throw new Error(response.error);
      } else {
        toast.success("Cập nhật địa chỉ thành công");
        history.push("/customer/address");
      }
    } catch (error) {
      toast.error("Cập nhật thất bại");
      console.log("fail to fetch customer list");
    }
  };
  const initialData = () => {
    setValue("userName", address?.userName);
    setValue("phone", address?.phone);
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
                  onBlur={(e) => {
                    e.target.value = e.target.value.trim();
                    register("userName", {
                      required: "Vui lòng nhập họ tên",
                    });
                  }}
                  placeholder="Nhập họ tên"
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
                  onBlur={(e) => {
                    e.target.value = e.target.value.trim();
                    register("phone", {
                      required: true,
                      pattern: /((\+84|84|0)[35789][0-9]{8})\b/,
                    });
                  }}
                  placeholder="Nhập số điện thoại"
                  type="number"
                ></input>
                {errors.phone && (
                  <span className="text-danger">
                    (*)Vui lòng nhập số điện thoại
                  </span>
                )}
              </td>
            </tr>
            <td className="text-end title-table">Địa chỉ(*)</td>
            <td>
              <YLSelectAddress {...methods} address={address} />
            </td>

            <tr>
              <td className="text-end title-table">Địa Chỉ(*)</td>
              <td>
                <input
                  className="form-control"
                  onBlur={(e) => {
                    e.target.value = e.target.value.trim();
                    register("description", {
                      required: "Vui lòng nhập địa chỉ cụ thể",
                    });
                  }}
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
