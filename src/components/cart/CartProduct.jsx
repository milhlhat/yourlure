import React, { useEffect, useState } from "react";
import data from "assets/dumy-data/data-product.js";
import CartRowProduct from "./CartRowProduct";
import "assets/scss/scss-pages/card.scss";
import { Link } from "react-router-dom";

function CartProduct(props) {
  const carts = data.cart();
  const [listCheck, setListCheck] = useState(carts);
  const [totalCost, setTotalCost] = useState(0);
  const handleChangeChecked = (id, checked) => {};

  function handleDelete(id) {}

  function handleChangeQuantity(id, quantity) {}
  function updateQuantity() {}
  useEffect(() => {}, []);
  return (
    <div className="container">
      <div className="cart-product mt-5 ">
        <div className="cart-left col-lg-8  col-md-7 col-sm-12 bg-white pt-3">
          <span>GIỎ HÀNG</span>
          <hr />
          {listCheck.map((cart, index) => (
            <div></div>
          ))}
        </div>
        <div className="cart-right col-lg-3 col-md-4 col-sm-12 bg-white pt-3">
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
            <div className="btn-cart-continous">
              <Link to="cart/payment" product="hihihaha">
                <button className="btn btn-success">Tiếp tục</button>
              </Link>
            </div>
          </div>
          <div className="float-end mt-4">
            <Link to="/product">Trở lại mua hàng</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartProduct;
