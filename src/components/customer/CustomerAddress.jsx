import UserApi from "api/user-api";
import React, { useEffect, useState } from "react";
import YLButton from "components/custom-field/YLButton";
import "assets/scss/scss-components/customer/manage-address.scss";
import ConfirmPopup from "components/confirm-popup/ComfirmPopup";
import DEFINELINK from "routes/define-link";
import { events } from "@react-three/fiber";
function CustomerAddress(props) {
  function formatAddress(address) {
    let des = address.description;
    let ward = address.userWardName;
    let distric = address.userDistrictName;
    let province = address.userProvinceName;
    return des + ", " + ward + ", " + ", " + distric + ", " + province;
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
        alert("Xóa chỉ mặc định thành công");
      }
    } catch (error) {
      alert("Xóa chỉ mặc định thất bại");
      console.log("fail to fetch delete address");
    }
    window.location.reload();
  };
  const handleSetDefaultAddress = async (id) => {
    try {
      const response = await UserApi.setAddressDefault(id);
      if (response.error) {
        throw new Error(response.error);
      } else {
        alert("Đặt địa chỉ mặc định thành công");
      }
    } catch (error) {
      alert("Đặt địa chỉ mặc định thất bại");
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
        {address?.data?.length <= 0 && (
          <h5 className="mt-4">Không có địa chỉ nào</h5>
        )}
        {address?.data?.map((address, i) => (
          <div className="address-row " key={"address-row" + i}>
            <div className="col-sm-12 col-md-8 ">
              <table className="address-info">
                <tbody>
                  <tr>
                    <td className="address-title">Họ và Tên</td>
                    <td className="address-value">
                      {address?.userName}{" "}
                      {address?.isDefault && (
                        <span className="default-address"> mặc định</span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="address-title">Số điện thoại</td>
                    <td className="address-value">{address?.phone}</td>
                  </tr>
                  <tr>
                    <td className="address-title">Địa chỉ</td>
                    <td className="address-value">{formatAddress(address)}</td>
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
                <form onSubmit={()=>handleSetDefaultAddress(address.userAddressID)}>
                  <YLButton
                    type="submit"
                    variant="light"
                    disabled={address.isDefault}
                    height="25px"
                    width="145px"
                  >
                    Đặt làm mặc định
                  </YLButton>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CustomerAddress;
