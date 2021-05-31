import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import YLButton from "../../custom-field/YLButton";
import data from './dumy-data';
ProductAction.propTypes = {};

function ProductAction(props) {
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState(0);
  var cl=0;
  const decrement = () => {
    Number(quantity) <= 1 ? setQuantity(1) : setQuantity(Number(quantity) - 1);
    console.log(quantity);
  };
  const increment = () => {
    setQuantity(Number(quantity) + 1);
    console.log(quantity);
  };
  const handleChooseColor = (index)=>{
    console.log(index);
    setColor(index);
    cl=index;
    console.log(cl);
  };
  //example color product choosen
  const productColor = data.productColor();
  return (
    <div className="product-action p-4">
      <span className="title">Lorem ipsum dolor sit amet, consectetur</span>
      <div className="">190,000</div>
      <div className="tab p-3">
        <div className="buy-tab p-1">
          <span>MUA HÀNG</span>
        </div>
        <div className="detail-tab p-1">
          <a href="#footer">CHI TIẾT</a>
        </div>
        <div className="param-tab p-1">
          <Link to="#">THÔNG SỐ</Link>
        </div>
      </div>
      <div className="product-content">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus aliquam sapiente dignissimos quasi laudantium
          doloribus, eligendi praesentium ab magni velit id modi nulla autem ea
          natus aspernatur officiis ullam accusamus!
        </p>
      </div>
      <div className="product-choose-color">
        <h5>Mã màu:</h5>
        <div className="choose-color">
          {productColor.map((value,index) => (
            <div className={"box-choose "+index==cl?'clicked-color':''} onClick={()=>handleChooseColor(index)}>
              <div className={"box-color m-1 " + value}>{value}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="product-quantity mt-4">
        <h5>Số lượng:</h5>
      </div>
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
      <div className="product-buy mt-5">
        <YLButton varian="primary" value="Thêm vào giỏ hàng"></YLButton>
        <YLButton varian="light" value="Mua ngay"></YLButton>
      </div>
    </div>
  );
}

export default ProductAction;
