import InputField from "components/custom-field/YLInput.jsx";
import YLButton from "components/custom-field/YLButton.jsx";
import React from "react";
import { useHistory } from "react-router";
import * as Yup from "yup";
import { FastField, Form, Formik } from "formik";
import { getUser, setUser } from "redux/user-action/user-slice";
import { useDispatch } from "react-redux";
import "assets/scss/scss-pages/login.scss";

import { unwrapResult } from "@reduxjs/toolkit";

function Login(props) {
  const history = useHistory();
  //redux

  const dispatch = useDispatch();

  const login = async (values) => {
    // const action = setUser(values);

    // dispatch(action);
    // history.replace("/home");
    try {
      const actionResult = await dispatch(getUser(values));
      const currentUser = unwrapResult(actionResult);
      console.log("currentUser", currentUser);
    } catch (e) {
      console.log("failed to login", e);
    }
  };

  //constructor value for formik field
  const initialValues = {
    account: "",
    password: "",
  };
  //check validate for formik field
  const validationSchema = Yup.object().shape({
    account: Yup.string().required("This field is required."),
    password: Yup.string().required("This field is required."),
  });

  return (
    <div className="login">
      <div className="login-big-image">
        <img
          src="https://i.pinimg.com/564x/d5/22/3f/d5223f9a7ffd85e69e8176030c745892.jpg"
          alt=""
        />
      </div>
      <div className="login-form">
        <div className="login-form-input">
          <h1>Đăng Nhập</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              login(values);
            }}
          >
            {(formikProps) => {
              const { values, errors, touched } = formikProps;
              // console.log({ values, errors, touched });
              return (
                <Form>
                  <FastField
                    name="account"
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
                      // onClick={}
                      value="Login"
                      width={100}
                    ></YLButton>
                  </div>
                  <div className="mt-2">
                    <YLButton
                      variant="warning"
                      onClick={() => history.push("/register")}
                      value="Đăng ký"
                      width={100}
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
