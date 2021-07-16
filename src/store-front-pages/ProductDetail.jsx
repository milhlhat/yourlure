import React, { useEffect, useState } from "react";
import CardProduct from "components/card/CardProduct";
import ProductImage from "components/product/product-detail/ProductMedia";
import ProductAction from "components/product/product-detail/ProductAction";
import data from "assets/dumy-data/data-product.js";
import ProductAPI from "api/product-api";
import Carosel from "components/card/Carosel";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilter } from "utils/product";
import Loading from "components/Loading";
import ErrorLoad from "components/error-notify/ErrorLoad";

ProductDetail.propTypes = {};

function ProductDetail(props) {
  const productId = props.match.params.id;
  const dispatch = useDispatch();
  const productByCateId = useSelector((state) => state.productFilter.data);
  const filter = useSelector((state) => state.productFilter.filter);


  const [bigImgLink, setBigImgLink] = useState();
  const [productDetail, setProductDetail] = useState({
    list: null,
    isSuccess: true,
    isLoading: false,
  });
  const [productSameList, setProductSameList] = useState({
    list: null,
    isLoading: false,
    isSuccess: true,
  });
  const fetchProduct = async () => {
    setProductDetail({ ...productDetail, isLoading: true });
    try {
      const response = await ProductAPI.getProductByID(productId);
      if (response.error) {
        throw new Error(response.error);
      } else {
        setProductDetail({
          list: response,
          isSuccess: true,
          isLoading: false,
        });
      }
    } catch (error) {
      setProductDetail({
        ...productDetail,
        isSuccess: false,
        isLoading: false,
      });
      console.log("fail to fetch customer list");
    }
  };
  const fetchProductSame = async () => {
    try {
      const response = await ProductAPI.getBestSeller();
      if (response.error) {
        throw new Error(response.error);
      } else {
        setProductSameList({
          list: response,
          isLoading: false,
          isSuccess: true,
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
    fetchFilter(dispatch, { ...filter, listCateId: [1] });
  }, [productId]);
  if (productDetail.isLoading) {
    return <Loading hasLayout />;
  } else if (!productDetail.isSuccess) {
    return <ErrorLoad hasLayout/>;
  } else
    return (
      <div className="container">
        <div className="d-flex m-2 row">
          <div className=" col-md-6 col-sm-12  mt-4">
            <ProductImage product={productDetail.list} bigImgLink={bigImgLink} setBigImgLink={setBigImgLink}/>
          </div>
          <div className=" col-md-6 col-sm-12  mt-4">
            <ProductAction product={productDetail.list} bigImgLink={bigImgLink} setBigImgLink={setBigImgLink}/>
          </div>
        </div>
        <div
          className="product-info-detail bg-white bg-shadow m-2 my-3 p-3 p-md-4"
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
        <div className="owl-policy my-md-4 my-3 bg-white bg-shadow row mx-2 p-md-4 p-2">
          <div className="col-md-3 col-6 item">
            <i className="fa fa-truck"></i>
            <p>Vận chuyển toàn quốc</p>
            <span>
              Chúng tôi giao hàng bằng hình thức COD. Thanh toán khi nhận hàng.
            </span>
          </div>
          {/* <div className="col-md-3 col-6 item">
          <i className="fa fa-question-circle-o"></i>
          <p>Hỗ trợ 24/7</p>
          <span>Liên hệ hỗ trợ 24h/ngày.</span>
        </div> */}
          <div className="col-md-3 col-6 item">
            <i className="fa fa-download"></i>
            <p>Xử lý đơn hàng</p>
            <span>
              Đợn hàng thường được xác nhận trong 2h, và giao hàng trong 3-6
              ngày.
            </span>
          </div>
          <div className="col-md-3 col-6 item">
            <i className="fas fa-sync-alt"></i>
            <p>Quy định đổi trả</p>
            <span>Thủ tục đổi trả đơn giản và rễ ràng.</span>
          </div>
          <div className="col-md-3 col-6 item">
            <i className="fa fa-shield"></i>
            <p>Bảo mật</p>
            <span>Mọi thông tin khách hàng đều được bảo mật.</span>
          </div>
        </div>
        <div className="row bg-white bg-shadow product-similar d-flex m-2">
          <h3 className="col-12 -ms-md-4 ms-2">Sản phẩm tương tự </h3>

          <div className="top-product-show mt-5 mb-3">
            {productByCateId.productOutList && (
              <Carosel
                products={productByCateId.productOutList}
                caroselId="bestsaleproduct"
              />
            )}
          </div>
        </div>
        <div className="row bg-white bg-shadow product-similar d-flex m-2 mt-5">
          <h3 className="col-12 ms-md-4 ms-2">Sản phẩm phổ biến </h3>

          <div className="top-product-show mt-5 mb-3">
            {productSameList.list && (
              <Carosel
                products={productSameList.list}
                caroselId="bestsaleproduct"
              />
            )}
          </div>
        </div>
      </div>
    );
}

export default ProductDetail;
