import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { default as MuiDialogTitle } from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import { AbilityContext } from "ability/can";
import UserApi from "api/user-api";
import "assets/scss/scss-manager/manager-header.scss";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { setIsBack } from "redux/back-action/back-action";
import DEFINELINK from "routes/define-link";
import { logout } from "utils/user";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

ManagerHeader.propTypes = {};

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

function ManagerHeader(props) {
  const canBack = useSelector((state) => state.backActionHistory.canBack);
  const path = useSelector((state) => state.backActionHistory.path);
  const label = useSelector((state) => state.backActionHistory.label);
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  function handleBackOnclick(e) {
    history.push(path);
    //save
    const action = setIsBack({
      canBack: false,
      path: null,
      label: null,
    });
    dispatch(action);
  }
const [isEdit, setIsEdit] = useState(false);
  const [account, setAccount] = useState({
    data: null,
    isLoading: false,
    isSuccess: false,
  });

  const [open, setOpen] = useState(false);

  //Dialog
  const handleClose = () => {
    setOpen(false);
  };
  const handleEditSubmit=()=>{
    setIsEdit(false);
  }

  const ability = useContext(AbilityContext);
  const handleLogOut = () => {
    logout(ability);
    history.push(DEFINELINK.home);
  };

  const handleShowInfomation = () => {
    setOpen(true);
  };

  //edit dialog
  const handleEdit = () => {
    console.log("edit");
    setIsEdit(true);
  };

  //format display role
  const displayRole = (role) => {
    if (role) {
      if (role === "ROLE_ADMIN") return "Quản lý";
      if (role === "ROLE_STAFF") return "Nhân viên";
      if (role === "ROLE_CUSTOMER") return "Khách hàng";
      return "chưa xác định";
    } else return "-";
  };

  //get account information
  useEffect(() => {
    const fetchCustomAccount = async () => {
      setAccount((prevState) => {
        return { ...prevState, isLoading: true };
      });
      try {
        const response = await UserApi.getMe();
        setAccount({ data: response, isLoading: false, isSuccess: true });
      } catch (error) {
        setAccount({ data: null, isLoading: false, isSuccess: false });
        console.log("fail to fetch information");
      }
    };
    fetchCustomAccount();
    return fetchCustomAccount();
  }, []);
  useEffect(() => {
    const action = setIsBack({
      canBack: false,
      path: null,
      label: null,
    });
    dispatch(action);
  }, [location]);
  return (
    <div className="bg-white manager-header">
      <div
        className={`back-button ${canBack ? " ms-3 " : "d-none"}`}
        onClick={handleBackOnclick}
      >
        <i className="far fa-arrow-left"></i>
        <span className="ms-2">{label}</span>
      </div>
      <div className={`${canBack ? "d-none" : ""}`}></div>
      <div className="account">
        <div className="dropdown">
          <button
            className="btn btn-light dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {account?.data?.phone}
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <span className="dropdown-item pointer" onClick={handleLogOut}>
                Đăng xuất
              </span>
            </li>
            <li>
              <span
                className="dropdown-item pointer"
                onClick={handleShowInfomation}
              >
                Thông tin
              </span>
            </li>
            <li>
              <span
                className="dropdown-item pointer"
                onClick={() => console.log("đổi mật khẩu")}
              >
                Đổi mật khẩu
              </span>
            </li>
          </ul>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <div className="border-bottom">
          <DialogTitle id="draggable-dialog-title" onClose={handleClose}>
            Thông tin
          </DialogTitle>
        </div>
        <DialogContent>
          <DialogContentText>
            <div className="ps-3 pe-5">
              <p>
                <b>Họ tên: </b>
                {account?.data?.username}
              </p>
              <p>
                <b>Giới tính:</b>{" "}
                {account?.data?.gender != null
                  ? account?.data?.gender
                    ? "Nam"
                    : "Nữ"
                  : "N/A"}
              </p>
              <p>
                <b>Số điện thoại: </b>
                {account?.data?.phone}
              </p>
              <p>
                <b>Chức vụ: </b>
                {displayRole(account?.data?.roles[0])}
              </p>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {isEdit && (
            <>
              <Button autoFocus onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={()=>handleEditSubmit} color="primary">
                Xong
              </Button>
            </>
          )}
          {!isEdit && (
            <Button onClick={handleEdit} color="primary">
              Sửa
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ManagerHeader;
