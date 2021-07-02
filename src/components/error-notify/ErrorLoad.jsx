import React from "react";
import "assets/scss/scss-components/error-notify/error-notify.scss";
import { useHistory, useLocation } from "react-router-dom";
import YLButton from "components/custom-field/YLButton";
function ErrorLoad(props) {
  const { hasLayout } = props;
  const location = useLocation();
  const history = useHistory();
  console.log(location);
  function reload() {
    history.replace(location.pathname);
  }
  return (
    <div
      className={`d-flex align-items-center flex-column  container text-notify-error bg-notify-error ${
        hasLayout ? "mt-4" : ""
      }`}
    >
      <h1>
        <i className="fad fa-network-wired"></i>
      </h1>
      <h4>Hệ thống bận!</h4>
      <YLButton variant="primary" onClick={reload}>
        Tải lại trang
      </YLButton>
    </div>
  );
}

export default ErrorLoad;
