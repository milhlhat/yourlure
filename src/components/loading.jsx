import React from "react";
import "assets/scss/scss-components/loading.scss";
function Loading() {
  return (
    <div className="loading">
      <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Loading;
