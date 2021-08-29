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
import YLButton from "components/custom-field/YLButton";
import YLSelectAddress from "components/custom-field/YLSelectAddress";
import "pages/manager-pages/component/header/scss/header-dialog.scss";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

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
  const { fetchCustomAddress, noAddress, setNewAddress } = props;
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
  const methods = useForm();
  const {
    register,
    reset,
    getValues,
    setValue,
    handleSubmit,
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
      } else if (response === false || response?.data === false) {
        throw new Error();
      } else {
        handleClose();
        toast.success("Thêm địa chỉ thành công");
      }
    } catch (error) {
      toast.error("Thêm địa chỉ thất bại");
      console.log("fail to fetch add address");
    }
    fetchCustomAddress();
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
        <form onSubmit={handleSubmit(onSubmit)}>
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
                            required: "Họ tên không được để trống",
                          })}
                          onBlur={(e) => {
                            e.target.value = e.target.value.trim();
                            register("userName", {
                              required: "Họ và tên không được để trống",
                            });
                            setValue("userName", e.target.value.trim());
                          }}
                          placeholder="Nhập họ tên"
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
                          onBlur={(e) => {
                            e.target.value = e.target.value.trim();
                            register("phone", {
                              required: "Vui lòng nhập số điện thoại",
                            });
                            setValue("phone", e.target.value.trim());
                          }}
                          type="text"
                          placeholder="Nhập số điện thoại"
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
                      <td className="text-end title-table">
                        Địa Chỉ cụ thể(*)
                      </td>
                      <td>
                        <input
                          className="form-control"
                          {...register("description", {
                            required: "Địa chỉ cụ thể không được để trống",
                          })}
                          onBlur={(e) => {
                            e.target.value = e.target.value.trim();
                            register("description", {
                              required: "Địa chỉ cụ thể không được để trống",
                            });
                            setValue("description", e.target.value.trim());
                          }}
                          placeholder="Địa chỉ cụ thể"
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
              <YLButton variant="link" type="button" onClick={handleClose}>
                Hủy
              </YLButton>
              <YLButton variant="primary" type="submit">
                Thêm
              </YLButton>
              {/* <YLButton type="submit" variant="primary">
              Thêm
            </YLButton> */}
            </>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default ManagerChangePassWord;
