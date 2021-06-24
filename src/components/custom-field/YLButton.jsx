import React from "react";
import PropTypes from "prop-types";
import "assets/scss/scss-components/custom-field/YLButton.scss";

import { Link, BrowserRouter as Router } from "react-router-dom";
YLButton.propTypes = {};

function YLButton(props) {
  const { variant, value, onClick, disabled, type, to, width } = props;
  return (
    <Router>
      <div className="yl-button" onClick={onClick}>
        {type ? (
          <button
            className={`button ${
              width ? "width-" + width : ""
            } button_${variant} ${disabled ? "disabled" : ""} `}
            type={type}
            disabled={disabled}
          >
            {value}
            {props.children}
          </button>
        ) : (
          <Link
            to={!disabled ? (to ? to : "#") : "#"}
            className={`button ${
              width ? "width-" + width : ""
            } button_${variant} ${disabled ? "disabled" : ""}`}
            onClick={onClick}
          >
            {value}
            {props.children}
          </Link>
        )}
      </div>
    </Router>
  );
}

export default YLButton;