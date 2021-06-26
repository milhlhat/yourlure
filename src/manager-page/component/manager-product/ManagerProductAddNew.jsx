import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { setIsBack } from "redux/back-action/back-action";
import { useDispatch } from "react-redux";

ManagerProductAddNew.propTypes = {};

function ManagerProductAddNew(props) {
  const canBack = props.location.canBack;
  const history = useHistory();
  const dispatch=useDispatch();
  useEffect(() => {
    if (canBack) {
      const action = setIsBack({
        canBack: canBack.canBack,
        path: canBack.path,
        label: canBack.label,
      });
      dispatch(action);
    }
  }, [canBack]);
  return (
    <div>
      add new work!!!
    </div>
  );
}

export default ManagerProductAddNew;
