import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import DialogContentText from "@material-ui/core/DialogContentText";
import { useTheme } from "@material-ui/core/styles";
import "manager-page/component/header/scss/header-dialog.scss";
import React, { useState } from "react";
import YLButton from "components/custom-field/YLButton";
import "./scss/bill-line.scss";
import { Link, useHistory } from "react-router-dom";
import { convertToVND, formatDate, getShipping, totalPrice } from "utils/format-string";

function BillLine(props) {
  const { open, setOpen, billLine } = props;

  const history = useHistory();
  const handleClickOutSide = ()=>{
    setOpen(false);
    history.push("/cart")
  }
  //Dialog
  const fullScreen = useMediaQuery(useTheme().breakpoints.down("md"));
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        maxWidth="lg"
        open={open}
        aria-labelledby="draggable-dialog-title"
        onClose={handleClickOutSide}
      >
        <DialogContent>
          <DialogContentText>
            <div className="text-small dialog-content d-flex justify-content-center flex-column align-items-center">
              <div className="primary-color d-flex flex-column align-items-center">
                <span className="primary-color" onClick={() => setOpen(false)}>
                  Cảm ơn quý khách {billLine?.receiverName} đã đặt hàng
                </span>
                <span className="text-center">
                  Hệ thống đã ghi nhận đơn hàng, nhân viên sẽ liên hệ với quý
                  khách để hoàn tất quá trình đặt hàng.
                </span>
                <span className="mt-3">
                  <i className="far fa-check-circle success-icon"></i>
                </span>
                <Link className="primary-color pointer back-to-home bold mb-4" to="/">
                  <i className="fal fa-arrow-left"></i> &nbsp; Quay về trang chủ
                </Link>
              </div>
              <div className="d-flex flex-column align-items-center bill-detail px-5">
                <h6>Chi tiết hóa đơn</h6>
                <table className="table">
                  <tbody>
                    <tr>
                      <th className="text-start">Mã đơn hàng</th>
                      <td className="text-end">{billLine?.orderId}</td>
                    </tr>
                    <tr>
                      <th className="text-start">Tổng cộng</th>
                      <td className="text-end">{billLine&&convertToVND((totalPrice(billLine?.orderLineCollection)-billLine?.discount+getShipping()))}</td>
                    </tr>
                    <tr>
                      <th className="text-start">Phương thức thanh toán</th>
                      <td className="text-end">
                        COD- Thanh toán khi nhận hàng
                      </td>
                    </tr>
                    <tr>
                      <th className="text-start">Ngày đặt hàng</th>
                      <td className="text-end">{formatDate(billLine?.orderDate)}</td>
                    </tr>
                    <tr>
                      <th className="text-start">Địa chỉ giao hàng</th>
                      <td className="text-end">
                        <span>{billLine?.receiverName}</span><br />
                        <span>{billLine?.phone}</span><br />
                        <span>{billLine?.address}</span>
                      </td>
                    </tr>
                    <tr>
                      <th className="text-start">Lưu ý</th>
                      <td className="text-end">{billLine?.note}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default BillLine;
