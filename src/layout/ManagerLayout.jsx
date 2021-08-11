import React from "react";
// import "assets/scss/base/_base.scss";
import "assets/scss/scss-manager/_manager-base.scss";
import Sidebar from "pages/manager-pages/component/sidebar/Sidebar.jsx";
import ManagerHeader from "pages/manager-pages/component/header/ManagerHeader";

function ManagerLayout(props) {
  return (
    <div className="manager-main">
      <div className="manager-slidebar bg-white">
        <Sidebar></Sidebar>
      </div>
      <div className="manager-main-container">
        <div className="header">
          <ManagerHeader></ManagerHeader>
        </div>
        <div className="manager-container">{props.children}</div>
      </div>
    </div>
  );
}

export default ManagerLayout;
