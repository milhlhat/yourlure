import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import YLButton from "../../custom-field/YLButton";

function ProductAction(props) {
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState();
  const [price, setPrice] = useState();
  let takeOut = 0;
  const { product } = props;
  const decrement = () => {
    Number(quantity) <= 1 ? setQuantity(1) : setQuantity(Number(quantity) - 1);
  };
  const increment = () => {
    Number(quantity) >= takeOut ? setQuantity(takeOut) : setQuantity(Number(quantity) + 1);
    // setQuantity(Number(quantity) + 1);
  };
  function handleChooseColor(index) {
    setColor(index);
  }
  function handleChangePrice(value) {
    setPrice(value ? value : product.defaultPrice);
  }

  useEffect(() => {
    setColor(
      product && product.variantCollection[0]
        ? product.variantCollection[0].variantId
        : ""
    );
    setPrice(product ? product.defaultPrice : "");
  }, [product]);
  return (
    <div className="bg-white bg-shadow product-action p-4">
      <span className="title">
        {product == null ? "name" : product.productName}
      </span>
      <div className="">
        {product == null
          ? "price"
          : Number(price).toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}
        đ
      </div>
      <div className="tab p-3">
        <div className="buy-tab p-1">
          <span>MUA HÀNG</span>
        </div>
        <div className="detail-tab p-1">
          <a href="#more-description">CHI TIẾT</a>
        </div>
      </div>
      <div className="product-description mx-2 mx-md-4 ">
        {product ? product.description : ""}
      </div>
      <div className="product-parameter my-md-5 my-3 mx-2 mx-md-4">
        <h3>Thông số:</h3>
        <span>Chiều dài: {product ? product.length : ""} cm</span>
        <br />
        <span>
          Trọng lượng:{" "}
          <input
            type="number"
            defaultValue={product ? product.defaultWeight : ""}
            min={product ? product.minWeight : ""}
            max={product ? product.maxWeight : ""}
          />
        </span>
        <br />
        <span>Lặn sâu: {product ? product.deepDiving : ""}</span>
      </div>
      <div className="product-choose-color">
        <h5>Mã màu: {color}</h5>
        <div className="choose-color">
          {product &&
            product.variantCollection.map((value, index) => (
              <div
                key={index}
                className={`box-choose `}
                onClick={() => {
                  handleChooseColor(product.variantCollection[index].variantId);
                  handleChangePrice(
                    product.variantCollection[index].newPrice
                      ? product.variantCollection[index].newPrice
                      : null
                  );
                }}
              >
                <div
                  className={`box-color m-1 ${value.variantId} ${
                    product.variantCollection[index].variantId == color
                      ? "clicked-color"
                      : ""
                  }`}
                >
                  <img
                    src={
                      product.variantCollection[index].imageUrl
                        ? product.variantCollection[index].imageUrl
                        : product.imageCollection[0].linkImage
                    }
                    alt="lỗi"
                  />
                </div>
                <span className="d-none">
                  {" "}
                  {product.variantCollection[index].variantId == color
                    ? (takeOut = product.variantCollection[index].quantity)
                    : ""}
                </span>
              </div>
            ))}
        </div>
        <span>{takeOut <= 0 ? "Hết hàng" : "còn "+takeOut+" sản phẩm"}</span>
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
