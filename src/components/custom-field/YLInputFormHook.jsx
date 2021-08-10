import React from "react";
import PropTypes from "prop-types";

YlInputFormHook.propTypes = {
  methods: PropTypes.any,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  message: PropTypes.string,
  placeholder: PropTypes.string,
  isRequired: PropTypes.bool,
  type: PropTypes.string,
  step: PropTypes.any,
  disabled: PropTypes.bool,
};
YlInputFormHook.defaultProps = {
  disabled: false,
};
function YlInputFormHook(props) {
  const {
    methods,
    name,
    label,
    message,
    placeholder,
    isRequired,
    type,
    defaultValue,
    step,
    disabled,
  } = props;
  const {
    register,
    formState: { errors },
  } = methods;

  return (
    <>
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
          {isRequired && <span className="error-message"> (*)</span>}
        </label>
      )}
      <input
        type={type || "text"}
        className={`form-control ${errors[name] ? "outline-red" : ""}`}
        id={name}
        placeholder={placeholder}
        {...register(name)}
        defaultValue={defaultValue}
        step={step || 1}
        disabled={disabled}
      />
      <span className="error-message">
        {message ? message : errors[name]?.message}
      </span>
    </>
  );
}

export default YlInputFormHook;
