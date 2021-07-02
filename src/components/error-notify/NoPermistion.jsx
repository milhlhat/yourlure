import React from "react";
import DEFINELINK from "routes/define-link";
import YLButton from "components/custom-field/YLButton";
import "assets/scss/scss-components/error-notify/error-notify.scss";
function NoPermistion(props) {
  const { hasLayout } = props;
  return (
    <div
      className={`d-flex align-items-center flex-column my-1 container text-notify-error bg-notify-error ${
        hasLayout ? "mt-4" : ""
      }`}
    >
      <h1>
        <i className="far fa-frown"></i>
      </h1>
      <h3>Từ chối truy cập</h3>
      <p>Bạn không có quyền truy cập trang này.</p>
      <YLButton variant="primary" to={DEFINELINK.home}>
        TRANG CHỦ
      </YLButton>
    </div>
  );
}

export default NoPermistion;
