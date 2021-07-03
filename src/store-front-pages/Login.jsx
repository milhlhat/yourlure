import InputField from "components/custom-field/YLInput.jsx";
import YLButton from "components/custom-field/YLButton.jsx";
import React, { useState } from "react";
import { useHistory } from "react-router";
import * as Yup from "yup";
import { FastField, Form, Formik } from "formik";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import "assets/scss/scss-pages/login.scss";
import CircularProgress from "@material-ui/core/CircularProgress";

import UserApi from "api/user-api";
import userConfig from "constant/user-config";
import { AbilityContext } from "ability/can";
import defineAbilityFor from "ability/ability";
import { useContext } from "react";
import { fetchRoles } from "utils/user";
import DEFINELINK from "routes/define-link";
function Login() {
  const history = useHistory();
  //context
  const ability = useContext(AbilityContext);

  const INVALID_PHONE = 400;
  const INVALID_PASSWORD = 422;
  const FORBIDDEN = 403;
  const [open, setOpen] = useState({ isOpen: false, content: "" });
  const [userLogin, setUserLogin] = useState({
    loading: false,
    success: false,
  });

  const getLogin = async (values) => {
    let content = "";

    setUserLogin({ ...userLogin, loading: true, success: false });

    try {
      const response = await UserApi.login(values);
      setUserLogin({
        loading: false,
        success: true,
      });
      localStorage.setItem(userConfig.LOCAL_STORE_ACCESS_TOKEN, response);
      localStorage.setItem(
        userConfig.LOCAL_STORE_LOGIN_AT,
        new Date().toLocaleString()
      );
      await updateRoles();
      history.push("/");
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        const status = error.response.status;
        if (status === INVALID_PHONE || status === INVALID_PASSWORD) {
          content = "Tài khoản hoặc mật khẩu không chính xác";
        } else if (status === FORBIDDEN) {
          content = "Bạn đã đăng nhập trước đó, đăng xuất để đăng nhập lại";
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        if (error.request.status === 0) {
          content = "Mất kết nối máy chủ";
        }
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        content = error.message;
      }
      setOpen({ isOpen: true, content: content });
      setUserLogin({ ...userLogin, loading: false, success: false });
    }
  };

  const updateRoles = async () => {
    try {
      const response = await fetchRoles();
      ability.update(defineAbilityFor(response));
    } catch (error) {
      throw error;
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
      ),
    password: Yup.string()
      .required("Vui lòng nhập mật khẩu")
      .min(6, "Mật khẩu phải có it nhất 6 ký tự")
      .max(32, "Mật khẩu không được vượt quá 32 ký tự"),
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen({ ...open, isOpen: false });
  };
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  // const history = useHistory();
  // useEffect(() => {
  //   if (success) {
  //     history.push("/");
  //   }
  // }, [success]);
  return (
    <div className="login">
      <div className="login-big-image">
        <img
          src="https://i.pinimg.com/564x/d5/22/3f/d5223f9a7ffd85e69e8176030c745892.jpg"
          alt="bg"
        />
      </div>
      <div className="login-form">
        <Snackbar
          open={open.isOpen}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert onClose={handleClose} severity="error">
            {open.content}
          </Alert>
        </Snackbar>
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
                  ></FastField>
                  <FastField
                    name="password"
                    type="password"
                    component={InputField}
                    label="Mật khẩu"
                    placeholder="Nhập mật khẩu"
                  ></FastField>
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
                      // onClick={() => history.push("/register")}
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
            onClick={() => history.push("/fogot-password")}
            value="Quên mật khẩu?"
            width={100}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
