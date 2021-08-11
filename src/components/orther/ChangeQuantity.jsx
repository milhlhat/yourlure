import React from "react";
import "assets/scss/scss-components/orther/change-quantity.scss";
import { useDispatch } from "react-redux";

function ChangeQuantity(props) {
  let { quantity, setQuantity } = props;
  const dispatch = useDispatch();
  const decrement = () => {
    let updateQuantity = Number(quantity) <= 1 ? 1 : Number(quantity) - 1;
    setQuantity(updateQuantity);
  };
  const increment = () => {
    let updateQuantity = Number(quantity) + 1;
    setQuantity(updateQuantity);
  };
  return (
    <div className="product-details-quantity d-flex">
      <button className="quantity-input" onClick={decrement}>
        <i className="fal fa-minus"></i>
      </button>
      <input
        type="number"
        className="input-quickview"
        value={quantity}
        required
      />
      <button className="quantity-input" onClick={increment}>
        <i className="fal fa-plus"></i>
      </button>
    </div>
  );
}

export default ChangeQuantity;
