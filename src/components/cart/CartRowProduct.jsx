import React, { useContext, useEffect, useState } from "react";
import ChangeQuantity from "components/orther/ChangeQuantity";
import "assets/scss/scss-components/cart/cart-row.scss";
import ConfirmPopup from "components/confirm-popup/ComfirmPopup";
import ProductAPI from "api/product-api";
import { convertToVND } from "utils/format-string";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartGuest,
  setCartGuest,
  updateQuantityCarts,
} from "redux/cart/cart-guest";
import { useHistory } from "react-router-dom";
import { isFulfilled } from "@reduxjs/toolkit";
import Loading from "components/Loading";
import ErrorLoad from "components/error-notify/ErrorLoad";
import { AbilityContext } from "ability/can";
import CartAPI from "api/user-cart-api";
import { toast } from "react-toastify";
import { createImageUrlByLinkOrFile } from "utils/manager-product";

function CartRowProduct(props) {
  const ability = useContext(AbilityContext);
  const isLoggedIn = ability.can("login", "website");
  const {
    item,
    canChange,
    setListTotal,
    listTotal,
    fetchCart,
    handleChangeSelected,
    cartData,
  } = props;
  const handleChangeQuantity = (quantity) => {};
  const handleCheckBox = (value, checked) => {};
  const [quantity, setQuantity] = useState(item?.quantity);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    setQuantity(item.quantity);
  }, [item]);
  const onConfirm = async (data) => {
    if (isLoggedIn) {
      try {
        const response = await CartAPI.deleteItem(item.cartItemId);
        if (response.data != null && !response.data) {
          throw new Error();
        } else if (response.error) {
          throw new Error(response.error);
        } else {
          fetchCart();
        }
      } catch (error) {
        toast.error("Xóa thất bại");
        console.log("fail to fetch delete ");
      }
    } else {
      const action = deleteCartGuest(data);
      dispatch(action);
    }
  };
  const sumPrice = () => {
    return item?.price * quantity;
  };
  useEffect(async () => {
    if (canChange) {
      if (isLoggedIn) {
        try {
          const response = await CartAPI.updateQuantity(
            item.cartItemId,
            quantity
          );
          if (response.data != null && !response.data) {
            throw new Error();
          } else if (response.error) {
            throw new Error(response.error);
          } else {
            fetchCart();
          }
        } catch (error) {
          toast.error("thay đổi số lượng thất bại");
          console.log("fail to fetch update ");
        }
      } else {
        const action = updateQuantityCarts({ ...item, quantity: quantity });
        dispatch(action);
      }

      if (listTotal?.data?.length) {
        let exist = false;
        for (let o of listTotal?.data) {
          if (
            o.productId === item.productId &&
            o.variantId === item.variantId
          ) {
            o.quantity = quantity;
            exist = true;
            break;
          }
        }
        if (!exist) {
          let newArr = listTotal;
          newArr.push({ ...item, quantity: quantity });
          setListTotal((prevState) => {
            return { ...prevState, data: newArr };
          });
        }
      }
    }
  }, [quantity]);

  return (
    <div className="bg-white row-cart text-small">
      {/* {console.log(item)} */}
      <table>
        <tbody>
          <tr>
            <td>
              {canChange&&<input
                type="checkbox"
                value={item?.variantId}
                onChange={() => handleChangeSelected(item)}
                defaultChecked={true}
              />}
            </td>
            <td className="d-flex align-items-center">
              <img
                className="content-fit pointer"
                src={createImageUrlByLinkOrFile(item?.variantImg?item?.variantImg:item?.thumbnailUrl)}
                width={canChange ? 100 : 50}
                height={canChange ? 100 : 50}
                alt="ảnh sản phẩm"
                onClick={() =>
                  history.push(`/product/detail/${item?.productId}`)
                }
              />
              <div className="right ms-2">
                <span
                  className="text-small pointer bold"
                  onClick={() =>
                    history.push(`/product/detail/${item?.productId}`)
                  }
                >
                  {item?.productName}
                </span>
                <br />
                <span className="text-small bold">
                  {convertToVND(item?.price)}
                </span>
                <br />
                {!canChange && (
                  <span className="text-x-small">
                    Số lượng:
                    {quantity}
                  </span>
                )}
                <br />
                <span className="text-x-small">
                  Màu sắc:
                  {item?.variantName}
                </span>
                <br />
                <span className="text-x-small">
                  Trọng lượng: {item?.weight} (g)
                </span>
                <br />
                {/* <a className="" href="/product">
                  sửa
                </a> */}
              </div>
            </td>
            <td>
              <div className="d-flex float-end">
                {canChange && (
                  <span>
                    <ChangeQuantity
                      quantity={quantity}
                      setQuantity={setQuantity}
                    />
                  </span>
                )}
                <span className="mx-3">{convertToVND(sumPrice())}</span>
                {canChange && (
                  <ConfirmPopup
                    variant="light"
                    width="30px"
                    height="25px"
                    btnText={<i className="fal fa-times"></i>}
                    title="Xóa sản phẩm"
                    content="Bạn chắc chắn muốn xóa sản phẩm khỏi giỏ hàng ?"
                    onConfirm={() => onConfirm(item)}
                  />
                )}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <hr />
    </div>
  );
}

export default CartRowProduct;
