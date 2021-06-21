import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import YLButton from "../../custom-field/YLButton";

function ProductAction(props) {
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState();
  const [price, setPrice] = useState();
  const {product}=props;
  const decrement = () => {
    Number(quantity) <= 1 ? setQuantity(1) : setQuantity(Number(quantity) - 1);
  };
  const increment = () => {
    setQuantity(Number(quantity) + 1);
  };
  function handleChooseColor (index)  {
    setColor(index);
  };
  function handleChangePrice(value){
    setPrice(value?value:product.defaultPrice);
  }
 
  useEffect(()=>{
    setColor(product?product.variantCollection[0].backgroundColor:'');
    setPrice(product?product.defaultPrice:'');
    
  },[product]);
  return (
    <div className="bg-white bg-shadow product-action p-4">
      <span className="title">{product==null?"name":product.productName}</span>
      <div className="">
      {product==null?"price":Number(price).toLocaleString(
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
          <a href="#more-description">CHI TIẾT</a>
        </div>
        <div className="param-tab p-1">
          <Link to="#">THÔNG SỐ</Link>
        </div>
      </div>
      <div className="product-content">
        <span>{product?product.description:''}</span>
      </div>
      <div className="product-choose-color">
        <h5>Mã màu: {color}</h5>
        <div className="choose-color">
          {product && product.variantCollection.map((value, index) => (
            <div
              key={index}
              className={`box-choose `}
              onClick={() => {handleChooseColor(product.variantCollection[index].backgroundColor);handleChangePrice(product.variantCollection[index].newPrice?product.variantCollection[index].newPrice:null)}}
            >
              <div className={`box-color m-1 ${value.backgroundColor} ${product.variantCollection[index].backgroundColor==color?'clicked-color':''}`} >
                <img src={product.variantCollection[index].imageUrl? product.variantCollection[index].imageUrl:product.imageCollection[0].linkImage} alt="lỗi" />
                </div>
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
