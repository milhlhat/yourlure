import React from "react";
import "assets/scss/scss-components/custom-field/YLButton.scss";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
YLButton.propTypes = {
  variant: propTypes.string,
  value: propTypes.string,
  width: propTypes.string,
  height: propTypes.string,
  disabled: propTypes.bool,
};

function YLButton(props) {
  const { variant, value, onClick, disabled, type, to, width, height } = props;
  return (
    <div
      style={{
        width: width ? width : "fit-content",
        height: height ? height : "unset",
      }}
      className="d-flex justify-content-center align-items-center"
    >
      {type ? (
        <button
          className={`button button_${variant} ${
            disabled ? "disabled" : ""
          } d-flex justify-content-center align-items-center`}
          type={type}
          disabled={disabled}
          onClick={onClick}
        >
          {value}
          {props.children}
        </button>
      ) : (
        <Link
          to={!disabled ? (to ? to : "#") : "#"}
          className={`button button_${variant} ${
            disabled ? "disabled" : ""
          } d-flex justify-content-center align-items-center`}
          onClick={onClick}
        >
          {value}
          {props.children}
        </Link>
      )}
    </div>
  );
}

export default YLButton;
