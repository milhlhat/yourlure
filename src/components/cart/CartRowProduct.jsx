import { AbilityContext } from "authorization/can";
import CartAPI from "api/user-cart-api";
import "assets/scss/scss-components/cart/cart-row.scss";
import ConfirmPopup from "components/confirm-popup/ComfirmPopup";
import ChangeQuantity from "components/orther/ChangeQuantity";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteCartGuest, updateQuantityCarts } from "store/cart/cart-guest";
import { convertToVND } from "utils/format-string";
import { createImageUrlByLinkOrFile } from "utils/manager-product";

function CartRowProduct(props) {
  const ability = useContext(AbilityContext);
  const isLoggedIn = ability.can("login", "website");
  const {
    item,
    canChange,
    fetchCart,
    handleChangeSelected,
    cartsSelected,
    setCheckChange,
  } = props;
  const [quantity, setQuantity] = useState(item?.quantity);
  const history = useHistory();
  const dispatch = useDispatch();
  const onConfirm = async (data) => {
    if (isLoggedIn) {
      try {
        const response = await CartAPI.deleteItem(item.cartItemId);
        if (response.data != null && !response.data) {
          throw new Error();
        } else if (response.error) {
          throw new Error(response.error);
        } else {
          setCheckChange(2);
          fetchCart();
        }
      } catch (error) {
        toast.error("Xóa thất bại");
        console.log("fail to fetch delete ");
      }
    } else {
      setCheckChange(2);
      const action = deleteCartGuest(data);
      dispatch(action);
    }
  };
  const sumPrice = () => {
    return item?.price * quantity;
  };
  const ischecked = () => {
    let product = cartsSelected.find(
      (o) =>
        o.variantId === item.variantId &&
        o.customModelId === item.customModelId &&
        o.weight === item.weight
    );
    return product ? true : false;
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
            setCheckChange(1);
            fetchCart();
          }
        } catch (error) {
          toast.error("thay đổi số lượng thất bại");
          console.log("fail to fetch update ");
        }
      } else {
        setCheckChange(1);
        const action = updateQuantityCarts({ ...item, quantity: quantity });
        dispatch(action);
      }
    }
  }, [quantity]);

  return (
    <div className="bg-white row-cart text-small">
      <table>
        <tbody>
          <tr>
            <td>
              {canChange &&
                (item?.thumbnailUrl ||
                  (item?.visibleInStorefront && item?.variantQuantity > 0)) && (
                  <input
                    type="checkbox"
                    value={item?.variantId}
                    onChange={() => handleChangeSelected(item)}
                    checked={ischecked()}
                  />
                )}
            </td>
            <td className="d-flex align-items-center">
              <img
                className="content-fit pointer"
                src={createImageUrlByLinkOrFile(
                  item?.thumbnailUrl ? item?.thumbnailUrl : item?.variantImg
                )}
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
                    {item?.quantity}
                  </span>
                )}
                <br />
                <span className="text-x-small">
                  Màu sắc:{" "}
                  {item?.variantName ? item.variantName : item.customizeName}
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
                {canChange &&
                  (item?.thumbnailUrl ? (
                    <>
                      <span>
                        <ChangeQuantity
                          quantity={item?.quantity}
                          setQuantity={setQuantity}
                        />
                      </span>

                      <span className="mx-3">{convertToVND(sumPrice())}</span>
                    </>
                  ) : item?.visibleInStorefront ? (
                    item?.variantQuantity > 0 ? (
                      <>
                        <span>
                          <ChangeQuantity
                            quantity={item?.quantity}
                            setQuantity={setQuantity}
                          />
                        </span>

                        <span className="mx-3">{convertToVND(sumPrice())}</span>
                      </>
                    ) : (
                      <span className="text-danger me-3">Hết hàng</span>
                    )
                  ) : (
                    <span className="text-danger me-3">Ngừng kinh doanh</span>
                  ))}
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
