import React, { useEffect } from "react";
import PropTypes from "prop-types";
import data from "assets/dumy-data/data-product.js";
import CartProduct from "components/cart/CartProduct";
import CardProduct from "components/card/card-product";
import "assets/scss/scss-components/product/product-by-cate.scss";

ProductByCate.propTypes = {};

function ProductByCate(props) {
  const products = data.products();
  const cates = data.category();

  useEffect(() => {
    // console.log('by bate ');
    // console.log(products);
  }, []);
  return (
    <div className="bg-white">
      {cates.map((cate, index) => (
        <div className="" key={index}>
          <div className="row mb-5">
            <span className="col-7   col-md-5">
              <b className="m-md-5 m-2">{cate.name}</b>
            </span>
            <a className="col-5 col-md-3 offset-md-4">Xem thêm</a>
          </div>
          <div className="product-card-row m-xl-5">
            {products.map((product, indexx) => (
              <React.Fragment key={indexx}>
                {product.categoryId == cate.id && (
                  <CardProduct product={product}  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductByCate;
