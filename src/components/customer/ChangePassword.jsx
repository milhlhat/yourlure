import { CircularProgress } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import UserApi from "api/user-api";
import "assets/scss/scss-pages/login.scss";
import YLButton from "components/custom-field/YLButton";
import InputField from "components/custom-field/YLInput";
import { FastField, Form, Formik } from "formik";
import React, { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

function ChangePassword(props) {
  const [open, setOpen] = useState({
    isOpen: false,
    content: "",
    severity: "success",
  });
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
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .max(32, "Mật khẩu không được vượt quá 32 ký tự")
      .required("Mật khẩu cũ không được để trống."),
    password: Yup.string()
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .max(32, "Mật khẩu không được vượt quá 32 ký tự")
      .required("Mật khẩu mới không được để trống."),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .max(32, "Mật khẩu không được vượt quá 32 ký tự")
      .required("Mật khẩu mới không được để trống."),
  });

  const [changeProcess, setChangeProcess] = useState(false);
  const handleSubmit = async (data) => {
    setChangeProcess(true);
    try {
      const response = await UserApi.changePassword(data);
      if (response.error) {
        throw new Error(response.error);
      } else if (response?.data === true || response === true) {
        setChangeProcess(false);
        toast.success("Đổi mật khẩu thành công");
      } else {
        throw new Error(response);
      }
    } catch (error) {
      setChangeProcess(false);
      toast.error(error?.response?.data);
      if(!error?.response){
        toast.error("Đổi mật khẩu thất bại");
      }
      console.log("fail to fetch customer list");
    }
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
                  disabled={changeProcess}
                >
                  Lưu thay đổi{" "}
                  {changeProcess && (
                    <CircularProgress size={15} className="circle-progress" />
                  )}{" "}
                </YLButton>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default ChangePassword;
