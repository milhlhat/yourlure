import { CircularProgress } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { AbilityContext, Can } from "ability/can";
import OrderAPI from "api/order-api";
import UserApi from "api/user-api";
import "assets/scss/scss-pages/payment.scss";
import CartProduct from "components/cart/CartProduct";
import CartRowProduct from "components/cart/CartRowProduct";
import BillLine from "components/payment/BillLine";
import CustomerAddressInput from "components/payment/CustomerAddressInput";
import GusestAddressInput from "components/payment/GuestAddressInput";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { updateAfterBuy } from "redux/cart/cart-guest";
import YLButton from "../components/custom-field/YLButton";
import DEFINELINK from "../routes/define-link";
import { convertToVND, getShipping, totalPrice } from "../utils/format-string";

function Payment(props) {
  const cartData = props.location.cart;
  // const cartData = useSelector((state) => state.cartGuest.carts);
  const history = useHistory();
  const dispatch = useDispatch();
  const methods = useForm();
  const [shipping, setShipping] = useState(getShipping());
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const fetchAddress = async (id) => {
    try {
      const response = await UserApi.getAddressFromWardId(id);
      if (response.error) {
        throw new Error(response.error);
      } else {
        return response;
      }
    } catch (error) {
      return null;
    }
  };

  const [open, setOpen] = useState(false);
  const [billLine, setBillLine] = useState();
  const fullScreen = useMediaQuery(useTheme().breakpoints.down("xs"));
  const [discountValue, setDiscountValue] = useState();
  const [discount, setDiscount] = useState(0);
  const calculateDiscount = (code) => {
    if (code?.minSpentAmount && totalPrice(cartData) < code?.minSpentAmount) {
      toast.warning(
        `Mã giảm giá chỉ áp dụng cho đơn hàng trên ${convertToVND(
          code.minSpentAmount
        )}`
      );
      return 0;
    }
    if (code.type === "Phần trăm") {
      let disCost = Number(code.discountValue * totalPrice(cartData));
      if (disCost > code.maxValue) disCost = code.maxValue;
      setDiscount(code.discountValue * totalPrice(cartData));
    }
    if (code.type === "Free Ship") {
      setShipping(0);
      toast.success(`Mã giảm giá hợp lệ`);
    }
    if (code.type === "Giá trị") {
      setDiscount(code.discountValue);
      toast.success(`Mã giảm giá hợp lệ`);
    }

    return 0;
  };
  const [discountLoad, setDiscountLoad] = useState(false);
  const [completeLoad, setCompleteLoad] = useState(false);
  const onDiscountSubmit = async () => {
    let data = discountValue?.toString().trim();
    setDiscountLoad(true);
    try {
      const response = await OrderAPI.checkDiscount(data);
      if (response.error) {
        throw new Error(response.error);
      } else {
        calculateDiscount(response);
      }
    } catch (error) {
      toast.warning(error.response.data);
      console.log("fail to fetch voucher");
    }
    setDiscountLoad(false);
  };
  const onDiscountDelete = () => {
    setDiscount(0);
    setDiscountValue(null);
  };

  const ability = useContext(AbilityContext);
  const isLoggedIn = ability.can("login", "website");

  const listCartItemId = (cart) => {
    let arr = [];
    if (!cart) return null;
    cart && cart.map((item) => arr.push(item?.cartItemId));
    return arr;
  };
  const getAddress = (address) => {
    return (
      address?.userWardName +
      ", " +
      address?.userProvinceName +
      ", " +
      address?.userDistrictName
    );
  };
  const onSubmit = async (data) => {
    //user payment
    if (isLoggedIn) {
      let cartItemIds = listCartItemId(cartData);
      data = {
        ...data,
        paymentId: 1,
        discountCode: discount === 0 ? "" : discountValue,
      };
      if (cartItemIds[0]) {
        data = { ...data, cartItemIds: listCartItemId(cartData) };
        setCompleteLoad(true);
        try {
          const response = await OrderAPI.userProcessOrder(data);
          if (response.error) {
            throw new Error(response.error);
          } else {
            setBillLine(response);
            toast.success("Mua hàng thành công");
            setOpen(true);
          }
        } catch (error) {
          toast.warning(error.response.data);
          console.log("fail to fetch guest payment, ");
        }
        setCompleteLoad(false);
      } else {
        data = { ...data, cartItems: cartData };
        setCompleteLoad(true);
        try {
          const response = await OrderAPI.userBuyNow(data);
          if (response.error) {
            throw new Error(response.error);
          } else {
            setBillLine(response);
            toast.success("Mua hàng thành công");
            setOpen(true);
          }
        } catch (error) {
          toast.warning(error.response.data);
          console.log("fail to fetch user payment, ");
        }
        setCompleteLoad(false);
      }
    }
    // guest payment
    else {
      let x = await fetchAddress(data.userWardId);
      data.address += ", " + getAddress(x);
      data = {
        ...data,
        paymentId: 1,
        discountCode: discount === 0 ? "" : discountValue,
        cartItems: cartData,
      };
      setCompleteLoad(true);
      try {
        const response = await OrderAPI.guestProcessOrder(data);
        if (response.error) {
          throw new Error(response.error);
        } else {
          setBillLine(response);
          setOpen(true);
          const action = updateAfterBuy(cartData);
          dispatch(action);
          toast.success("Mua hàng thành công");
        }
      } catch (error) {
        toast.warning(error.response.data);
        console.log("fail to fetch guest payment");
      }
      setCompleteLoad(false);
    }
  };

  if (!cartData) {
    history.push("/cart");
    return <CartProduct />;
  } else
    return (
      <form className="container mt-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex flex-wrap justify-content-between">
          <div className="deliver-address p-4 bg-box bg-shadow mb-4 col-12 col-md-7">
            <Can do="read-write" on="customer" passThrough>
              {(allow) =>
                !allow ? (
                  <GusestAddressInput {...methods} />
                ) : (
                  <CustomerAddressInput {...methods} />
                )
              }
            </Can>
          </div>
          <div className="col-12 col-md-5">
            <div className="total-order bg-box bg-shadow px-3">
              <div>
                <span>Giỏ hàng</span>
                <Link
                  to={{ pathname: DEFINELINK.cart, cart: cartData }}
                  className="float-end login-link"
                >
                  Trở về giỏ hàng
                </Link>
              </div>
              <div className="mt-2 list-item pe-2">
                {cartData?.map((item, index) => (
                  <CartRowProduct
                    item={item}
                    key={"cart-row" + index}
                    canChange={false}
                  />
                ))}
              </div>
              <hr />
              <div className="discount-form">
                <label htmlFor="voucher">Nhập mã giảm giá</label>
                <div className="d-flex">
                  <input
                    className="form-control"
                    onChange={(e) => setDiscountValue(e.target.value)}
                    type="text"
                    id="voucher"
                    value={discountValue ? discountValue : ""}
                    disabled={discount > 0}
                  />
                  {discount > 0 ? (
                    <>
                      <div onClick={onDiscountDelete}>
                        <YLButton variant="danger" type="button">
                          Xóa
                        </YLButton>
                      </div>
                    </>
                  ) : (
                    <div onClick={onDiscountSubmit}>
                      <YLButton
                        variant="primary"
                        disabled={discountLoad}
                        type="button"
                      >
                        Áp dụng{" "}
                        {discountLoad && (
                          <CircularProgress
                            size={15}
                            className="circle-progress"
                          />
                        )}
                      </YLButton>
                    </div>
                  )}
                </div>
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <th className="text-start">Tổng phụ:</th>
                      <td className="text-end">
                        {convertToVND(cartData ? totalPrice(cartData) : 0)}
                      </td>
                    </tr>
                    <tr>
                      <th className="text-start">Phí vận chuyển:</th>
                      <td className="text-end">{convertToVND(shipping)}</td>
                    </tr>
                    <tr>
                      <th className="text-start">Giảm giá:</th>
                      <td className="text-end">{convertToVND(discount)}</td>
                    </tr>
                    <tr>
                      <th className="text-start">Tổng cộng:</th>
                      <td className="text-end">
                        {convertToVND(
                          (cartData ? totalPrice(cartData) : 0) +
                            shipping -
                            discount
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {isLoggedIn && (
                <div className="note">
                  <input
                    type="text"
                    placeholder="Lưu ý"
                    className="form-control"
                    {...register("note")}
                  />
                </div>
              )}
              <div className="mt-4 d-flex justify-content-end">
                <YLButton
                  variant="primary"
                  type="submit"
                  disabled={completeLoad}
                >
                  Thanh toán{" "}
                  {completeLoad && (
                    <CircularProgress size={15} className="circle-progress" />
                  )}
                </YLButton>
                <BillLine
                  open={open}
                  setOpen={setOpen}
                  billLine={billLine}
                  isLoggedIn={isLoggedIn}
                ></BillLine>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
}

export default Payment;
