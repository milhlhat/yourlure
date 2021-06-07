import React, { useEffect, useState } from "react";
import data from "assets/dumy-data/data-product.js";
import CartRowProduct from "./CartRowProduct";
import "assets/scss/scss-pages/cart.scss";
import { Link } from "react-router-dom";

function CartProduct(props) {
  const carts = data.cart();
  const [listCheck, setListCheck] = useState(carts);
  const [totalCost, setTotalCost] = useState(0);
  const handleChangeChecked = (id, checked) => {
    let list = [...listCheck];
    if (checked) {
      for (let i in list) {
        let iterator = list[i];
        if (iterator.id === Number(id)) {
          list[i] = { ...iterator, checked: true };
        }
      }
    } else {
      for (let i in list) {
        let iterator = list[i];
        if (iterator.id === Number(id)) {
          list[i] = { ...iterator, checked: false };
        }
      }
    }
    setListCheck(list);
  };

  function handleDelete(id) {
    let list = [...listCheck];
    list = list.filter((value) => value.id != id);
    setListCheck(list);
  }

  function handleChangeQuantity(id, quantity) {
    let list = [...listCheck];
    for (let i in list) {
      let cart = list[i];
      if (cart.id === Number(id)) {
        list[i] = { ...cart, quantity: quantity };
      }
    }
    setListCheck(list);
  }
  function updateQuantity() {
    let temp = [...listCheck];
    let total = 0;
    for (let obj of temp) {
      if (obj.checked) {
        total += Number(obj.quantity) * Number(obj.price);
      }
    }
    setTotalCost(total);
  }
  useEffect(() => {
    updateQuantity();
  }, [listCheck]);
  return (
    <div className="cart-product row mt-5">
      <div className="cart-left col-md-8 col-sm-12 bg-white pt-3">
        <span>GIỎ HÀNG</span>
        <hr />
        {listCheck.map((cart, index) => (
          <div>
            <CartRowProduct
              name={cart.name}
              onChange={handleChangeChecked}
              onChange2={handleChangeQuantity}
              handleDelete={handleDelete}
              product={cart}
              key={index}
              checked={cart.checked}
            />
            {cart.checked?'check': 'no check'}
            <hr />
          </div>
        ))}
      </div>
      <div className="cart-right col-md-4 col-sm-12 bg-white pt-3">
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
            <Link to="/payment"><button className="btn btn-success">Tiếp tục</button> </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartProduct;
