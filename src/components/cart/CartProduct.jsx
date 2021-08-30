import React, { useContext, useEffect, useState } from "react";
import CartRowProduct from "./CartRowProduct";
import "assets/scss/scss-pages/card.scss";
import { Link } from "react-router-dom";
import DEFINELINK from "routes/define-link";
import YLButon from "components/custom-field/YLButton";
import { AbilityContext, Can } from "authorization/can";
import { useSelector } from "react-redux";
import { convertToVND, getShipping, totalPrice } from "utils/format-string";
import CartAPI from "api/user-cart-api";
import Loading from "components/Loading";
import NoPermistion from "components/error-notify/NoPermistion";

function CartProduct(props) {
  const cartData = props?.location?.cart;
  const ability = useContext(AbilityContext);
  const isLoggedIn = ability.can("login", "website");
  const isManager = ability.can("read-write", "admin-staff");
  const state = useSelector((state) => state.cartGuest.carts);
  const [cart, setCart] = useState({
    data: null,
    isSuccess: true,
    isLoading: false,
  });
  const [cartsSelected, setCartsSelected] = useState([]);

  //check change: 0 is not change, 1 is update quantity, 2 is delete cart item
  const [checkChange, setCheckChange] = useState(0);

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
        // setCartsSelected([
        //   ...response.cartItems.filter(
        //     (e) =>
        //       (e.visibleInStorefront !== false && e.variantQuantity > 0) ||
        //       e.thumbnailUrl
        //   ),
        // ]);
        if (checkChange === 0) {
          setCartsSelected([
            ...response.cartItems.filter(
              (e) =>
                (e.visibleInStorefront !== false && e.variantQuantity > 0) ||
                e.thumbnailUrl
            ),
          ]);
          // setCheckChange(0);
        }
        //change quantity and check for update or delete to list cart selected
        else if (checkChange >= 1) {
          setCartsSelected([
            ...response.cartItems.filter(
              (e) =>
                ((e.visibleInStorefront !== false && e.variantQuantity > 0) ||
                  e.thumbnailUrl) &&
                checkExist(e)
            ),
          ]);
          // setCheckChange(0);
        }
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
  const fetchCartGuest = async (data) => {
    setCart({ ...cart, isLoading: true });
    try {
      const response = await CartAPI.getGuestCart(data);
      if (response.error) {
        throw new Error(response.error);
      } else {
        setCart({
          data: response.cartItems,
          isSuccess: true,
          isLoading: false,
        });
        if (checkChange === 0) {
          setCartsSelected([
            ...response.cartItems.filter(
              (e) => e.visibleInStorefront !== false && e.variantQuantity > 0
            ),
          ]);
          setCheckChange(0);
        }
        //change quantity and check for update or delete to list cart selected
        else if (checkChange >= 1) {
          setCartsSelected([
            ...response.cartItems.filter(
              (e) =>
                e.visibleInStorefront !== false &&
                e.variantQuantity > 0 &&
                checkExist(e)
            ),
          ]);
          setCheckChange(0);
        }
      }
    } catch (error) {
      setCart({
        ...cart,
        isSuccess: false,
        isLoading: false,
      });
      console.log("fail to fetch cart guest");
    }
  };
  const checkExist = (item) => {
    let result = cartsSelected.find(
      (o) =>
        o.variantId === item.variantId &&
        o.weight === item.weight &&
        o.customModelId === item.customModelId
    );
    return result ? true : false;
  };
  useEffect(() => {
    if (isLoggedIn) {
      fetchCart();
    } else {
      fetchCartGuest(state);
    }
  }, [state]);

  const shiping = getShipping();
  const [listTotal, setListTotal] = useState({
    data: [],
  });
  const handleChangeSelected = (data) => {
    let array = cartsSelected;
    if (array.includes(data)) {
      for (let i in array) {
        if (array[i] === data) {
          array.splice(i, 1);
          break;
        }
      }
      // setarray([term.push(data)]);
    } else {
      array.push(data);
    }
    setCartsSelected([...array]);
  };
  // if (isLoggedIn && cart.isLoading) {
  //   return <Loading />;
  // }
  // else
   if (isManager) {
    return <NoPermistion />;
  }
  else
  return (
    <div className="container">
      {/* {console.log(cart)} */}
      {cart?.data?(cart?.data?.length ? (
        <>
          <div className="cart-product mt-5 ">
            <div className="cart-left col-lg-8  col-md-7 col-sm-12 bg-box bg-shadow  p-3">
              <span className="title">GIỎ HÀNG</span>
              <hr />
              {cart?.data?.map((item, index) => (
                <CartRowProduct
                  item={item}
                  key={"cart-row" + index}
                  cartsSelected={cartsSelected}
                  setCheckChange={setCheckChange}
                  canChange={true}
                  fetchCart={fetchCart}
                  handleChangeSelected={handleChangeSelected}
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
                        {convertToVND(totalPrice(cartsSelected))}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-bold">PHÍ VẬN CHUYỂN:</td>
                      <td className="text-end">{convertToVND(shiping)}</td>
                    </tr>
                    <tr>
                      <td className="text-bold">TỔNG CỘNG:</td>
                      <td className="text-end">
                        {convertToVND(totalPrice(cartsSelected) + shiping)}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <YLButon
                          variant="primary"
                          to={{
                            pathname: "/cart/payment",
                            cart: cartsSelected,
                          }}
                          width="100%"
                          disabled={cartsSelected.length === 0}
                        >
                          Tiếp tục
                        </YLButon>
                        {cartsSelected.length === 0 && (
                          <span className="text-danger">
                            Bạn chưa chọn mặt hàng nào(*)
                          </span>
                        )}
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
      )):(
        <Loading/>
      )}
    </div>
  );
}

export default CartProduct;
