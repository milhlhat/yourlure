import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { default as MuiDialogTitle } from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import { useTheme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import UserApi from "api/user-api";
import InputField from "components/custom-field/YLInput";
import { FastField, Form, Formik } from "formik";
import "manager-page/component/header/scss/header-dialog.scss";
import React, { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { CircularProgress } from "@material-ui/core";

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

function ManagerChangePassWord(props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChangePassword = () => {
    setOpen(true);
    // setInitialValue();
  };
  //Dialog
  const fullScreen = useMediaQuery(useTheme().breakpoints.down("xs"));

  const handleClose = () => {
    setOpen(false);
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

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await UserApi.changePassword(data);
      if (response.error) {
        throw new Error(response.error);
      } else {
        toast.success("Đổi mật khẩu thành công");
        setOpen(false);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data);
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
                    </div>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <>
                    <Button autoFocus color="primary" onClick={handleClose}>
                      Hủy
                    </Button>
                    <Button type="submit" color="primary" disabled={loading}>
                      Cập nhật
                      {loading && (
                        <CircularProgress
                          size={15}
                          className="circle-progress"
                        />
                      )}
                    </Button>
                  </>
                </DialogActions>
              </Form>
            );
          }}
        </Formik>
      </Dialog>
    </div>
  );
}

export default ManagerChangePassWord;
