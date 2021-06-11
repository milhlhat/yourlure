import React from "react";
import "assets/scss/scss-components/loading.scss";
import { CircularProgress, LinearProgress } from "@material-ui/core";
function Loading() {
  return (
    <div className="loading">
      {/* <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">Loading...</span>
      </div> */}
{/* <CircularProgress color="secondary" /> */}
      <LinearProgress className="w-75" />
    </div>
  );
}

export default Loading;
