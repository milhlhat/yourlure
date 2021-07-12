import React, { useState } from "react";
import "assets/scss/scss-components/orther/change-quantity.scss";
import { useDispatch } from "react-redux";
import { updateQuantityCarts } from "redux/cart/cart-guest";


function ChangeQuantity(props) {
  let { quantity,setQuantity } = props;
  const dispatch=useDispatch();
  const decrement = () => {
    let updateQuantity=Number(quantity) <= 1 ? 1 : Number(quantity) - 1;
    setQuantity(updateQuantity);
  };
  const increment = () => {
    let updateQuantity=Number(quantity) + 1;
    setQuantity(updateQuantity);
  };
  return (
    <div className="product-details-quantity d-flex">
      <button className="quantity-input" onClick={decrement}>
        &mdash;
      </button>
      <input
        type="number"
        className="input-quickview"
        value={quantity}
        required
      />
      <button className="quantity-input" onClick={increment}>
        &#xff0b;
      </button>
    </div>
  );
}

export default ChangeQuantity;
