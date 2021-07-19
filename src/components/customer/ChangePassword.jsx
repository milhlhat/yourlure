import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import UserApi from "api/user-api";
import "assets/scss/scss-pages/login.scss";
import YLButton from "components/custom-field/YLButton";
import InputField from "components/custom-field/YLInput";
import { FastField, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";


function ChangePassword(props) {
  const [open, setOpen] = useState({ isOpen: false, content: "" ,severity:"success"});
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen({ ...open, isOpen: false });
  };
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

  const handleSubmit = async (data) => {
    delete data.rePassword;
    console.log(data);
    try {
			const response = await UserApi.changePassword(data);
      console.log(response);
			if (response.error) {
				throw new Error(response.error);
			} else {
        setOpen({ ...open, isOpen: true,content:"Đổi mật khẩu thành công" });
			}
		} catch (error) {
      console.log(error);
      setOpen({ ...open, isOpen: true,content:"Đổi mật khẩu không thành công", severity:"error"});
			console.log('fail to fetch customer list');
		}
    // setOpen({ ...open, isOpen: true,content:"Đổi mật khẩu thành công" });
  };
  return (
    <div className="bg-box d-flex flex-column align-items-center">
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
            <Form className="w-50 my-4">
              <FastField
                name="oldPassword"
                type="password"
                component={InputField}
                label="Mật khẩu hiện tại (*)"
                placeholder="Nhập mật khẩu hiện tại"
              ></FastField>
              <FastField
                name="password"
                type="password"
                component={InputField}
                label="Mật khẩu mới (*)"
                placeholder="Nhập mật khẩu mới"
              ></FastField>
              <FastField
                name="rePassword"
                type="password"
                component={InputField}
                label="Nhập lại mật khẩu (*)"
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
      <Snackbar
        open={open.isOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity={open.severity}>
          {open.content}
        </Alert>
      </Snackbar>
    </div>
  );
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default ChangePassword;
