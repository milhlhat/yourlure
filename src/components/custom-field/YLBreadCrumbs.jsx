import React from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Link } from "react-router-dom";
import "assets/scss/scss-components/custom-field/YLBreadcrumbs.scss";

function YLBreadCrumbs(props) {
  const children = props.children;

  return (
    <Breadcrumbs
      maxItems={3}
      aria-label="breadcrumb"
      className="yl-breadcrumb py-3"
    >
      <Link className="link" to="/home">
        Trang chủ
      </Link>
      {children &&
        children.length > 0 &&
        children.map((item, i) => (
          <Link
            className={`link ${i === children.length - 1 ? "current" : ""}`}
            to={item.path ? item.path : "#"}
            key={`breadcrumbs-${i}`}
          >
            {item.name}
          </Link>
        ))}
    </Breadcrumbs>
  );
}

export default YLBreadCrumbs;
