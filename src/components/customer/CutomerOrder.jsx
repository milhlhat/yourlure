import React from "react";
import YLButton from "components/custom-field/YLButton";
import ComfirmPopup from "components/confirm-popup/ComfirmPopup";
import "assets/scss/scss-components/customer/manage-order.scss";
function CutomerOrder(props) {
  return (
    <div className="order">
      <div className="order-row bg-box">
        <div className="order-info">
          <span>Ngày đặt hàng 12/06/2021</span>
          <span className="text-success">Thành công</span>
        </div>
        <div className="order-row-item">
          <img
            className="order-img"
            src="https://images-na.ssl-images-amazon.com/images/I/51Bs9-v6WGL._AC_SL1400_.jpg"
          />
          <div className="order-row-item-info">
            <span className="order-title">POPPER WD001 - xanh - 16g</span>
            <span className="number-order">X3</span>
          </div>
          <span className="ms-auto">150,000</span>
        </div>
        <div className="order-fee">
          <table className="fee-table">
            <tr>
              <td className="pe-3">
                <span className="order-title">Phí vận chuyển:</span>
              </td>
              <td className="text-end">
                <span>25,000</span>
              </td>
            </tr>
            <tr>
              <td className="pe-3 text-end">
                <span className="order-title ">Tổng:</span>
              </td>
              <td className="text-end">
                <span>175,000</span>
              </td>
            </tr>
          </table>
        </div>
        <div className="order-action">
          <div className="order-address">
            Địa chỉ: Thôn 3 thạch hòa, thạch thất, hà nội
          </div>
          <div className="order-action-btn">
            <ComfirmPopup
              btnText="Hủy Đơn"
              height="30px"
              title="Hủy đơn"
              content="Bạn chắc chắn hủy đơn hàng?"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CutomerOrder;
