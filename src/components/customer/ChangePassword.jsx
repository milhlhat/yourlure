import React from "react";

import { FastField, Form, Formik } from "formik";
import InputField from "components/custom-field/YLInput";
import YLButton from "components/custom-field/YLButton";
import * as Yup from "yup";
function ChangePassword(props) {

  const initialValues = {
    oldPassword: "",
    password: "",
    rePassword: "",
  };
  //check validate for formik field
  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .min(6, "Mật khẩu phải chứa từ 6-32 ký tự")
      .max(32, "Mật khẩu phải chứa từ 6-32 ký tự")
      .required("Không được để trống."),
    password: Yup.string()
      .min(6, "Mật khẩu phải chứa từ 6-32 ký tự")
      .max(32, "Mật khẩu phải chứa từ 6-32 ký tự")
      .required("Không được để trống."),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp")
      .min(6, "Mật khẩu phải chứa từ 6-32 ký tự")
      .max(32, "Mật khẩu phải chứa từ 6-32 ký tự")
      .required("Không được để trống."),
  });

  const handleSubmit = (value) => {
    console.log(value);
  };
  return (
    <div>
      <h1>Đổi mật khẩu</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {(formikProps) => {
          const { values, errors, touched } = formikProps;
          // console.log({ values, errors, touched });
          return (
            <Form>
              <FastField
                name="oldPassword"
                type="password"
                component={InputField}
                label="Mật khẩu cũ"
                placeholder="Nhập Nhập mật khẩu cũ"
              ></FastField>
              <FastField
                name="password"
                type="password"
                component={InputField}
                label="Mật khẩu mới"
                placeholder="Nhập mật khẩu mới"
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
                  value="Lưu thay đổi"
                ></YLButton>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default ChangePassword;
