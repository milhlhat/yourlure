import React, { useEffect, useState } from "react";
import ProductImage from "components/product/product-detail/ProductMedia";
import ProductAction from "components/product/product-detail/ProductAction";
import ProductAPI from "api/product-api";
import Carosel from "components/card/Carosel";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilter } from "utils/product";
import Loading from "components/Loading";
import ErrorLoad from "components/error-notify/ErrorLoad";
import { useHistory } from "react-router-dom";
import slugify from "slugify";
import { safeContent } from "utils/common";
import NotFound from "./Notfound";
import { Helmet } from "react-helmet";
import { NotEqualStencilFunc } from "three";

ProductDetail.propTypes = {};

function ProductDetail(props) {
  const productId = props.match.params.id;
  const currentPath = props.match.url;
  const dispatch = useDispatch();
  const productByCateId = useSelector((state) => state.productFilter.data);
  const filter = useSelector((state) => state.productFilter.filter);
  const history = useHistory();
  const [bigImgLink, setBigImgLink] = useState();
  const [productDetail, setProductDetail] = useState({
    list: null,
    isSuccess: true,
    isLoading: false,
  });
  const [productSame, setProductSame] = useState({
    list: null,
    isLoading: false,
    isSuccess: true,
  });
  const [productCustomize, setProductCustomize] = useState({
    list: null,
    isLoading: false,
    isSuccess: true,
  });
  const [notfound, setNotfound] = useState(false);
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

        fetchFilter(dispatch, {
          ...filter,
          listCateId: [response?.category?.categoryId],
        });
        setProductCustomize({
          ...productCustomize,
          list: null,
        });
        if (response.customizable) {
          fetchProductCustomize();
        }
      }
    } catch (error) {
      if (error?.response?.status === 404) {
        setNotfound(true);
      }
      setProductDetail({
        ...productDetail,
        isSuccess: false,
        isLoading: false,
      });
      console.log("fail to fetch customer list");
    }
  };
  const fetchProductSame = async () => {
    setProductSame({ ...productSame, isLoading: true });
    try {
      const response = await ProductAPI.getBestSeller();
      if (response.error) {
        throw new Error(response.error);
      } else {
        setProductSame({
          list: response,
          isLoading: false,
          isSuccess: true,
        });
      }
    } catch (error) {
      console.log("fail to fetch customer list");
    }
  };
  const fetchProductCustomize = async () => {
    setProductCustomize({ ...productCustomize, isLoading: true });
    try {
      const response = await ProductAPI.getCustomizeByProductId(productId);
      if (response.error) {
        throw new Error(response.error);
      } else {
        setProductCustomize({
          list: response,
          isLoading: false,
          isSuccess: true,
        });
      }
    } catch (error) {
      setProductCustomize({
        list: null,
        isLoading: false,
        isSuccess: false,
      });
      console.log("fail to fetch customer list");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProduct();
    fetchProductSame();
    setBigImgLink(null);
  }, [productId]);

  useEffect(() => {
    const slugPath = `${currentPath}/${slugify(
      productDetail?.list?.productName || ""
    )}`;
    history.replace(slugPath);
  }, [productDetail]);
  if (notfound) {
    return <NotFound />;
  } else if (productDetail.isLoading) {
    return <Loading hasLayout />;
  } else if (!productDetail.isSuccess) {
    return <ErrorLoad hasLayout />;
  } else
    return (
      <div className="container">
        <Helmet>
          (<title> {`${productDetail.list?.productName} | Yourlure`}</title>
          <meta
            name="title"
            content={`${productDetail.list?.productName} | Yourlure`}
          />
          <meta name="description" content={productDetail?.list?.description} />
          )
        </Helmet>
        <div className="my-2 row">
          <div className=" col-md-6 col-sm-12  mt-4 ">
            <ProductImage
              product={productDetail.list}
              bigImgLink={bigImgLink}
              setBigImgLink={setBigImgLink}
              productCustomize={productCustomize}
            />
          </div>
          <div className=" col-md-6 col-sm-12  mt-4">
            <ProductAction
              product={productDetail.list}
              bigImgLink={bigImgLink}
              setBigImgLink={setBigImgLink}
              productCustomize={productCustomize}
            />
          </div>
        </div>
        <div
          className="product-info-detail bg-white bg-shadow  my-3 py-3 p-md-4"
          id="more-description"
        >
          <div className="title-detail-description ">
            <h3>Chi tiết sản phẩm</h3>
          </div>
          <p
            className="product-description"
            dangerouslySetInnerHTML={safeContent(
              productDetail?.list?.content
                ? productDetail?.list?.content
                : productDetail?.list?.description
            )}
          />
        </div>
        <div className="owl-policy my-md-4 my-3 bg-white bg-shadow  p-md-4 py-2">
          <div className="col-md-3 col-6 item">
            <i className="fa fa-truck" />
            <p>Vận chuyển toàn quốc</p>
            <span>Thanh toán khi nhận hàng.</span>
          </div>

          <div className="col-md-3 col-6 item">
            <i className="fa fa-download" />
            <p>Xử lý đơn hàng</p>
            <span>
              Đợn hàng thường được xác nhận trong 2h, và giao hàng trong 3-6
              ngày.
            </span>
          </div>
          <div className="col-md-3 col-6 item">
            <i className="fas fa-sync-alt" />
            <p>Quy định đổi trả</p>
            <span>Thủ tục đổi trả đơn giản và dễ ràng.</span>
          </div>
          <div className="col-md-3 col-6 item">
            <i className="fa fa-shield" />
            <p>Bảo mật</p>
            <span>Mọi thông tin khách hàng đều được bảo mật.</span>
          </div>
        </div>
        <div className="bg-white bg-shadow py-3 my-2 mt-3">
          <h3 className="col-12 ms-md-4 ms-2">Sản phẩm tương tự </h3>

          <div className="top-product-show mt-5 mb-3 d-block">
            {productByCateId.productOutList && (
              <Carosel
                products={productByCateId.productOutList}
                caroselId="bestsaleproduct"
              />
            )}
          </div>
        </div>
        <div className=" bg-white bg-shadow py-3 my-2 mt-3">
          <h3 className="col-12 ms-md-4 ms-2">Sản phẩm phổ biến </h3>

          <div className="top-product-show mt-5 mb-3 d-block">
            {productSame.list && (
              <Carosel
                products={productSame.list}
                caroselId="bestsaleproduct"
              />
            )}
          </div>
        </div>
      </div>
    );
}

export default ProductDetail;
