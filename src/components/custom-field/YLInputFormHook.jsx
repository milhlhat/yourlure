import React from "react";
import PropTypes from "prop-types";

YlInputFormHook.propTypes = {
  methods: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  message: PropTypes.string,
  placeholder: PropTypes.string,
  isRequired: PropTypes.bool,
  type: PropTypes.string,
  step: PropTypes.any,
  disabled: PropTypes.bool,
  notTrim: PropTypes.bool,
};
YlInputFormHook.defaultProps = {
  disabled: false,
  defaultValue: "",
  notTrim: false,
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
    notTrim,
  } = props;
  const {
    register,
    formState: { errors },
  } = methods;
  const { onBlur, ...rest } = register(name);
  const ACCEPT_TYPE = ["text", "number", "password", "search"];
  const handleOnBlurInput = (e) => {
    if (!notTrim && ACCEPT_TYPE.includes(e.target.type)) {
      e.target.value = e.target.value.trim();
      onBlur(e);
    }
  };
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
        {...rest}
        step={step || 1}
        disabled={disabled}
        defaultValue={defaultValue}
        onBlur={handleOnBlurInput}
      />
      <span className="error-message">
        {message ? message : errors[name]?.message}
      </span>
    </>
  );
}

export default YlInputFormHook;
