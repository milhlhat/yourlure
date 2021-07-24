import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import YLButton from "components/custom-field/YLButton";
import "assets/scss/scss-components/confirm-popup/confirm-popup.scss";
export default function ComfirmPopup(props) {
  const {
    onConfirm,
    title,
    content,
    negativeText,
    positiveText,
    btnText,
    variant,
    height,
    width,
    disabled,
  } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    setOpen(false);
  };
  return (
    <div>
      <YLButton
        variant={variant ? variant : "warning"}
        height={height}
        width={width}
        onClick={handleClickOpen}
        disabled={disabled}
      >
        {btnText ? btnText : "Open"}
      </YLButton>
      <Dialog
        open={open&&!disabled}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        {title && (
          <DialogTitle id="draggable-dialog-title" >
            {title}
          </DialogTitle>
        )}
        {content && (
          <DialogContent>
            <DialogContentText>{content}</DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          <Button
            autoFocus
            onClick={handleClose}
            style={{
              color: "green",
            }}
          >
            {negativeText ? negativeText : "Hủy"}
          </Button>
          <Button
            onClick={handleConfirm}
            style={{
              color: "green",
            }}
          >
            {positiveText ? positiveText : "Đồng ý"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}