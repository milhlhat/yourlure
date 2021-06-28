import React, { useState } from "react";
import PropTypes from "prop-types";
import ManagerProductAPI from "api/manager-product-api";
import { useEffect } from "react";
import YLButton from "components/custom-field/YLButton";
import { setIsBack } from "redux/back-action/back-action";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./scss/manager-product-detail.scss";

ManagerProductDetail.propTypes = {};

function ManagerProductDetail(props) {
  const canBack = {
    canBack: true,
    path: "/manager/product",
    label: "Sản phẩm",
  };
  const dispatch = useDispatch();
  const history = useHistory();
  const productId = props.match.params.id;
  const [productDetail, setProductDetail] = useState({
    list: null,
    loading: true,
    success: false,
  });
  const fetchProduct = async () => {
    try {
      const response = await ManagerProductAPI.getProductByID(productId);
      if (response.error) {
        throw new Error(response.error);
      } else {
        setProductDetail({
          list: response,
          loading: false,
          success: true,
        });
      }
    } catch (error) {
      console.log("fail to fetch customer list");
    }
  };
  useEffect(() => {
    if (canBack) {
      const action = setIsBack({
        canBack: canBack.canBack,
        path: canBack.path,
        label: canBack.label,
      });
      dispatch(action);
    }
  }, [canBack]);
  useEffect(() => {
    fetchProduct();
  }, [productId]);
  return (
    <div className="bg-white bg-shadow manager-product-detail p-3">
        {console.log(productId)}
      <div className="manager-product-edit mb-3 mb-md-5 float-end">
        <YLButton
          variant="warning"
          value="Chính sửa"
          to={{ pathname: "/manager/product/edit/"+productId, canBack: null }}
        />
      </div>

      <div className="manager-product-info">
        <table>
          <tbody>
            <tr>
              <th>ID</th>
              <td>{productDetail?.list?.productId}</td>
            </tr>
            <tr>
              <th>Tên sản phẩm</th>
              <td>{productDetail?.list?.productName}</td>
              <th>Danh mục</th>
              <td>{productDetail?.list?.categoryId}</td>
            </tr>
            <tr>
              <th>Giá</th>
              <td>
                {!productDetail?.list?.defaultPrice
                  ? "N/A"
                  : Number(productDetail.list.defaultPrice).toLocaleString(
                      undefined,
                      {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      }
                    )}
              </td>
              <th>Trạng thái</th>
              <td>
                {productDetail?.list?.visibleInStorefront
                  ? productDetail.list.visibleInStorefront
                  : "NaN"}
              </td>
            </tr>
            <tr>
              <th>Hình ảnh</th>
              <td className="product-detail-image">
                {productDetail?.list?.imageCollection.map((images, i) => (
                  <img src={images.linkImage} key={"img" + i}  />
                ))}
              </td>
              <td colSpan="2">
                <caption>Variant</caption>
                <table>
                  <tbody>
                    <tr>
                      <th>Màu</th>
                      <th>Số lượng</th>
                      <th>Giá</th>
                      <th>Hình ảnh</th>
                    </tr>
                    {productDetail?.list?.variantCollection.map(
                      (variant, i) => (
                        <tr key={"variant" + i} className="border-bottom-0">
                          <td>{variant.backgroundColor}</td>
                          <td>{variant.quantity}</td>
                          <td>
                            {variant.newPrice
                              ? variant.newPrice
                              : productDetail.list.defaultPrice}
                          </td>
                          <td><img src={variant.imageUrl} width={50} /> </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <th>Mô tả</th>
              <td colSpan="3">
                <div className={`${productDetail?.list?.description?'detail-description m-2 p-1':''}`}>
                  {productDetail?.list?.description}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManagerProductDetail;
