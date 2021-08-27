import React from "react";
import "assets/scss/scss-components/orther/change-quantity.scss";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function ChangeQuantity(props) {
  let { quantity, setQuantity } = props;
  const dispatch = useDispatch();
  const decrement = () => {
    let updateQuantity = Number(quantity) <= 1 ? 1 : Number(quantity) - 1;
    setQuantity(updateQuantity);
  };
  const increment = () => {
    let updateQuantity = Number(quantity) + 1;
    if (updateQuantity > 50) {
      toast.warning("Số lượng mua không được quá 50.");
    } else {
      setQuantity(updateQuantity);
    }
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
