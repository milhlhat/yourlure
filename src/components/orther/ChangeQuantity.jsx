import React, { useState } from "react";
import "assets/scss/scss-components/orther/change-quantity.scss";


function ChangeQuantity(props) {
  const quan = props;
  let { onClick } = props;
  const handleChangeInput = (value) => {
    onClick(value);
  }
  const [quantity, setQuantity] = useState(quan.quantity);
  const decrement = () => {
    let updateQuantity=Number(quantity) <= 1 ? 1 : Number(quantity) - 1;
    setQuantity(updateQuantity);
    onClick(updateQuantity);
  };
  const increment = () => {
    let updateQuantity=Number(quantity) + 1;
    setQuantity(updateQuantity);
    onClick(updateQuantity);
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
        onChange={(e)=>{handleChangeInput(e.target.value)}}
        required
      />
      <button className="quantity-input" onClick={increment}>
        &#xff0b;
      </button>
    </div>
  );
}

export default ChangeQuantity;
