import React, { useEffect, useState } from "react";
import ChangeQuantity from "components/orther/ChangeQuantity";
import "assets/scss/scss-components/cart/cart-row.scss";
import ConfirmPopup from "components/confirm-popup/ComfirmPopup";

function CartRowProduct(props) {
  const { item } = props;
  console.log(item);
  const handleChangeQuantity = (quantity) => {};
  const handleCheckBox = (value, checked) => {};
  const onConfirm =  ()=>{}
  return (
    <div className="bg-white row-cart text-small">
      <table>
        <tbody>
          <tr>
            <td>
              <input type="checkbox" checked />
            </td>
            <td className="d-flex">
              <img
                src="https://vuadocau.com/wp-content/uploads/2020/02/chuot-soc-300x300.jpg.webp"
                width={50}
                height={50}
                alt=""
              />
              <div className="right">
                <h6>POPPER WD001</h6>
                <h6>100.000</h6>
                <span>Màu sắc: xanh</span>
                <br />
                <span>Trọng lượng: 16g</span>
                <br />
                <a className="" href="/product">
                  sửa
                </a>
              </div>
            </td>
            <td>
              <ChangeQuantity quantity={1} />
            </td>
            <td>50.000</td>
            <td>
            <ConfirmPopup
                  variant="danger"
                  width="70px"
                  height="25px"
                  btnText={<i className="fal fa-times"></i>}
                  title="Xóa sản phẩm"
                  content="Bạn chắc chắn muốn xóa sản phẩm khỏi giỏ hàng ?"
                  onConfirm={onConfirm}
                />
              
            </td>
          </tr>
        </tbody>
      </table>
      <hr />
    </div>
  );
}

export default CartRowProduct;
