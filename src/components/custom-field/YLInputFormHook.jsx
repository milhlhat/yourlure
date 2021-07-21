import React from "react";

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
      />
      <span className="error-message">
        {message ? message : errors[name]?.message}
      </span>
    </>
  );
}

export default YlInputFormHook;
