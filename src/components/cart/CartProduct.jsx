import React, { useEffect, useState } from "react";
import data from "assets/dumy-data/data-product.js";
import CartRowProduct from "./CartRowProduct";
import "assets/scss/scss-pages/card.scss";
import { Link } from "react-router-dom";
import DEFINELINK from "routes/define-link";
import YLButon from "components/custom-field/YLButton";
function CartProduct(props) {
  const carts = data.cart();
  const [listCheck, setListCheck] = useState({
    data: carts,
    isLoading: false,
    isSuccess: false,
  });

  useEffect(() => {}, []);
  return (
    <div className="container">
      <div className="cart-product mt-5 ">
        <div className="cart-left col-lg-8  col-md-7 col-sm-12 bg-box bg-shadow  p-3">
          <span className="title">GIỎ HÀNG</span>
          <hr />
          {listCheck.data?.map((item, index) => (
            <CartRowProduct item={item} key={"cart-row" + index} />
          ))}
        </div>
        <div className="cart-right col-lg-3 col-md-4 col-sm-12 bg-shadow bg-box p-3">
          <h4>CHI TIẾT ĐƠN HÀNG</h4>
          <div className="cart-detail">
            <table className="table-spacing">
              <tbody>
                <tr>
                  <td className="text-bold">TỔNG PHỤ:</td>
                  <td className="text-end">150.000</td>
                </tr>
                <tr>
                  <td className="text-bold">PHÍ VẬN CHUYỂN:</td>
                  <td className="text-end">25.000</td>
                </tr>
                <tr>
                  <td className="text-bold">TỔNG CỘNG:</td>
                  <td className="text-end">175.000</td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <YLButon variant="primary" width="100%">
                      Tiếp tục
                    </YLButon>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2" className="text-end">
                    <Link to={DEFINELINK.product}>Trở lại mua hàng</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="d-flex payment-methods">
          <div className=" cart-left col-lg-8 col-md-7 col-sm-12 bg-box bg-shadow  p-3 mt-5">
            <h4>Phương thức thanh toán</h4>
            <div className="mb-4 bottom-line"></div>
            <div className="payment-method-content col-md-8 col-11">
              <h6>COD-Thanh toán khi nhận hàng</h6>
              <p>
                Tất cả đơn hàng được gửi đảm bảo qua đường bưu điện sẽ đến tay
                quý khách hàng chỉ trong 1-3 ngày làm việc
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartProduct;
