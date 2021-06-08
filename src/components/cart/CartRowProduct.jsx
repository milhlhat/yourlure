import React, { useEffect, useState } from "react";
import ChangeQuantity from "components/orther/ChangeQuantity";
import "assets/scss/scss-components/cart/cart-row.scss";

function CartRowProduct(props) {
  const { product, name, onChange, checked, onChange2 , handleDelete } = props;
  const [quantity, setQuantity] = useState(product.quantity);
  const [isCheck, setIsCheck] = useState(checked);
  const handleChangeQuantity = (quantity) => {
    onChange2(product.id,quantity);
    setQuantity(quantity);
  };
  const handleCheckBox = (value, checked) => {
    let rs = !checked;
    setIsCheck(rs);
    onChange(value, rs);
  };
  // useEffect(() => {
  //   handleCheckBox(product.id,isCheck)
  // },[]);
  return (
    <div className="bg-white row-cart">
      <table>
        <tr>
          <td>
            <input
              name={name}
              type="checkbox"
              onClick={() => handleCheckBox(product.id, isCheck)}
              defaultChecked={isCheck}
              value={product.id}
            />
          </td>
          <td>
            <img src={product.img} alt="" />
          </td>
          <td>
            <div className="info-product">
              <span>
                <b>{product.name}</b>
                <br />
                {product.price}
                <br />
                Màu sắc:{product.color}
                <br />
                Trọng lượng: {product.weight}
              </span>
            </div>
          </td>
          <td>
            <ChangeQuantity
              onClick={handleChangeQuantity}
              quantity={quantity}
            />
          </td>
          <td>{product.price * quantity}</td>
          <td>
            <i class="fa fa-trash" onClick={() => handleDelete(product.id)}></i>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default CartRowProduct;
