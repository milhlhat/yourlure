import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { default as MuiDialogTitle } from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import { useTheme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MuiAlert from "@material-ui/lab/Alert";
import UserApi from "api/user-api";
import InputField from "components/custom-field/YLInput";
import { FastField, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import "manager-page/component/header/scss/header-dialog.scss";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

//dialog
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <i className="fal fa-times"></i>
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ManagerChangePassWord(props) {
  const [openAlert, setOpenAlert] = useState({
    isOpen: false,
    content: "",
    severity: "success",
  });
  const [open, setOpen] = useState(false);

  const handleChangePassword = () => {
    setOpen(true);
    // setInitialValue();
  };
  //Dialog
  const fullScreen = useMediaQuery(useTheme().breakpoints.down("xs"));

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert({ ...openAlert, isOpen: false });
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
    try {
              const response = await UserApi.changePassword(data);
              if (response.error) {
                throw new Error(response.error);
              } else {
                alert("Đổi mật khẩu thành công");
                // setOpenAlert({
                //   ...open,
                //   isOpen: true,
                //   content: "Đổi mật khẩu thành công",
                // });
                setOpen(false);
              }
            } catch (error) {
              alert("Đổi mật khẩu không thành công");
              //   setOpenAlert({
              //     ...open,
              //     isOpen: true,
              //     content: "Đổi mật khẩu không thành công",
              //     severity: "error",
              //   });
              console.log("fail to fetch password change");
            }
  };

  return (
    <div>
      <span className="dropdown-item pointer" onClick={handleChangePassword}>
        Đổi mật khẩu
      </span>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="draggable-dialog-title"
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {(formikProps) => {
            return (
              <Form className="" width={500}>
                <div className="border-bottom">
                  <DialogTitle
                    id="draggable-dialog-title"
                    onClose={handleClose}
                  >
                    Đổi mật khẩu
                  </DialogTitle>
                </div>
                <DialogContent>
                  <DialogContentText>
                    <div className="dialog-content">
                      <FastField
                        name="oldPassword"
                        type="password"
                        component={InputField}
                        label="Mật khẩu hiện tại"
                        placeholder="Nhập mật khẩu hiện tại"
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
                    </div>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <>
                    <Button autoFocus color="primary" onClick={handleClose}>
                      Hủy
                    </Button>
                    <Button type="submit" color="primary">
                      Cập nhật
                    </Button>
                  </>
                </DialogActions>
              </Form>
            );
          }}
        </Formik>
      </Dialog>
      <Snackbar
        open={openAlert.isOpen}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseAlert} severity={openAlert.severity}>
          {openAlert.content}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ManagerChangePassWord;
