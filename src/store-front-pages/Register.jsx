import { AbilityContext, Can } from "ability/can";
import UserApi from "api/user-api";
import "assets/scss/scss-pages/register.scss";
import YLButton from "components/custom-field/YLButton";
import InputField from "components/custom-field/YLInput";
import userConfig from "constant/user-config";
import { FastField, Form, Formik } from "formik";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { updateRoles } from "utils/user";
import * as Yup from "yup";
import { Redirect } from "react-router-dom";
import DEFINELINK from "routes/define-link";
import Fishing from "assets/images/fishing.jpg";

const EXISTED_PHONE_STATUS = 422;
function Register(props) {
  const [info, setInfo] = useState();
  const ability = useContext(AbilityContext);

  const history = useHistory();
  const changeTab = (tab, value) => {
    setInfo(value);
    setOnTab(tab);
  };
  const component = [
    {
      name: "register-form",
      component: <RegisterBase changeTab={changeTab} ability={ability} />,
    },
    {
      name: "register-otp",
      component: <RegisterOTP info={info} changeTab={changeTab} />,
    },
  ];
  const [onTab, setOnTab] = useState(0);
  return (
    <Can do="login" on="website" passThrough>
      {(allowed) =>
        allowed ? (
          <Redirect exact from={DEFINELINK.register} to={DEFINELINK.home} />
        ) : (
          <div className="register container">
            <div className="register-big-image">
              <img src={Fishing} alt="" />
            </div>
            {component[onTab].component}
          </div>
        )
      }
    </Can>
  );
}

function RegisterBase({ ability }) {
  const history = useHistory();
  const register = async (data) => {
    delete data.rePassword;
    console.log(data);
    try {
      const response = await UserApi.signup(data);
      if (response.error) {
        throw new Error(response.error);
      } else {
        localStorage.setItem(userConfig.LOCAL_STORE_ACCESS_TOKEN, response);
        localStorage.setItem(
          userConfig.LOCAL_STORE_LOGIN_AT,
          new Date().toLocaleString()
        );
        updateRoles(ability, history);
        alert("Đăng ký thành công");
      }
    } catch (error) {
      if (error.response.status === EXISTED_PHONE_STATUS) {
        alert("Tài khoản đã tồn tại");
      } else alert("Đăng ký thất bại");
    }
  };
  //constructor value for formik field
  const initialValues = {
    phone: "",
    password: "",
    rePassword: "",
  };
  const equal = (a, b) => {
    return a === b;
  };
  //check validate for formik field
  const validationSchema = Yup.object().shape({
    phone: Yup.string()
      .required("Vui lòng nhập số điện thoại.")
      .matches(
        /((\+84|84|0)[35789][0-9]{8})\b/,
        "Vui lòng nhập đúng số điện thoại"
      ),
    password: Yup.string()
      .required("Vui lòng nhập mật khẩu")
      .min(6, "Mật khẩu phải có it nhất 6 ký tự")
      .max(32, "Mật khẩu không được vượt quá 32 ký tự"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp")
      .min(6, "Mật khẩu phải chứa từ 6-32 ký tự")
      .max(32, "Mật khẩu phải chứa từ 6-32 ký tự")
      .required("Vui lòng nhập mật khẩu"),
  });
  return (
    <div className="register-form">
      <div className="register-form-input">
        <h1>Đăng Ký</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            register(values);
          }}
        >
          {(formikProps) => {
            const { values, errors, touched } = formikProps;
            // console.log({ values, errors, touched });
            return (
              <Form>
                <FastField
                  name="phone"
                  component={InputField}
                  label="Số điện thoại"
                  placeholder="Nhập số điện thoại"
                ></FastField>
                <FastField
                  name="password"
                  type="password"
                  component={InputField}
                  label="Mật khẩu"
                  placeholder="Nhập mật khẩu"
                ></FastField>
                <FastField
                  name="rePassword"
                  type="password"
                  component={InputField}
                  label="Nhập lại mật khẩu"
                  placeholder="Nhập lại mật khẩu"
                ></FastField>
                <div className="my-2">
                  <YLButton
                    type="submit"
                    variant="primary"
                    value="Đăng ký"
                    width="100%"
                  ></YLButton>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
      <YLButton
        variant="link"
        to={DEFINELINK.login}
        value="Đã có tài khoản, đăng nhập ngay!"
      />
      <div className="item-botton">
        <YLButton
          variant="link"
          to={DEFINELINK.home}
          value="Mua hàng không cần đăng nhập"
        />
      </div>
    </div>
  );
}

function RegisterOTP(props) {
  const { changeTab, info } = props;
  const register = (value) => {
    console.log(value);
    changeTab(0);
  };
  //constructor value for formik field
  const initialValues = {
    otp: "",
    ...info,
  };
  //check validate for formik field
  const validationSchema = Yup.object().shape({
    otp: Yup.string()
      .required("Vui lòng nhập mã OTP")
      .matches(/([0-9]{6})\b/, "Vui lòng nhập đúng mã OTP")
      .max(6, "Vui lòng nhập đúng mã OTP"),
  });
  return (
    <div className="register-form">
      <div className="register-form-input">
        <h1>Xác thực OTP</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("submited");
            register(values);
          }}
        >
          {(formikProps) => {
            const { values, errors, touched } = formikProps;
            // console.log({ values, errors, touched });
            return (
              <Form>
                <div className="otp-form my-2">
                  <FastField
                    name="otp"
                    component={InputField}
                    label="Nhập mã OTP"
                    placeholder="Nhập số điện thoại"
                  ></FastField>
                  <YLButton variant="primary" value="Gửi lại mã OTP"></YLButton>
                </div>
                <div className="otp-form">
                  <YLButton
                    type="submit"
                    variant="primary"
                    value="Xác nhận"
                  ></YLButton>

                  <YLButton
                    variant="link"
                    value="Hủy"
                    onClick={() => changeTab(0)}
                  ></YLButton>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
export default Register;
