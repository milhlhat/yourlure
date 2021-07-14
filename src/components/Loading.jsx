import React from "react";
import "assets/scss/scss-components/loading.scss";
import { LinearProgress } from "@material-ui/core";
function Loading(props) {
  const { hasLayout } = props;
  return (
    <div className={`loading bg-box container ${hasLayout ? "mt-4" : ""}`}>
      <LinearProgress className="w-75" />
    </div>
  );
}

export default Loading;