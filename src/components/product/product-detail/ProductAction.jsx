import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setCartGuest } from "redux/cart/cart-guest";
import { convertToVND } from "utils/format-string";
import YLButton from "../../custom-field/YLButton";

function ProductAction(props) {
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState();
  const [price, setPrice] = useState();
  let takeOut = 0;
  const { register, getValues, setValue } = useForm();
  const { product } = props;
  const decrement = () => {
    Number(quantity) <= 1 ? setQuantity(1) : setQuantity(Number(quantity) - 1);
  };
  const increment = () => {
    Number(quantity) >= takeOut
      ? setQuantity(takeOut)
      : setQuantity(Number(quantity) + 1);
    // setQuantity(Number(quantity) + 1);
  };
  function handleChooseColor(index) {
    setColor(index);
  }
  function handleChangePrice(value) {
    setPrice(value ? value : product.defaultPrice);
  }
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    let data = {
      customModelId: null,
      productId: product.productId,
      quantity: quantity,
      variantId: color,
      price:product.defaultPrice,
      variantName:color,
      weight: getValues("weight"),
    };
    if (data.weight > product.maxWeight || data.weight < product.minWeight) {
      alert("Độ nặng không phù hợp, vui lòng chỉnh lại độ nặng");
      setValue("weight", product.defaultWeight);
    } else {
      // console.log(data);
      // let fin=[data]
      // cartData.push(data);
      const action = setCartGuest(data);
      dispatch(action);
      alert(`đã thêm ${data.quantity} sản phẩm vào giỏ hàng.`)
    }
  };
  useEffect(() => {
    setColor(
      product?.variantCollection[0]
        ? product.variantCollection[0].variantId
        : ""
    );
    setValue("weight", product?.defaultWeight);
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
          : convertToVND(price)}
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
            {...register("weight")}
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
          {product?.variantCollection?.map((value, index) => (
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
                  alt="ảnh sản phẩm"
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
        <span>
          {takeOut <= 0 ? "Hết hàng" : "còn " + takeOut + " sản phẩm"}
        </span>
      </div>
      <div className="product-quantity mt-4 row">
        <h5>Số lượng:</h5>
        <div className="product-details-quantity d-flex">
          <button className="quantity-input" onClick={decrement}>
            &mdash;
          </button>
          <input
            {...register("quantity")}
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
        <div onClick={() => handleAddToCart()}>
          <YLButton variant="light" value="Mua ngay"></YLButton>
        </div>
        <div className="ms-2" onClick={() => handleAddToCart()}>
          <YLButton variant="primary" value="Thêm vào giỏ hàng"></YLButton>
        </div>
      </div>
    </div>
  );
}

export default ProductAction;
