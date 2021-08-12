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
  type:"text",
  disabled: false,
  defaultValue: "",
  notTrim: false,
  placeholder:"",
  step: 1,
};

function YlInputFormHook(props) {
  const {
    methods,
    name,
    label,
    message,
    isRequired,
    notTrim,
  } = props;
  const {
    register,
    formState: { errors },
    setValue,
  } = methods;
  const { onBlur, ...rest } = register(name);
  const ACCEPT_TYPE = ["text", "number", "password", "search"];
  const handleOnBlurInput = (e) => {
    if (!notTrim && ACCEPT_TYPE.includes(e.target.type)) {
      e.target.value = e.target.value.trim();
      setValue(name,e.target.value.trim())
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
        className={`form-control ${errors[name] ? "outline-red" : ""}`}
        id={name}
        {...rest}
        onBlur={handleOnBlurInput}
         {...props}
      />
      <span className="error-message">
        {message ? message : errors[name]?.message}
      </span>
    </>
  );
}

export default YlInputFormHook;
