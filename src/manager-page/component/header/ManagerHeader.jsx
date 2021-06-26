import React from "react";
import PropTypes from "prop-types";
import "assets/scss/scss-manager/manager-header.scss";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {setIsBack} from 'redux/back-action/back-action';

ManagerHeader.propTypes = {};

function ManagerHeader(props) {
  const canBack = useSelector((state) => state.backActionHistory.canBack);
  const path = useSelector((state) => state.backActionHistory.path);
  const label = useSelector((state) => state.backActionHistory.label);
  const history = useHistory();
  const dispatch = useDispatch();
  function handleBackOnclick(e) {
    //save
    const action = setIsBack({
      canBack: false,
      path: "/manager/product",
      label: "Product",
    });
    dispatch(action);
  }
  return (
    <div className="bg-white manager-header">
      {console.log({ canBack })}
      <div
        className={`back-button ${canBack ? "" : "d-none"}`}
        onClick={handleBackOnclick}
      >
        <i class="far fa-arrow-alt-square-left"></i>
        <span>{label}</span>
      </div>
      header work
    </div>
  );
}

export default ManagerHeader;
