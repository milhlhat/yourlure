import React, { useState } from "react";
import { Link } from "react-router-dom";
import "assets/scss/scss-pages/payment.scss";
import YLButton from "../components/custom-field/YLButton";
import YLSelectAddress from "../components/custom-field/YLSelectAddress";
import { useForm } from "react-hook-form";
import DEFINELINK from "../routes/define-link";
import data from "assets/dumy-data/data-product.js";
import { convertToVND } from "../utils/format-string";

function Payment(props) {
  const carts = data.cart();
  const methods = useForm();
  const {
    register,
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
  return (
    <form className="container mt-4" autocomplete="off">
      <div className="d-flex flex-wrap justify-content-between">
        <div className="deliver-address bg-box mb-4 col-12 col-md-8">
          <h3>ĐỊA CHỈ GIAO HÀNG</h3>
          <input
            className="form-control mb-3"
            placeholder={"*Họ và Tên"}
            {...register("userName", {
              required: "Trường bắt buộc",
            })}
          />
          {errors.userName && (
            <span className="text-danger">(*){errors.userName.message}</span>
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
            <span className="text-danger">(*){errors.address.message}</span>
          )}
          <input
            className="form-control my-3"
            placeholder={"*Số điện thoại"}
            {...register("phone", {
              required: "Trường bắt buộc",
            })}
          />
          {errors.phone && (
            <span className="text-danger">(*){errors.phone.message}</span>
          )}
          <input
            className="form-control my-3"
            placeholder={"*Email"}
            {...register("email", {
              required: "Trường bắt buộc",
            })}
          />
          {errors.email && (
            <span className="text-danger">(*){errors.email.message}</span>
          )}
          <input
            className="form-control my-3"
            placeholder={"Lưu ý"}
            {...register("note", {
              required: "Trường bắt buộc",
            })}
          />
          {errors.note && (
            <span className="text-danger">(*){errors.note.message}</span>
          )}
        </div>
        <div className="col-12 col-md-4">
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
                    <th className="text-start">
                      Tổng phụ:
                    </th>
                    <td className="text-end">
                      {convertToVND(300000)}
                    </td>
                  </tr>
                  <tr>
                    <th className="text-start">
                      Phí vận chuyển:
                    </th>
                    <td className="text-end">
                      {convertToVND(25000)}
                    </td>
                  </tr>
                  <tr>
                    <th className="text-start">
                      Giảm giá:
                    </th>
                    <td className="text-end">
                      {convertToVND(0)}
                    </td>
                  </tr>
                  <tr>
                    <th className="text-start">
                      Tổng cộng:
                    </th>
                    <td className="text-end">
                      {convertToVND(325000)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Payment;
