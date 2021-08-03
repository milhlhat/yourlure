import ProductAPI from "api/product-api";
import "assets/scss/scss-components/card-product.scss";
import ConfirmPopupV2 from "components/confirm-popup/ConfirmPopupV2";
import YLButton from "components/custom-field/YLButton";
import React from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { convertToVND } from "utils/format-string";
import { createImageUrlByLinkOrFile } from "utils/manager-product";
CardCustom.propTypes = {};

function CardCustom(props) {
  const { product, canCustom ,fetchCustomize} = props;
  const history = useHistory();
  const handleClick = (id) => {
    history.push(`/product/detail/${id}`);
  };

  const onConfirm = async (id) => {
    try {
      const response = await ProductAPI.deleteCustomize(id);
      if(response.error){
        throw new Error();
      }
      toast.success("Xóa tùy biến thành công");
      fetchCustomize();
    } catch (error) {
      toast.error("Xóa tùy biến thất bại");
      console.log("fail to fetch address");
    }
  };
  return (
    <>
      {product && (
        <div
          className="card-product align-items-center m-2 "
          onClick={() => handleClick(product.productId)}
        >
          <div className="thumb">
            <img
              className="card-img-top"
              src={createImageUrlByLinkOrFile(product?.thumbnailUrl)}
            />
            <div
              className="delete-custom-button"
              onClick={(e) => e.stopPropagation()}
            >
              <ConfirmPopupV2
                children={<i className="fad fa-times-circle"></i>}
                title={`Xóa "${product?.name}"`}
                onConfirm={()=>onConfirm(product.customizeId)}
              />
            </div>
          </div>
          <div className="d-flex flex-column card-info w-100 thum p-2 pb-4">
            <span className="text-color text-small">{product.brand}</span>
            <span className="mt-2 text-name-product text-ellipsis">
              {product.productName ? product.productName : ""}
            </span>
            <span className="text-color-primary">
              {!product
                ? "N/A"
                : convertToVND(product?.defaultPrice + product?.customPrice)}
            </span>
            {canCustom && (
              <div onClick={(e) => e.stopPropagation()} className="">
                <YLButton
                  variant="primary"
                  to={`/product/customize?productId=${product.productId}&isEdit=true&customizeId=${product.customizeId}`}
                >
                  Chỉnh sửa
                </YLButton>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default CardCustom;
