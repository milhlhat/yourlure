import InputField from "components/custom-field/YLInput";
import { Form, Formik, FastField } from "formik";
import React, { useState } from "react";
import YLButton from "components/custom-field/YLButton";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import "assets/scss/scss-pages/forgot-password.scss";
import Fishing from "assets/images/fishing.jpg";
import PhoneAPI from "api/phone-number-api";
import { toast } from "react-toastify";

function FogotPassWord(props) {
  const [onTab, setOnTab] = useState(0);
  const [info, setInfo] = useState();
  const changeTab = (tab, value) => {
    setInfo(value);
    setOnTab(tab);
  };
  const component = [
    {
      name: "phone-form",
      component: <PhoneForm changeTab={changeTab} />,
    },
    {
      name: "forgot-otp",
      component: <OTPForm info={info} changeTab={changeTab} />,
    },
  ];
  return (
    <div className="login">
      <div className="login-big-image">
        <img src={Fishing} alt="" />
      </div>
      <div className="login-form">{component[onTab].component}</div>
    </div>
  );
}

function PhoneForm(props) {
  const history = useHistory();
  const { changeTab } = props;
  const register = async (value) => {
    try {
      const response = await PhoneAPI.checkPhoneExist(value);
      if (response.error) {
        throw new Error(response.error);
      } else {
        if (response.data == false) {
          throw new Error();
        }
        changeTab(1, value);
      }
    } catch (error) {
      if (error?.response?.status - 500 >= 0) {
        toast.error("Lỗi hệ thống");
      } else {
        toast.error("Số điện thoại chưa được đăng ký trước đó");
      }
    }
  };
  //constructor value for formik field
  const initialValues = {
    phone: "",
  };
  //check validate for formik field
  const validationSchema = Yup.object().shape({
    phone: Yup.string()
      .required("Vui lòng nhập số điện thoại.")
      .matches(
        /((\+84|84|0)[35789][0-9]{8})\b/,
        "Vui lòng nhập đúng số điện thoại"
      ),
  });
  return (
    <div className="phone-form">
      <h1>Quên mật khẩu</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          register(values.phone);
        }}
      >
        {(formikProps) => {
          const { values, errors, touched } = formikProps;
          // console.log({ values, errors, touched });
          return (
            <Form>
              <div className="mt-2">
                <FastField
                  name="phone"
                  component={InputField}
                  label="Nhập Số điện thoại"
                  placeholder="Nhập số điện thoại"
                ></FastField>
              </div>
              <div className="justify-content-center">
                <div className="width-100 my-2">
                  <YLButton
                    type="submit"
                    variant="primary"
                    value="Gửi mã OTP"
                  ></YLButton>
                </div>

                <YLButton
                  variant="link"
                  onClick={() => history.push("/login")}
                  value="Trở về"
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
function OTPForm(props) {
  const history = useHistory();
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
    <div className="forgot-form">
      <div className="forgot-form-input">
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
                    placeholder="Nhập mã OTP"
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

export default FogotPassWord;
