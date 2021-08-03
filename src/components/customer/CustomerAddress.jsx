import UserApi from "api/user-api";
import React, { useEffect, useState } from "react";
import YLButton from "components/custom-field/YLButton";
import "assets/scss/scss-components/customer/manage-address.scss";
import ConfirmPopup from "components/confirm-popup/ComfirmPopup";
import DEFINELINK from "routes/define-link";
import { events } from "@react-three/fiber";
import { toast } from "react-toastify";
import Loading from "components/Loading";
import ErrorLoad from "components/error-notify/ErrorLoad";

function CustomerAddress(props) {
  function formatAddress(address) {
    let des = address.description;
    let ward = address.userWardName;
    let distric = address.userDistrictName;
    let province = address.userProvinceName;
    return des + ", " + ward + ", " + distric + ", " + province;
  }

  const [address, setAddress] = useState({
    data: [],
    isLoading: false,
    isSuccess: true,
  });

  const onConfirm = async (id) => {
    try {
      const response = await UserApi.deleteAddress(id);
      if (response.error) {
        throw new Error(response.error);
      } else {
        toast.success("Xóa địa chỉ thành công");
      }
    } catch (error) {
      toast.warning(error.response.data);
      console.log("fail to fetch delete address");
    }
    fetchCustomAddress();
  };
  const handleSetDefaultAddress = async (id) => {
    try {
      const response = await UserApi.setAddressDefault(id);
    } catch (error) {
      toast.error("Đặt địa chỉ mặc định thất bại");
      console.log("fail to fetch customer list");
    }
    fetchCustomAddress();
  };

  const fetchCustomAddress = async () => {
    setAddress((prevState) => {
      return { ...prevState, isLoading: true };
    });
    try {
      const response = await UserApi.getAddress();
      setAddress({ data: response, isLoading: false, isSuccess: true });
    } catch (error) {
      setAddress({ data: null, isLoading: false, isSuccess: false });
      console.log("fail to fetch address");
    }
  };
  useEffect(() => {
    fetchCustomAddress();
  }, []);
  if (address?.isLoading) {
    return <Loading />;
  } else if (!address.isSuccess) {
    return <ErrorLoad />;
  } else
    return (
      <>
        <div className="my-address ">
          <h2>Địa chỉ của tôi</h2>
          <YLButton
            variant="primary"
            to={DEFINELINK.customer + DEFINELINK.addressAdd}
          >
            <i className="fa fa-plus"></i>Thêm địa chỉ
          </YLButton>
        </div>
        <div className="list-my-address">
          {address?.data?.length <= 0 ||
          address?.data === "Không tồn tại địa chỉ nào!" ? (
            <div className="bg-box mt-3">
              <p className="mx-2 text-center">Không có địa chỉ nào</p>
            </div>
          ) : (
            <>
              {address?.data?.map((address, i) => (
                <div className="address-row " key={"address-row" + i}>
                  <div className="col-sm-12 col-md-8 ">
                    <table className="address-info">
                      <tbody>
                        <tr>
                          <td className="address-title">Họ và Tên</td>
                          <td className="address-value">
                            {address?.userName}
                            {address?.isDefault && (
                              <span className="default-address"> Mặc định</span>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td className="address-title">Số điện thoại</td>
                          <td className="address-value">{address?.phone}</td>
                        </tr>
                        <tr>
                          <td className="address-title">Địa chỉ</td>
                          <td className="address-value">
                            {formatAddress(address)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="address-action col-sm-12 col-md-4">
                    <div className="d-flex gap-1 justify-content-center">
                      <YLButton
                        variant="primary"
                        width="70px"
                        height="25px"
                        to={{
                          pathname:
                            DEFINELINK.customer +
                            "/address/edit/" +
                            address.userAddressID,
                          state: {
                            address: address,
                          },
                        }}
                      >
                        Sửa
                      </YLButton>
                      <ConfirmPopup
                        variant="danger"
                        width="70px"
                        height="25px"
                        btnText="Xóa"
                        title="Xóa"
                        content="Bạn chắc chắn muốn xóa địa chỉ?"
                        onConfirm={() => onConfirm(address.userAddressID)}
                        // onConfirm={onConfirm}
                      />
                    </div>
                    <div
                    // onClick={() => handleSetDefaultAddress(address.userAddressID)}
                    >
                      <YLButton
                        type="submit"
                        variant="light"
                        disabled={address.isDefault}
                        height="25px"
                        width="145px"
                        onClick={() =>
                          handleSetDefaultAddress(address.userAddressID)
                        }
                      >
                        Đặt làm mặc định
                      </YLButton>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </>
    );
}

export default CustomerAddress;
