import React from "react";
import PropTypes from "prop-types";
import CartProduct from "components/card-product";
import ProductImage from "components/product/product-detail/product-media";
import ProductAction from "components/product/product-detail/product-action";
import SelectLocation from "components/select-location/select-location";
ProductDetail.propTypes = {};
 
let dummyimg = [
  "https://thegioidocau.vn/vnt_upload/product/2019/12/moi-ca-v5-fimax-31.jpg",
  "https://salt.tikicdn.com/cache/w444/ts/product/c0/4a/ee/a32098a9fc5b043d015eb6c5e0e484a4.jpg",
  "https://docautuankiet.com/uploads/products/05022020033936/moi-gia-orochi_05022020033936.jpg",
];
function ProductDetail(props) {
  return (
    <div className="">
      <div className="d-flex m-2 row">
        <div className="bg-white col-md-6 col-sm-12">
          <ProductImage data={dummyimg}/>
        </div>
        <div className="bg-white col-md-6 col-sm-12">
          <ProductAction/>
        </div>
      </div>
      <div className="bg-white d-flex m-2">
        <CartProduct />
        <CartProduct />
        <CartProduct />
      </div>
      
    </div>
  );
}

export default ProductDetail;
