import { AbilityContext, Can } from "authorization/can";
import UserApi from "api/user-api";
import "assets/scss/scss-pages/register.scss";
import YLButton from "components/custom-field/YLButton";
import InputField from "components/custom-field/YLInput";
import userConfig from "constants/user-config";
import { FastField, Form, Formik } from "formik";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { updateRoles } from "utils/user";
import * as Yup from "yup";
import { Redirect } from "react-router-dom";
import DEFINELINK from "routes/define-link";
import Fishing from "assets/images/fishing.jpg";
import { toast } from "react-toastify";
import PhoneAPI from "api/phone-number-api";
import { CircularProgress } from "@material-ui/core";

const EXISTED_PHONE_STATUS = 422;
const TIME_COUNT_DOWN = 60;

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
      component: (
        <RegisterOTP info={info} changeTab={changeTab} ability={ability} />
      ),
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

function RegisterBase({ ability, changeTab }) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const register = async (data) => {
    data = {
      phone: data.phone.trim(),
      password: data.password.trim(),
      rePassword: data.rePassword.trim(),
    };
    // check phone exist
    try {
      setLoading(true);
      const response = await PhoneAPI.verifyNewPhoneNumber(data.phone);
      if (response.error) {
        throw new Error(response.error);
      } else {
        toast.success(`Mã OTP đã được gửi tới ${data.phone}`);
        changeTab(1, data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data);
    }

    // try {
    //   const response = await UserApi.signup(data);
    //   if (response.error) {
    //     throw new Error(response.error);
    //   } else {
    //     localStorage.setItem(userConfig.LOCAL_STORE_ACCESS_TOKEN, response);
    //     localStorage.setItem(
    //       userConfig.LOCAL_STORE_LOGIN_AT,
    //       new Date().toLocaleString()
    //     );
    //     updateRoles(ability, history);
    //     toast.success("Đăng ký thành công");
    //   }
    // } catch (error) {
    //   if (error?.response?.status === EXISTED_PHONE_STATUS) {
    //     toast.warning("Số điện thoại đã tồn tại");
    //   } else toast.error("Đăng ký thất bại");
    // }
  };
  //constructor value for formik field
  const initialValues = {
    phone: "",
    password: "",
    rePassword: "",
  };
  //check validate for formik field
  const validationSchema = Yup.object().shape({
    phone: Yup.string()
      .trim()
      .required("Vui lòng nhập số điện thoại.")
      .matches(
        /((\+84|84|0)[35789][0-9]{8})\b/,
        "Vui lòng nhập đúng số điện thoại"
      )
      .max(12,"Vui lòng nhập đúng số điện thoại"),
    password: Yup.string()
      .trim()
      .required("Vui lòng nhập mật khẩu")
      .min(6, "Mật khẩu phải có it nhất 6 ký tự")
      .max(32, "Mật khẩu không được vượt quá 32 ký tự"),
    rePassword: Yup.string()
      .trim()
      .required("Vui lòng nhập mật khẩu")
      .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp")
      .min(6, "Mật khẩu phải chứa từ 6-32 ký tự")
      .max(32, "Mật khẩu phải chứa từ 6-32 ký tự"),
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

            return (
              <Form>
                <FastField
                  name="phone"
                  component={InputField}
                  label="Số điện thoại"
                  placeholder="Nhập số điện thoại"
                />
                <FastField
                  name="password"
                  type="password"
                  component={InputField}
                  label="Mật khẩu"
                  placeholder="Nhập mật khẩu"
                />
                <FastField
                  name="rePassword"
                  type="password"
                  component={InputField}
                  label="Nhập lại mật khẩu"
                  placeholder="Nhập lại mật khẩu"
                />
                <div className="my-2">
                  <YLButton
                    type="submit"
                    variant="primary"
                    width="100%"
                    disabled={loading}
                  >
                    Đăng ký
                    {loading && (
                      <CircularProgress size={15} className="circle-progress" />
                    )}
                  </YLButton>
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

function RegisterOTP({ ability, changeTab, info }) {
  const history = useHistory();
  const [isDisableSendOtp, setDisableSendOtp] = useState(false);
  const submitOTP = async (value) => {
    console.log(value);
    // changeTab(0);
    try {
      const response = await UserApi.signup(value);
      if (response.error) {
        throw new Error(response.error);
      } else {
        localStorage.setItem(userConfig.LOCAL_STORE_ACCESS_TOKEN, response);
        localStorage.setItem(
          userConfig.LOCAL_STORE_LOGIN_AT,
          new Date().toLocaleString()
        );
        await updateRoles(ability, history);
        toast.success("Đăng ký thành công");
      }
    } catch (error) {
      if (error?.response?.status === EXISTED_PHONE_STATUS) {
        toast.warning("Tài khoản đã tồn tại");
      } else toast.error(error?.response?.data);
    }
  };
  const [countTime, setCountTime] = useState(0);
  //
  const sentOTP = async () => {
    console.log("send OTP");
    setDisableSendOtp(true);
    setCountTime(TIME_COUNT_DOWN);
    let sendCountTime;
    let time = TIME_COUNT_DOWN;
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
      const response = await PhoneAPI.verifyNewPhoneNumber(info.phone);
      if (response.error) {
        throw new Error(response.error);
      } else {
        toast.success(`Mã OTP đã được gửi lại tới ${info.phone}`);
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  //constructor value for formik field
  const initialValues = {
    otp: "",
    ...info,
  };
  //check validate for formik field
  const validationSchema = Yup.object().shape({
    otp: Yup.string()
      .trim()
      .required("Vui lòng nhập mã OTP")
      .matches(/([0-9]{6})\b/, "Vui lòng nhập đúng mã OTP")
      .max(6, "Vui lòng nhập đúng mã OTP"),
  });
  return (
    <div className="register-form p-3">
      <div className="register-form-input">
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
                    placeholder="Nhập OTP"
                  />
                  <div className="ms-2">
                    <YLButton
                      onClick={sentOTP}
                      variant="warning"
                      value={`Gửi lại OTP ${
                        countTime > 0 ? "(" + countTime + ")" : ""
                      }`}
                      disabled={isDisableSendOtp}
                      type="button"
                    />
                  </div>
                </div>
                <div className="otp-form">
                  <YLButton type="submit" variant="primary" value="Xác nhận" />

                  <YLButton
                    variant="link"
                    value="Hủy"
                    onClick={() => changeTab(0)}
                  />
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
