import React, { useEffect, useState } from "react";
import YLButton from "components/custom-field/YLButton";
import "assets/scss/scss-components/customer/add-new-addres.scss";
import { useForm } from "react-hook-form";
import { Prompt, useHistory } from "react-router-dom";
import DEFINELINK from "routes/define-link";
import YLSelectAddress from "components/custom-field/YLSelectAddress";
import UserApi from "api/user-api";
import { toast } from "react-toastify";
import { CircularProgress } from "@material-ui/core";

function AddNewAddress() {
  const methods = useForm();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isDirty, isSubmitSuccessful },
  } = methods;
  const onSubmit = async (data) => {
    console.log(data);
    try {
      setLoading(true);
      const response = await UserApi.addAddress(data);
      if (response.error) {
        throw new Error(response.error);
      } else {
        toast.success("Thêm địa chỉ thành công");
        history.push("/customer/address");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Thêm địa chỉ thất bại");
    }
  };
  useEffect(() => {
    const fetchCustomAccount = async () => {
      try {
        const response = await UserApi.getMe();
        setValue("userName", response.username);
        setValue("phone", response.phone);
      } catch (error) {
        console.log("fail to fetch information");
      }
    };
    fetchCustomAccount();
    return fetchCustomAccount();
  }, []);

  return (
    <div className="bg-box bg-shadow">
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
                      required: "Họ và tên không được để trống",
                    });
                  }}
                  placeholder="Nhập họ tên"
                />
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
                      required: "Vui lòng nhập số điện thoại",
                      pattern: {
                        value: /((\+84|84|0)[35789][0-9]{8})\b/,
                        message: "Vui lòng nhập đúng số điện thoại",
                      },
                      minLength: {
                        value: 10,
                        message: "Vui lòng nhập đúng số điện thoại",
                      },
                      maxLength: {
                        value: 12,
                        message: "Vui lòng nhập đúng số điện thoại",
                      },
                    });
                  }}
                  placeholder="Nhập số điện thoại"
                  type="text"
                />
                {errors.phone && (
                  <span className="text-danger">
                    {console.log(errors)}
                    {errors.phone.message}
                  </span>
                )}
              </td>
            </tr>
            <td className="text-end title-table pt-3">Địa chỉ(*)</td>
            <td>
              <YLSelectAddress {...methods} />
            </td>

            <tr>
              <td className="text-end title-table">Địa Chỉ(*)</td>
              <td>
                <input
                  className="form-control"
                  onBlur={(e) => {
                    e.target.value = e.target.value.trim();
                    register("description", {
                      required: "Địa chỉ cụ thể không được để trống",
                    });
                  }}
                  placeholder="Nhập địa chỉ cụ thể"
                />
                {errors.description && (
                  <span className="text-danger">
                    (*){errors.description.message}
                  </span>
                )}
              </td>
            </tr>
            <tr>
              <td className=" d-flex justify-content-end">
                <YLButton
                  variant="warning"
                  to={DEFINELINK.customer + DEFINELINK.address}
                  disabled={loading}
                >
                  Hủy
                </YLButton>
              </td>
              <td>
                <YLButton variant="primary" type="submit" disabled={loading}>
                  Thêm
                  {loading && (
                    <CircularProgress size={15} className="circle-progress" />
                  )}
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
