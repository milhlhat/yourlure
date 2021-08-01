import InputField from "components/custom-field/YLInput";
import { Form, Formik, FastField } from "formik";
import React, { useEffect, useState } from "react";
import YLButton from "components/custom-field/YLButton";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import "assets/scss/scss-pages/forgot-password.scss";
import Fishing from "assets/images/fishing.jpg";
import PhoneAPI from "api/phone-number-api";
import { toast } from "react-toastify";
import { CircularProgress } from "@material-ui/core";
import UserApi from "api/user-api";

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
    {
      name: "reset=password",
      component: <ResetPassForm info={info} changeTab={changeTab} />,
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
  console.log(info);
  const [isDisableSendOtp, setDisableSendOtp] = useState(false);
  const submitOTP = (value) => {
    console.log(value);
    changeTab(2, value);
  };
  //constructor value for formik field
  const initialValues = {
    otp: "",
    phone: info,
  };
  const [countTime, setCountTime] = useState(0);
  //
  const sentOTP = async () => {
    console.log("send OTP");
    setDisableSendOtp(true);
    setCountTime(30);
    let sendCountTime;
    let time = 30;
    const runtime = () => {
      if (time <= 0) {
        setDisableSendOtp(false);
        clearInterval(sendCountTime);
      } else {
        setCountTime(--time);
      }
    };
    if (time > 0) {
      sendCountTime = setInterval(() => runtime(), 1000);
    }
    try {
      const response = await PhoneAPI.verifyOldPhoneNumber(info);
      if (response.error) {
        throw new Error(response.error);
      } else {
        toast.success(`Mã OTP đã được gửi tới ${info}`);
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  //check validate for formik field
  const validationSchema = Yup.object().shape({
    otp: Yup.string()
      .required("Vui lòng nhập mã OTP")
      .matches(/([0-9]{6})\b/, "Vui lòng nhập đúng mã OTP")
      .max(6, "Vui lòng nhập đúng mã OTP"),
  });
  useEffect(() => {
    sentOTP();
  }, []);
  return (
    <div className="forgot-form">
      <div className="forgot-form-input">
        <h1>Xác thực OTP</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("submited");
            submitOTP(values);
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
                  <div className="ms-2">
                    <YLButton
                      onClick={sentOTP}
                      variant="warning"
                      value={`Gửi lại OTP ${
                        countTime > 0 ? "(" + countTime + ")" : ""
                      }`}
                      disabled={isDisableSendOtp}
                      type="button"
                    ></YLButton>
                  </div>
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

function ResetPassForm(props) {
  const history = useHistory();
  const { changeTab, info } = props;
  const [loading, setLoading] = useState(false);
  //constructor value for formik field
  const initialValues = {
    ...info,
    password: "",
    rePassword: "",
  };
  //check validate for formik field
  const validationSchema = Yup.object().shape({
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
  const submitPassword = async (data) => {
    console.log(data);
    try {
      setLoading(true);
      const response = await UserApi.resetPassword(data);
      if (response.error) {
        throw new Error(response.error);
      }
      setLoading(false);
      toast.success("Đổi mật khẩu thành công");
      history.push("/login");
    } catch (error) {
      setLoading(false);
      toast.error("Đổi mật khẩu không thành công");
    }
  };
  return (
    <div>
      <div className="re-password-form">
        <div className="re-password-form-input">
          <h1>Đặt mật khẩu mới</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              submitPassword(values);
            }}
          >
            {(formikProps) => {
              const { values, errors, touched } = formikProps;
              // console.log({ values, errors, touched });
              return (
                <Form>
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
                      width="100%"
                      disabled={loading}
                    >
                      Xác nhận
                      {loading && (
                        <CircularProgress
                          size={15}
                          className="circle-progress"
                        />
                      )}
                    </YLButton>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default FogotPassWord;
