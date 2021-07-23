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
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import YLSelectAddress from "components/custom-field/YLSelectAddress";
import { useEffect } from "react";
import YLButton from "components/custom-field/YLButton";

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
  const { fetchCustomAddress, noAddress, setNewAddress } = props;
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
    reset({
      userName: "",
    });
    setOpen(false);
  };
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert({ ...openAlert, isOpen: false });
  };
  const methods = useForm();
  const {
    register,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = methods;

  const onSubmit = async () => {
    let data = {
      userWardId: getValues("userWardId"),
      userName: getValues("userName"),
      province: getValues("province"),
      phone: getValues("phone"),
      district: getValues("district"),
      description: getValues("description"),
    };
    try {
      const response = await UserApi.addAddress(data);
      if (response.error) {
        throw new Error(response.error);
      } else {
        fetchCustomAddress();
        handleClose();
        setNewAddress(data);
      }
    } catch (error) {
      alert("Thêm địa chỉ thất bại");
      console.log("fail to fetch add address");
    }
  };
  useEffect(() => {
    const fetchCustomAccount = async () => {
      try {
        const response = await UserApi.getMe();
        setValue("userName", response.username);
        setValue("phone", response.phone);
      } catch (error) {
        console.log("fail to fetch information");
      }
    };
    fetchCustomAccount();
    return fetchCustomAccount();
  }, []);
  return (
    <div>
      <span className="pointer primary-color" onClick={handleChangePassword}>
        {noAddress ? (
          <YLButton variant="primary" type="button">
            Thêm địa chỉ mới
          </YLButton>
        ) : (
          "Thêm địa chỉ mới"
        )}
      </span>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="draggable-dialog-title"
      >
        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
        <div className="border-bottom">
          <DialogTitle id="draggable-dialog-title" onClose={handleClose}>
            Thêm địa chỉ
          </DialogTitle>
        </div>
        <DialogContent>
          <DialogContentText>
            <div className="dialog-content">
              <table className="add-address-table">
                <tbody>
                  <tr>
                    <td className="text-end title-table align-top">
                      Họ Và Tên(*)
                    </td>
                    <td>
                      <input
                        className="form-control"
                        {...register("userName", {
                          required: "Trường bắt buộc",
                        })}
                      />
                      {errors.userName && (
                        <span className="text-danger">
                          (*){errors.userName.message}
                        </span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-end title-table">Số Điện Thoại(*)</td>
                    <td>
                      <input
                        className="form-control"
                        {...register("phone", {
                          required: "Vui lòng nhập số điện thoại",
                          pattern: {
                            value: /((\+84|84|0)[35789][0-9]{8})\b/,
                            message: "Vui lòng nhập đúng số điện thoại",
                          },
                          minLength: {
                            value: 10,
                            message: "Vui lòng nhập đúng số điện thoại",
                          },
                          maxLength: {
                            value: 12,
                            message: "Vui lòng nhập đúng số điện thoại",
                          },
                        })}
                        type="text"
                      />
                      {errors.phone && (
                        <span className="text-danger">
                          {console.log(errors)}
                          {errors.phone.message}
                        </span>
                      )}
                    </td>
                  </tr>
                  <td className="text-end title-table">Địa chỉ(*)</td>
                  <td>
                    <YLSelectAddress {...methods} />
                  </td>

                  <tr>
                    <td className="text-end title-table">Địa Chỉ(*)</td>
                    <td>
                      <input
                        className="form-control"
                        {...register("description", {
                          required: "Trường bắt buộc",
                        })}
                      />
                      {errors.description && (
                        <span className="text-danger">
                          (*){errors.description.message}
                        </span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <>
            <Button autoFocus color="primary" onClick={handleClose}>
              Hủy
            </Button>
            <Button type="button" color="primary" onClick={onSubmit}>
              Thêm
            </Button>
          </>
        </DialogActions>
        {/* </form> */}
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
