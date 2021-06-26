import UserApi from "api/user-api";
import React, { useEffect } from "react";
import YLButton from "components/custom-field/YLButton";
import "assets/scss/scss-components/customer/manage-address.scss";
function CustomerAddress(props) {
  const { changeTab } = props;
  const dumy = [
    {
      description: "string",
      userAddressID: 0,
      userCountryName: "string",
      userDistrictName: "string",
      userProvinceName: "string",
      userWardName: "string",
    },
  ];
  useEffect(() => {}, []);
  return (
    <>
      <div className="my-address ">
        <h2>Địa chỉ của tôi</h2>
        <YLButton variant="primary" type="button" onClick={() => changeTab(4)}>
          <i class="fa fa-plus"></i>Thêm địa chỉ
        </YLButton>
      </div>
      <div className="list-my-address">
        <div className="address-row ">
          <div className="col-sm-12 col-md-8 ">
            <table className="address-info">
              <tbody>
                <tr>
                  <td className="address-title">Họ và Tên</td>
                  <td className="address-value">Tên</td>
                </tr>
                <tr>
                  <td className="address-title">Số điện thoại</td>
                  <td className="address-value">0123456789</td>
                </tr>
                <tr>
                  <td className="address-title">Địa chỉ</td>
                  <td className="address-value">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="address-action col-sm-12 col-md-4">
            <div className="d-flex gap-1 justify-content-center">
              <YLButton variant="primary" width="70px" height="25px">
                Sửa
              </YLButton>
              <YLButton variant="danger" width="70px" height="25px">
                Xóa
              </YLButton>
            </div>
            <YLButton variant="light" disabled height="25px" width="145px">
              Đặt làm mặc định
            </YLButton>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerAddress;
