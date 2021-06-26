import React from "react";
import PropTypes from "prop-types";
import YLButton from "components/custom-field/YLButton";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {setIsBack} from 'redux/back-action/back-action';

ManagerUser.propTypes = {};

function ManagerUser(props) {
  
  const dispatch = useDispatch();
  useEffect(()=>{
    console.log("object");
    const action = setIsBack({
      canBack: true,
      path: "/manager/product",
      label: "Product",
    });
    dispatch(action);
  },[])
  return (
    <>
      <div className="user-head-row">
        <h3>Khách hàng</h3>
        <div className="product-add-new">
        </div>
      </div>
    </>
  );
}

export default ManagerUser;
