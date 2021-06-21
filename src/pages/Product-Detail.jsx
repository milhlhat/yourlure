import React, { useEffect, useState } from "react";
import CardProduct from "components/card/card-product";
import ProductImage from "components/product/product-detail/ProductMedia";
import ProductAction from "components/product/product-detail/ProductAction";
import data from "assets/dumy-data/data-product.js";
import ProductAPI from "api/product-api";
import Carosel from 'components/card/Carosel';

ProductDetail.propTypes = {};


function ProductDetail(props) {
  const [productDetail, setProductDetail] = useState({
    list: null,
    isFetched: false,
    failFetch: false,
  });
  const [productSameList, setProductSameList] = useState({
    list: null,
    isFetched: false,
    failFetch: false,
  });
  const fetchProduct = async () => {
    try {
      const response = await ProductAPI.getProductByID(props.match.params.id);
      if (response.error) {
        setProductDetail({ ...productDetail, failFetch: true });
        throw new Error(response.error);
      } else {
        setProductDetail({
          list: response,
          isFetched: true,
          failFetch: false,
        });
      }
    } catch (error) {
      console.log("fail to fetch customer list");
    }
  };
  const fetchProductSame = async () => {
    try {
      const response = await ProductAPI.getBestSeller();
      if (response.error) {
        setProductSameList({ ...productSameList, failFetch: true });
        throw new Error(response.error);
      } else {
        setProductSameList({
          list: response,
          isFetched: true,
          failFetch: false,
        });
      }
    } catch (error) {
      console.log("fail to fetch customer list");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProduct();
    fetchProductSame();
  }, []);
  return (
    <div className="container">
      <div className="d-flex m-2 row">
        <div className=" col-md-6 col-sm-12  mt-4">
          <ProductImage product={productDetail.list}/>
        </div>
        <div className=" col-md-6 col-sm-12  mt-4">
          <ProductAction product={productDetail.list} />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div
            className="product-info-detail bg-white bg-shadow m-2 my-5 p-3 p-md-4"
            id="more-description"
          >
            <div className="title-detail-description bg-body">
              <h3>Chi tiết sản phẩm</h3>
            </div>
            <div className="descrip-content">
              {productDetail.list
                ? productDetail.list.description
                : "description null"}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white bg-shadow product-similar d-flex m-2">
        <h3 className="ms-md-4 ms-2">Sản phẩm tương tự </h3>
      </div>
      <div className="bg-white bg-shadow product-similar d-flex m-2 mt-5">
        <h3 className="ms-md-4 ms-2">Sản phẩm phổ biến </h3>
      </div>
    </div>
  );
}

export default ProductDetail;
