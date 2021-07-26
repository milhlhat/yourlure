import React from "react";
import notfoundImg from "assets/images/notify/illustration_404.svg";
import YLButton from "../components/custom-field/YLButton";
import DEFINELINK from "../routes/define-link";
function NotFound(props) {
  const location = props.location.pathname;
  return (
    <div className={"d-flex flex-column align-items-center my-5"}>
      <img src={notfoundImg} className={"mb-4"} />
      <YLButton
        to={location.includes("manager") ? DEFINELINK.manager : DEFINELINK.home}
        variant={"primary"}
      >
        Trang chủ
      </YLButton>
    </div>
  );
}

export default NotFound;
