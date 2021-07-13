import React, { useContext, useEffect, useState } from "react";
import data from "assets/dumy-data/data-product.js";
import CartRowProduct from "./CartRowProduct";
import "assets/scss/scss-pages/card.scss";
import { Link } from "react-router-dom";
import DEFINELINK from "routes/define-link";
import YLButon from "components/custom-field/YLButton";
import { AbilityContext, Can } from "ability/can";
import { useSelector } from "react-redux";
import YLButton from "components/custom-field/YLButton";
import { convertToVND } from "utils/format-string";
import CartAPI from "api/user-cart-api";
function CartProduct(props) {
  const ability = useContext(AbilityContext);
  const isLoggedIn = ability.can("login", "website");
  if (isLoggedIn) {
  }
  const state = useSelector((state) => state.cartGuest.carts);
  const [cart, setCart] = useState({
    data: null,
    isSuccess: true,
    isLoading: false,
  });
  const fetchCart = async () => {
    setCart({ ...cart, isLoading: true });
    try {
      const response = await CartAPI.getCart();
      if (response.error) {
        throw new Error(response.error);
      } else {
        setCart({
          data: response.cartItems,
          isSuccess: true,
          isLoading: false,
        });
      }
    } catch (error) {
      setCart({
        ...cart,
        isSuccess: false,
        isLoading: false,
      });
      console.log("fail to fetch cart ");
    }
  };
  useEffect(() => {
    if (isLoggedIn) {
      fetchCart();
    } else {
      setCart({...cart,data:state});
    }
  }, [state]);
  console.log(cart?.data);
  const shiping = 25000;
  const [listTotal, setListTotal] = useState({
    data: [],
  });
  console.log(listTotal);
  const totalPrice = (data) => {
    let total = data.reduce((sum, product) => {
      return sum + product.price * product.quantity;
    }, 0);
    return total;
  };
  useEffect(() => {}, []);
  return (
    <div className="container">
      {console.log(cart?.data)}
      {cart?.data?.length ? (
        <>
          <div className="cart-product mt-5 ">
            <div className="cart-left col-lg-8  col-md-7 col-sm-12 bg-box bg-shadow  p-3">
              <span className="title">GIỎ HÀNG</span>
              <hr />
              {cart?.data?.map((item, index) => (
                <CartRowProduct
                  item={item}
                  key={"cart-row" + index}
                  setListTotal={setListTotal}
                  listTotal={listTotal}
                  canChange={true}
                  fetchCart={fetchCart}
                />
              ))}
            </div>
            <div className="cart-right col-lg-3 col-md-4 col-sm-12 bg-shadow bg-box p-3">
              <h4>CHI TIẾT ĐƠN HÀNG</h4>
              <div className="cart-detail">
                <table className="table-spacing">
                  <tbody>
                    <tr>
                      <td className="text-bold">TỔNG PHỤ:</td>
                      <td className="text-end">
                        {convertToVND(totalPrice(cart?.data))}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-bold">PHÍ VẬN CHUYỂN:</td>
                      <td className="text-end">{convertToVND(shiping)}</td>
                    </tr>
                    <tr>
                      <td className="text-bold">TỔNG CỘNG:</td>
                      <td className="text-end">
                        {convertToVND(totalPrice(cart?.data) + shiping)}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <YLButon
                          variant="primary"
                          to={{ pathname: "/cart/payment", cart: cart?.data }}
                          width="100%"
                        >
                          Tiếp tục
                        </YLButon>
                        {/* <Link to={`/cart/payment?stated=${cart}`}>Tiếp tục</Link> */}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2" className="text-end">
                        <Link to={DEFINELINK.product}>Trở lại mua hàng</Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="cart-product mt-5">
            <div className=" cart-left col-lg-8 col-md-7 col-sm-12 bg-box bg-shadow p-3">
              <h4>Phương thức thanh toán</h4>
              <div className="mb-4 bottom-line"></div>
              <div className="payment-method-content col-md-8 col-11">
                <h6>COD-Thanh toán khi nhận hàng</h6>
                <p>
                  Tất cả đơn hàng được gửi đảm bảo qua đường bưu điện sẽ đến tay
                  quý khách hàng chỉ trong 1-3 ngày làm việc
                </p>
              </div>
            </div>
            <Can do="read-write" on="customer" passThrough>
              {(allow) =>
                !allow && (
                  <div className="col-lg-3 col-md-4 col-sm-12 bg-shadow bg-box p-3">
                    <span>
                      Bạn đã có tài khoản chưa?{" "}
                      <Link to="/login">Đăng Nhập</Link> để thanh toán mượt mà
                      hơn
                    </span>
                  </div>
                )
              }
            </Can>
          </div>
        </>
      ) : (
        <div className="bg-box bg-shadow m-5 d-flex justify-content-center">
          <span>Chưa có sản phẩm nào</span>
          <Link to="/" className="primary-color ms-2">
            Trở về trang chủ
          </Link>
        </div>
      )}
    </div>
  );
}

export default CartProduct;