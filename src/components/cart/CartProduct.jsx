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
  const [totalCost, setTotalCost] = useState(0);
  const handleChangeChecked = (id, checked) => {};

  function handleDelete(id) {}

  function handleChangeQuantity(id, quantity) {}
  function updateQuantity() {}
  useEffect(() => {}, []);
  return (
    <div className="container">
      <div className="cart-product mt-5 ">
        <div className="cart-left col-lg-8  col-md-7 col-sm-12 bg-box   p-3">
          <span className="title">GIỎ HÀNG</span>
          <hr />
          {listCheck.data?.map((item, index) => (
            <CartRowProduct item={item} key={"cart-row" + index} />
          ))}
        </div>
        <div className="cart-right col-lg-3 col-md-4 col-sm-12  bg-box p-3">
          <h4>CHI TIẾT ĐƠN HÀNG</h4>
          <div className="cart-detail">
            <p>
              TỔNG PHỤ: <span>{totalCost}</span>
            </p>
            <p>
              PHÍ VẬN CHUYỂN: <span>25000</span>
            </p>
            <p>
              TỔNG CỘNG: <span>{totalCost + 25000}</span>
            </p>
            <table className="table-spacing">
              <tbody>
                <tr>
                  <td className="text-bold">TỔNG PHỤ:</td>
                  <td></td>
                </tr>
                <tr>
                  <td className="text-bold">PHÍ VẬN CHUYỂN:</td>
                  <td>25000</td>
                </tr>
                <tr>
                  <td className="text-bold">TỔNG CỘNG:</td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td   className="d-flex justify-content-end">
                    <YLButon variant="primary">Tiếp tục</YLButon>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2"  className="d-flex justify-content-end">
                    <Link to={DEFINELINK.product}>Trở lại mua hàng</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartProduct;
