import React from "react";
import PropTypes from "prop-types";
import YLButton from "components/custom-field/YLButton";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {setIsBack} from 'redux/back-action/back-action';

ManagerUser.propTypes = {};

function ManagerUser(props) {
  
  useEffect(()=>{
  },[])
  return (
    <>
      <div className="product-head-row">
        <h3>Khách hàng</h3>
        <div className="product-add-new">
          <YLButton variant="primary" value="Thêm" />
        </div>
      </div>
    </>
  );
}

export default ManagerUser;
