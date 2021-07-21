import React from "react";
import "assets/scss/scss-components/card-product.scss";
import { useHistory } from "react-router";
import { createImageUrlByLinkOrFile } from "utils/manager-product";
CardProduct.propTypes = {};

function CardProduct(props) {
  const { product } = props;
  const history = useHistory();
  const handleClick = (id) => {
    history.push(`/product/detail/${id}`);
  };

  return (
    <>
      {product && (
        <div
          className="card-product align-items-center m-2 "
          onClick={() => handleClick(product.productID)}
        >
          <div className="thumb">
            <img
              className="card-img-top"
              src={
                createImageUrlByLinkOrFile(
                  product.imageCollection && product.imageCollection.length > 0
                    ? product.imageCollection[0].linkImage
                    : ""
                )
                // product.imageCollection && product.imageCollection.length > 0
                // 	? product.imageCollection[0].linkImage
                // 	: ''
              }
            />
          </div>

          <div className="d-flex flex-column card-info w-100 thum p-2 pb-4">
            <span className="text-color text-small">{product.brand}</span>
            <span className="mt-2 text-name-product text-ellipsis">
              {product.productName ? product.productName : ""}
            </span>
            <span className="text-color-primary">
              {!product
                ? "N/A"
                : Number(product.defaultPrice).toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  })}{" "}
              {"\u20AB"}
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export default CardProduct;
