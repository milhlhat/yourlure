import InputField from "components/custom-field/YLInput.jsx";
import YLButton from "components/custom-field/YLButton.jsx";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import * as Yup from "yup";
import { FastField, Form, Formik } from "formik";
import "assets/scss/scss-pages/login.scss";
import CircularProgress from "@material-ui/core/CircularProgress";

import UserApi from "api/user-api";
import userConfig from "constants/user-config";
import { AbilityContext } from "authorization/can";
import { updateRoles } from "utils/user";
import DEFINELINK from "routes/define-link";
import Fishing from "assets/images/fishing.jpg";
import { toast } from "react-toastify";

function Login(props) {
  console.log(props);
  const backPath = props?.location?.state?.backPath;
  const history = useHistory();
  //context
  const ability = useContext(AbilityContext);

  const [userLogin, setUserLogin] = useState({
    loading: false,
    success: false,
  });

  const getLogin = async (values) => {
    setUserLogin({ ...userLogin, loading: true, success: false });

    try {
      const response = await UserApi.login(values);
      setUserLogin({
        loading: false,
        success: true,
      });
      localStorage.setItem(userConfig.LOCAL_STORE_ACCESS_TOKEN, response);
      await updateRoles(ability, history);
      if (backPath) history.push(backPath);
    } catch (error) {
      setUserLogin({ loading: false, success: false });
      const data = error.response?.data;
      if (data) {
        toast.error(data);
      } else {
        toast.error("Hệ thống gặp lỗi lạ");
      }
    }
  };

  //constructor value for formik field
  const initialValues = {
    phone: "",
    password: "",
  };
  //check validate for formik field
  const validationSchema = Yup.object().shape({
    phone: Yup.string()
      .required("Vui lòng nhập số điện thoại.")
      .matches(
        /((\+84|84|0)[35789][0-9]{8})\b/,
        "Vui lòng nhập đúng số điện thoại"
      )
      .max(12,"Vui lòng nhập đúng số điện thoại"),
    password: Yup.string()
      .required("Vui lòng nhập mật khẩu")
      .min(6, "Mật khẩu phải có it nhất 6 ký tự")
      .max(32, "Mật khẩu không được vượt quá 32 ký tự"),
  });

  return (
    <div className="container login">
      <div className="login-big-image">
        <img src={Fishing} alt="bg" />
      </div>
      <div className="login-form">
        <div className="login-form-input">
          <h1>Đăng Nhập</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              getLogin(values);
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
                  />
                  <FastField
                    name="password"
                    type="password"
                    component={InputField}
                    label="Mật khẩu"
                    placeholder="Nhập mật khẩu"
                  />
                  <div className="mt-2">
                    <YLButton
                      type="submit"
                      variant="primary"
                      width="100%"
                      disabled={userLogin.loading}
                    >
                      Đăng nhập{" "}
                      {userLogin.loading && (
                        <CircularProgress
                          size={15}
                          className="circle-progress"
                        />
                      )}
                    </YLButton>
                  </div>
                  <div className="mt-2 ">
                    <YLButton
                      variant="warning"
                      to={DEFINELINK.register}
                      value="Đăng ký"
                      width="100%"
                      disabled={userLogin.loading}
                    />
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
        <div className="mt-2">
          <YLButton
            variant="link"
            onClick={() => history.push(DEFINELINK.forgotPassword)}
            value="Quên mật khẩu?"
            width={100}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
