import { AbilityContext, Can } from "ability/can";
import "assets/scss/scss-pages/payment.scss";
import CartRowProduct from "components/cart/CartRowProduct";
import CustomerAddressInput from "components/payment/CustomerAddressInput";
import GusestAddressInput from "components/payment/GusestAddressInput";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import YLButton from "../components/custom-field/YLButton";
import DEFINELINK from "../routes/define-link";
import { convertToVND, totalPrice } from "../utils/format-string";

function Payment(props) {
  // const cartData=props.location;
  console.log(props.location);
  const cartData = useSelector((state) => state.cartGuest.carts);
  const methods = useForm();
  const shipping=25000;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  const [discount, setDiscount] = useState();
  const handleInputDiscount = (e) => {
    setDiscount(e.target.value);
  };
  const onDiscountSubmit = () => {
    let data = discount?.toString().trim();
    if (data !== "" && discount) alert(`Mã giảm giá ${data} không tồn tại`);
    // try {
    //   const response = await ManagerCategoryAPI.add(data);

    //   if (response.error) {
    //     throw new Error(response.error);
    //   } else {
    //     alert("");
    //   }
    // } catch (error) {
    //   alert("Mã giảm giá không tồn tại");
    //   console.log("fail to fetch voucher");
    // }
  };


  const ability = useContext(AbilityContext);
  const isLoggedIn = ability.can("login", "website");

  const onSubmit = (data) => {
    if (!data.address) {
      alert("Bạn chưa nhập địa chỉ");
    } else console.log(data);
  };
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
              <Link to={DEFINELINK.cart} className="float-end login-link">
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
                  type="text"
                  id="voucher"
                  onChange={handleInputDiscount}
                />
                <div onClick={onDiscountSubmit}>
                  <YLButton variant="primary" type="button" value="Áp dụng" />
                </div>
              </div>
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <th className="text-start">Tổng phụ:</th>
                    <td className="text-end">{convertToVND(cartData?totalPrice(cartData):0)}</td>
                  </tr>
                  <tr>
                    <th className="text-start">Phí vận chuyển:</th>
                    <td className="text-end">{convertToVND(shipping)}</td>
                  </tr>
                  <tr>
                    <th className="text-start">Giảm giá:</th>
                    <td className="text-end">{convertToVND(0)}</td>
                  </tr>
                  <tr>
                    <th className="text-start">Tổng cộng:</th>
                    <td className="text-end">{convertToVND((cartData?totalPrice(cartData):0)+shipping)}</td>
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
              <YLButton variant="primary" type="submit">
                Thanh toán
              </YLButton>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Payment;
