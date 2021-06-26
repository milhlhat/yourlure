import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";
import { ErrorMessage } from "formik";
import "assets/scss/scss-components/custom-field/InputField.scss";
import { ref } from "yup";


InputField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

InputField.defaultProps = {
  type: "text",
  label: "",
  placeholder: "",
  disabled: false,
};

function InputField(props) {
  const { field, form, type, label, placeholder, disabled } = props;
  const { name, value, onChange, onBlur } = field;
  const [isPassword, setIsPassWord] = useState(type);
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];
  function handleChangeType() {
    setIsPassWord(isPassword == "text" ? "password" : "text");
  }

  return (
    <FormGroup>
      {label && <Label for={name}>{label}</Label>}
      <div className="input-custome">
        <Input
          id={name}
          {...field}
          type={isPassword}
          disabled={disabled}
          placeholder={placeholder}
          invalid={showError}
        />
        <div className={`display-eye ${type == "password"  && value!='' && !showError? "" : "d-none"}`}>
          <div
            className={`${isPassword == "text" ? "d-none" : ""}`}
            onClick={handleChangeType}
          >
            <i class="fa fa-eye" aria-hidden="true"></i>
          </div>
          <div
            className={`${isPassword == "text" ? "" : "d-none"}`}
            onClick={handleChangeType}
          >
            <i class="fa fa-eye-slash" aria-hidden="true"></i>
          </div>
        </div>
      </div>
      <ErrorMessage name={name} component={FormFeedback} />
    </FormGroup>
  );
}

export default InputField;
