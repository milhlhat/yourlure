import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import YLButton from "../../custom-field/YLButton";
import data from "./dumy-data";

function ProductAction(props) {
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState(0);
  const {product}=props;
  var cl = 0;
  const decrement = () => {
    Number(quantity) <= 1 ? setQuantity(1) : setQuantity(Number(quantity) - 1);
    console.log(quantity);
  };
  const increment = () => {
    setQuantity(Number(quantity) + 1);
    console.log(quantity);
  };
  const handleChooseColor = (index) => {
    console.log(index);
    setColor(index);
    cl = index;
    console.log(cl);
  };
  //example color product choosen
  const productColor = data.productColor();
  useEffect(()=>{
    console.log('product');
    console.log(product);
  },[]);
  return (
    <div className="product-action p-4">
      <span className="title">{product==null?"name":product.productName}</span>
      <div className="">
      {product==null?"price":Number(product.defaultPrice).toLocaleString(
                      undefined,
                      {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      }
                    )}
                    đ
        </div>
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
        <span>{product?product.description:''}</span>
      </div>
      <div className="product-choose-color">
        <h5>Mã màu:</h5>
        <div className="choose-color">
          {productColor.map((value, index) => (
            <div
              key={index}
              className={"box-choose " + index == cl ? "clicked-color" : ""}
              onClick={() => handleChooseColor(index)}
            >
              <div className={"box-color m-1 " + value}>{value}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="product-quantity mt-4 row">
        <h5>Số lượng:</h5>
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
      </div>

      <div className="product-buy mt-5">
        <YLButton variant="primary" value="Thêm vào giỏ hàng"></YLButton>
        <YLButton variant="light" value="Mua ngay"></YLButton>
      </div>
    </div>
  );
}

export default ProductAction;
