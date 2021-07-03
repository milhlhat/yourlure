import React from "react";
import { Route } from "react-router-dom";
import NoPermistion from "components/error-notify/NoPermistion";
import { Can } from "ability/can";
const CommonUtils = {
  scrollTop: () => {},
};
export default CommonUtils;

export function RenderRoutes({ routes }) {
  return (
    <React.Fragment>
      {routes.map((item, index) => (
        <Can
          do={item.can?.do ? item.can?.do : "buy"}
          on={item.can?.on ? item.can?.on : "product"}
          key={item.path + index}
          passThrough
        >
          {(allowed) => (
            <Route
              exact={item.exact}
              key={item.path + index}
              path={item.path}
              component={(props) =>
                allowed ? (
                  <item.component {...props} />
                ) : (
                  <NoPermistion hasLayout />
                )
              }
            />
          )}
        </Can>
      ))}
    </React.Fragment>
  );
}
