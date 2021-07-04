import React from "react";
import PropTypes from "prop-types";
import { Checkbox, FormControlLabel } from "@material-ui/core";

CheckBoxField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  color: PropTypes.string,
  checked: PropTypes.bool,
};

CheckBoxField.defaultProps = {
  color: "primary",
  checked: false,
  label: "",
};
function CheckBoxField(props) {
  const { field, color, checked, label } = props;
  const { name, onChange } = field;

  return (
    <div>
      <FormControlLabel
        name={name}
        checked={checked}
        onChange={onChange}
        control={<Checkbox color={color} />}
        label={label}
      />
    </div>
  );
}

export default CheckBoxField;