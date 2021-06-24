import React, { useEffect, useState } from "react";
import data from "assets/dumy-data/data-product.js";
import { Link } from "react-router-dom";
import { FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import InputField from "components/custom-field/YLInput";
import SelectField from "components/custom-field/YLSelect";
import dataAdress from "./address";
import 'assets/scss/scss-components/cart/payment.scss';

let districtOn = false,
  wardOn = false;
function Payment(props) {
  const province = dataAdress.province();
  const district = dataAdress.district();
  const [districtSelect, setDistrictSelect] = useState([]);
  const [provinceSelect, setProvinceSelect] = useState([]);
  const carts = data.cart();
  const initialValues = {
    name: "",
    provinceId: null,
    districtId: null,
    wardId: null,
    address: null,
    phonge: "",
    email: "",
    note: "",
  };
  //check validate for formik field
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("This field is required."),
    address: Yup.string().required("This field is required."),
    phonge: Yup.string().required("This field is required."),
    provinceId: Yup.number().required("This field is required.").nullable(),
    districtId: Yup.number().required("This field is required.").nullable(),
    wardId: Yup.number().required("This field is required.").nullable(),
  });

  function handleSelectProvince(option) {
    setProvinceSelect(option);
    console.log("chăng");
    console.log(option.value);
    setDistrictSelect(
      district.filter((value) => value.provinceId == option.value)
    );
    districtOn = true;
    
  }
  useEffect(() => {
      console.log(districtSelect);
    }, [districtSelect,provinceSelect]);
  return (
    <div className="payment mt-5 bg-white row">
      <div className="left-payment col-md-7 col-sm-12">
        <div className="want-to-login">
          <span>Bạn đã có tài khoản chưa?</span>
          <br />
          <Link to="/login">Đăng nhập</Link> để thực hiện thanh toán mượt mà
          hơn.
        </div>
        <div className="address-to-deliver mt-3">
          <h3>ĐỊA CHỈ GIAO HÀNG</h3>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            {(formikProps) => {
              const { values, errors, touched } = formikProps;
              // console.log({ values, errors, touched });
              return (
                <Form>
                  <FastField
                    name="name"
                    component={InputField}
                    placeholder="*Tên"
                  ></FastField>
                  <FastField
                    name="address"
                    component={InputField}
                    placeholder="*Địa chỉ, Số nhà, Tên đường"
                  ></FastField>
                  <FastField
                    name="provinceId"
                    component={SelectField}
                    placeholder="*Tỉnh"
                    handleSelectProvince={handleSelectProvince}
                    options={province}
                  />
                  <FastField
                    name="districtId"
                    component={SelectField}
                    placeholder="*Huyện"
                    disabled={!districtOn}
                    options={districtSelect}
                  />
                  <FastField
                    name="wardId"
                    component={SelectField}
                    disabled={!wardOn}
                    placeholder="*Xã"
                    options={province}
                  />
                  <button type="submit">submit</button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>

      <div className="right-payment col-md-5 col-sm-12">
        <div className="you-cart">
          <div className="row">
            <span className="col-6">Giỏ hàng của bạn</span>
            <span className="col-6">Trở về giỏ hàng</span>
          </div>
          <div className="cart-mini">
            <table>
              {carts.map((cart, index) => (
                <tr key={index}>
                  <td>
                    <img src={cart.img} alt="" />
                  </td>
                  <td>
                    <span>{cart.name}</span>
                    <br />
                    <span>
                      {Number(cart.price).toLocaleString(undefined, {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      })}
                      đ
                    </span>
                    <br />
                    <span>Màu sắc : {cart.color}</span>
                    <br />
                    <span>Trọng lượng : {cart.weight}</span>
                    <br />
                  </td>
                  <td>
                    {Number(cart.price * cart.quantity).toLocaleString(
                      undefined,
                      {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      }
                    )}
                    đ
                  </td>
                </tr>
              ))}
            </table>
          </div>
          <div className="total-mini">
            <table>
              <tr>
                <td>TỔNG PHỤ </td>
                <td></td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
