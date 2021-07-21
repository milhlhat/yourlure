import React from "react";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import "../scss/stepper.scss";

export default function HorizontalStepper(props) {
  const { steps, completed, active } = props;

  // const steps = ["Thêm thông tin cơ bản", "Thêm biến thể, tuỳ biến 3D"];
  // const completed = [];

  return (
    <div className={"stepper"}>
      <Stepper activeStep={active}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton
              className={"button-step"}
              completed={completed?.includes(index)}
            >
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
