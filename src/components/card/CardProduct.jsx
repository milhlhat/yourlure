import React from "react";
import "assets/scss/scss-components/card-product.scss";
import { useHistory } from "react-router";
import { createImageUrlByLinkOrFile } from "utils/manager-product";
import { convertToVND } from "utils/format-string";
import YLButton from "components/custom-field/YLButton";
import DEFINELINK from "routes/define-link";
CardProduct.propTypes = {};

function CardProduct(props) {
  const { product, canCustom } = props;
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
              {!product ? "N/A" : convertToVND(product.defaultPrice)}
            </span>
            {canCustom && (
              <div onClick={(e) => e.stopPropagation()} className={"mt-3"}>
                <YLButton
                  variant="primary"
                  to={`/product/customize?productId=${product.productID}&isEdit=false`}
                  width={"100%"}
                >
                  Tùy biến ngay
                </YLButton>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default CardProduct;
