import { AbilityContext, Can } from "ability/can";
import data from "assets/dumy-data/data-product.js";
import "assets/scss/scss-pages/payment.scss";
import PaymentAddNewAddress from "components/cart/PaymentAddNewAddress";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import UserApi from "../api/user-api";
import YLButton from "../components/custom-field/YLButton";
import YLSelectAddress from "../components/custom-field/YLSelectAddress";
import DEFINELINK from "../routes/define-link";
import { convertToVND } from "../utils/format-string";

function Payment(props) {
  const carts = data.cart();
  const methods = useForm();
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
  <Can do="read-write" on="customer" passThrough>
    {(allow) => (allow ? console.log("object") : console.log("not object"))}
  </Can>;
  const [address, setAddress] = useState({
    data: [],
    isLoading: false,
    isSuccess: true,
  });
  const fetchCustomAddress = async () => {
    setAddress((prevState) => {
      return { ...prevState, isLoading: true };
    });
    try {
      const response = await UserApi.getAddress();
      setAddress({ data: response, isLoading: false, isSuccess: true });
    } catch (error) {
      console.log(error);
      setAddress({ data: null, isLoading: false, isSuccess: false });
      console.log("fail to fetch address");
    }
  };

  const formatAddress = (address) => {
    return (
      address.description +
      ", " +
      address.userWardName +
      ", " +
      address.userDistrictName +
      ", " +
      address.userProvinceName
    );
  };
  const ability = useContext(AbilityContext);
  const isLoggedIn = ability.can("login", "website");

  useEffect(() => {
    isLoggedIn && fetchCustomAddress();
  }, []);
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
                <div className="px-5">
                  <h5>
                    <i className="fas fa-map-marker-check"></i> ĐỊA CHỈ GIAO
                    HÀNG
                  </h5>
                  <input
                    className="form-control mb-3"
                    placeholder={"*Họ và Tên"}
                    {...register("userName", {
                      required: "Trường bắt buộc",
                    })}
                  />
                  {errors.userName && (
                    <span className="text-danger">
                      (*){errors.userName.message}
                    </span>
                  )}

                  <YLSelectAddress {...methods} />

                  <input
                    className="form-control my-3"
                    placeholder={"*Địa chỉ, số nhà, tên đường"}
                    {...register("address", {
                      required: "Trường bắt buộc",
                    })}
                  />
                  {errors.address && (
                    <span className="text-danger">
                      (*){errors.address.message}
                    </span>
                  )}
                  <input
                    className="form-control my-3"
                    placeholder={"*Số điện thoại"}
                    {...register("phone", {
                      required: "Trường bắt buộc",
                    })}
                  />
                  {errors.phone && (
                    <span className="text-danger">
                      (*){errors.phone.message}
                    </span>
                  )}
                  <input className="form-control my-3" placeholder={"Email"} />
                  {errors.email && (
                    <span className="text-danger">
                      {errors.email.message}
                    </span>
                  )}
                  <input className="form-control my-3" placeholder={"Lưu ý"} />
                  {errors.note && (
                    <span className="text-danger">
                      {errors.note.message}
                    </span>
                  )}
                </div>
              ) : (
                <>
                  <div>
                    <div className="head-address d-flex justify-content-between align-items-end">
                      <h5>
                        <i className="fas fa-map-marker-check"></i> ĐỊA CHỈ GIAO
                        HÀNG
                      </h5>
                      <PaymentAddNewAddress
                        fetchCustomAddress={fetchCustomAddress}
                      />
                    </div>
                  </div>
                  <div className="address-list">
                    {address?.data.length < 1 && (
                      <div className="d-flex flex-wrap justify-content-center mt-5">
                        <span className="mb-3 col-12">
                          Bạn chưa có địa chỉ nào, vui lòng thêm địa chỉ mới
                        </span>
                        <YLButton variant="primary" to="/customer/address/add">
                          Thêm địa chỉ mới
                        </YLButton>
                      </div>
                    )}
                    {address?.data?.map((item, i) => (
                      <div
                        className="form-check my-3"
                        key={"address-item-" + i}
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          name="addressRadios"
                          id={`addressRadios${i}`}
                          value={formatAddress(item)}
                          {...register("address")}
                          defaultChecked={item.isDefault}
                        />
                        <label
                          className="form-check-label pointer"
                          htmlFor={`addressRadios${i}`}
                        >
                          <b>
                            {item.userName}
                            {", "}
                            {item.phone}
                            {" - "}
                          </b>{" "}
                          {formatAddress(item)}
                        </label>
                      </div>
                    ))}
                  </div>
                </>
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
              {carts.map((item, i) => (
                <div
                  key={"cart-list-" + i}
                  className="item-info d-flex justify-content-between"
                >
                  <div className="d-flex">
                    <img src={item.img} width={50} height={50} />
                    <div className="info ms-2">
                      <span className="d-block text-small">{item.name}</span>
                      <span className="d-block text-small">
                        {convertToVND(item.price)}
                      </span>
                      <span className="d-block text-x-small">Số lượng: 2</span>
                      <span className="d-block text-x-small">Màu sắc</span>
                      <span className="d-block text-x-small">Trọng lượng:</span>
                    </div>
                  </div>
                  <span className="float-end">100.000đ</span>
                </div>
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
                    <td className="text-end">{convertToVND(300000)}</td>
                  </tr>
                  <tr>
                    <th className="text-start">Phí vận chuyển:</th>
                    <td className="text-end">{convertToVND(25000)}</td>
                  </tr>
                  <tr>
                    <th className="text-start">Giảm giá:</th>
                    <td className="text-end">{convertToVND(0)}</td>
                  </tr>
                  <tr>
                    <th className="text-start">Tổng cộng:</th>
                    <td className="text-end">{convertToVND(325000)}</td>
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
