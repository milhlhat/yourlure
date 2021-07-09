import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { default as MuiDialogTitle } from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import UserApi from "api/user-api";
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

function ManagerInformation(props) {
  const { edit, account, fetchCustomAccount } = props;

  const [isEdit, setIsEdit] = useState(edit);
  const [open, setOpen] = useState(false);
  const handleShowInfomation = () => {
    setOpen(true);
    // setInitialValue();
  };
  //Dialog
  const fullScreen = useMediaQuery(useTheme().breakpoints.down("xs"));

  const handleClose = () => {
    setOpen(false);
    setIsEdit(false);
  };

  //edit dialog
  const handleEdit = () => {
    setIsEdit(true);
  };
  //form edit
  const schema = yup.object().shape({
    username: yup.string().required("Tên không được để trống"),
  });
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onsubmit = async (data) => {
    console.log(data);
    try {
      const response = await UserApi.update(data);
      if (response.error) {
        throw new Error(response.error);
      } else {
        fetchCustomAccount();
        setIsEdit(false);
      }
    } catch (error) {
      alert("Swuar thông tin thất bại");
      console.log("fail to fetch customer list");
    }
    // fetchCustomAccount();
  };
  const setInitialValue = () => {
    setValue("username", account?.data?.username);
    setValue("gender", account?.data?.gender);
    setValue("userEmail", account?.data?.userEmail);
  };
  useEffect(() => {
    setInitialValue();
  }, [account]);

  //format display role
  const displayRole = (role) => {
    if (role) {
      if (role === "ROLE_ADMIN") return "Quản lý";
      if (role === "ROLE_STAFF") return "Nhân viên";
      if (role === "ROLE_CUSTOMER") return "Khách hàng";
      return "chưa xác định";
    } else return "-";
  };
  return (
    <div>
      <span className="dropdown-item pointer" onClick={handleShowInfomation}>
        Xem thông tin
      </span>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={isEdit?()=>{}:handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="border-bottom">
            <DialogTitle id="draggable-dialog-title" onClose={handleClose}>
              {!isEdit ? "Thông tin" : "Sửa thông tin"}
            </DialogTitle>
          </div>
          <DialogContent>
            <DialogContentText>
              <div className="dialog-content">
                {isEdit ? (
                  <>
                    <label htmlFor="name">Họ tên</label>
                    <input
                      className="form-control"
                      {...register("username")}
                      type="text"
                      id="name"
                      disabled={!isEdit}
                      placeholder="Tên"
                    />
                    {errors?.username && (
                      <span className="error-message">
                        {errors?.username?.message}
                        <br />
                      </span>
                    )}
                    <label htmlFor="gender">Giới tính</label>
                    <select
                      id="gender"
                      className="form-select"
                      {...register("gender", {
                        validate: (value) => {
                          return value === "true" || value === "false";
                        },
                      })}
                    >
                      <option value="true">Nam</option>
                      <option value="false">Nữ</option>
                    </select>
                    <span className="error-message">
                      {errors?.gender?.message}
                    </span>
                    <label htmlFor="userEmail">Email</label>
                    <input
                      id="userEmail"
                      className="form-control"
                      {...register("userEmail", {})}
                      type="email"
                      placeholder="Email"
                    ></input>
                    {errors.userEmail && (
                      <span className="text-danger">
                        (*){errors.userEmail.message}
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    <table>
                      <tbody>
                        <tr>
                          <th className="text-end">Họ tên:</th>
                          <td className="ps-3">{account?.data?.username}</td>
                        </tr>
                        <tr>
                          <th className="text-end">Giới tính:</th>
                          <td className="ps-3">
                            {account?.data?.gender != null
                              ? account?.data?.gender
                                ? "Nam"
                                : "Nữ"
                              : "N/A"}
                          </td>
                        </tr>
                        <tr>
                          <th className="text-end">Số điện thoại:</th>
                          <td className="ps-3">{account?.data?.phone}</td>
                        </tr>
                        <tr>
                          <th className="text-end">Chức vụ:</th>
                          <td className="ps-3">
                            {displayRole(account?.data?.roles[0])}
                          </td>
                        </tr>
                        <tr>
                          <th className="text-end">Email:</th>
                          <td className="ps-3">{account?.data?.userEmail}</td>
                        </tr>
                      </tbody>
                    </table>
                  </>
                )}
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {isEdit ? (
              <>
                <Button
                  autoFocus
                  onClick={() => setIsEdit(false)}
                  color="primary"
                >
                  Hủy
                </Button>
                <button type="submit" className="btn btn-light">
                  Xong
                </button>
              </>
            ) : (
              <>
                <Button onClick={handleClose} color="primary">
                  Đóng
                </Button>
                <Button onClick={handleEdit} color="primary">
                  Sửa
                </Button>
              </>
            )}
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default ManagerInformation;
