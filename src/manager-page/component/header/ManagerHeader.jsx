import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "assets/scss/scss-manager/manager-header.scss";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {setIsBack} from 'redux/back-action/back-action';

ManagerHeader.propTypes = {};

function ManagerHeader(props) {
  const canBack = useSelector((state) => state.backActionHistory.canBack);
  const path = useSelector((state) => state.backActionHistory.path);
  const label = useSelector((state) => state.backActionHistory.label);
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  function handleBackOnclick(e) {
    
    history.push(path);
    //save
    const action = setIsBack({
      canBack: false,
      path: null,
      label: null,
    });
    dispatch(action);
  }
  useEffect(()=>{
    const action = setIsBack({
      canBack: false,
      path: null,
      label: null,
    });
    dispatch(action);
  },[location])
  return (
    <div className="bg-white manager-header">
      <div
        className={`back-button ${canBack ? "" : "d-none"}`}
        onClick={handleBackOnclick}
      >
        <i className="far fa-arrow-alt-square-left"></i>
        <span>{label}</span>
      </div>
    </div>
  );
}

export default ManagerHeader;
