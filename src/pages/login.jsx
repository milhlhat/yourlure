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
          src="data:image/jpeg;base64,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"
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
                      onClick={() => history.push("/user/account")}
                      value="Login"
                      width={100}
                    ></YLButton>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
        <div className="mt-2">
          <YLButton
            variant="warning"
            onClick={() => history.push("/user/register")}
            value="Đăng ký"
            width={100}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
