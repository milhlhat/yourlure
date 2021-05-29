import InputField from "components/custom-field/YLInput.jsx";
import YLButton from "components/custom-field/YLButton.jsx";
import React from "react";
import { useHistory } from "react-router";
import * as Yup from "yup";
import { FastField, Form, Formik } from "formik";

function Login(props) {
  const history = useHistory();
  const login = (values) => {
    console.log("Submit: ", values);
    localStorage.setItem("accessToken", true);
    history.replace("/home");
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
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        login(values);
      }}
    >
      {(formikProps) => {
        const { values, errors, touched } = formikProps;
        console.log({ values, errors, touched });
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
            <YLButton type="submit" varian="primary" value="Login"></YLButton>
          </Form>
        );
      }}
    </Formik>
  );
}

export default Login;
