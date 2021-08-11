import React, { useContext } from "react";
import DEFINELINK from "routes/define-link";
import YLButton from "components/custom-field/YLButton";
import "assets/scss/scss-components/error-notify/error-notify.scss";
import { AbilityContext } from "authorization/can";

function NoPermistion(props) {
  const { hasLayout } = props;
  const ability = useContext(AbilityContext);
  const isLoggedIn = ability.can("login", "website");
  return (
    <div
      className={`d-flex align-items-center flex-column my-1 container text-notify-error bg-notify-error ${
        hasLayout ? "mt-4" : ""
      }`}
    >
      <h1>
        <i className="far fa-frown" />
      </h1>
      {isLoggedIn && (
        <>
          {" "}
          <h3 className="text-center">Từ chối truy cập</h3>
          <p className="text-center">
            Bạn không có quyền truy cập trang này.
          </p>{" "}
          <YLButton YLButton variant="light" to={DEFINELINK.home}>
            TRANG CHỦ
          </YLButton>
        </>
      )}

      {!isLoggedIn && (
        <>
          <h3 className="text-center">Từ chối truy cập</h3>
          <p className="text-center">
            Bạn cần đăng nhập để truy cập trang này.
          </p>{" "}
          <div className="d-flex gap-1 flex-wrap justify-content-center">
            <YLButton YLButton variant="light" to={DEFINELINK.home}>
              TRANG CHỦ
            </YLButton>
            <YLButton variant="outline-primary" to={DEFINELINK.register}>
              ĐĂNG KÝ
            </YLButton>
            <YLButton variant="primary" to={DEFINELINK.login}>
              ĐĂNG NHẬP
            </YLButton>
          </div>
        </>
      )}
    </div>
  );
}

export default NoPermistion;
