import { yupResolver } from "@hookform/resolvers/yup";
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
import YLButton from "components/custom-field/YLButton";
import "manager-page/component/header/scss/header-dialog.scss";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setCaptureModel } from "redux/customize-action/capture-model";
import * as yup from "yup";

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

function AddNameCustomize(props) {
  const { open, setOpen } = props;
  const captureModel = useSelector((state) => state.captureModel);
  //Dialog
  const fullScreen = useMediaQuery(useTheme().breakpoints.down("xs"));

  const handleClose = () => {
    setOpen(false);
  };

  //form edit
  const schema = yup.object().shape({
    customName: yup.string().required("Tên không được để trống"),
  });
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const onsubmit = async (data) => {
    const action = setCaptureModel({ isCapture: true, name: data.customName });
    dispatch(action);
    setOpen(false);
  };
  const setInitialValue = () => {
    setValue("customName", captureModel?.name ? captureModel?.name : "");
  };
  function onChangeTextSearch(e) {
    if (e.key === "Enter") {
      onsubmit();
    }
  }

  useEffect(() => {
    setInitialValue();
  }, []);

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="border-bottom">
            <DialogTitle id="draggable-dialog-title" onClose={handleClose}>
              Nhập tên sản phẩm của bạn
            </DialogTitle>
          </div>

          <DialogContent>
            <DialogContentText>
              <div className="dialog-content">
                <label htmlFor="name">Tên cho sản phẩm tùy biến(*)</label>
                <input
                  className="form-control"
                  {...register("customName")}
                  type="text"
                  id="name"
                  placeholder="Tên tùy biến"
                  onKeyDown={(e) => onChangeTextSearch(e)}
                />
                {errors?.customName && (
                  <span className="error-message text-danger">
                    {errors?.customName?.message}
                    <br />
                  </span>
                )}
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <>
              <Button autoFocus color="primary" onClick={() => setOpen(false)}>
                Hủy
              </Button>
              <YLButton variant="primary" type="submit" className="btn btn-light">
                Xong
              </YLButton>
            </>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default AddNameCustomize;
