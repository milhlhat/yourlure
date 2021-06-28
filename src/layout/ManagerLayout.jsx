import React from "react";
// import "assets/scss/base/_base.scss";
import "assets/scss/scss-manager/_manager-base.scss";
import Sidebar from "manager-page/component/sidebar/Sidebar.jsx";
import ManagerHeader from 'manager-page/component/header/ManagerHeader';

function ManagerLayout(props) {
  return (
    <div className="manager-main">
      <div className="manager-slidebar">
        <Sidebar></Sidebar>
      </div>
      <div className="manager-main-container">
        <div className="header">
            <ManagerHeader></ManagerHeader>
        </div>
        <div className="manager-container">
            
        {props.children}
        </div>
      </div>
    </div>
  );
}

export default ManagerLayout;
