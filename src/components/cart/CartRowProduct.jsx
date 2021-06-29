import React, { useEffect, useState } from "react";
import ChangeQuantity from "components/orther/ChangeQuantity";
import "assets/scss/scss-components/cart/cart-row.scss";

function CartRowProduct(props) {
  const { item } = props;
  console.log(item);
  const handleChangeQuantity = (quantity) => {};
  const handleCheckBox = (value, checked) => {};

  return <div className="bg-white row-cart">s</div>;
}

export default CartRowProduct;
