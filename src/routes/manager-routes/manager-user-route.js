import React from "react";
import DEFINELINK from "routes/define-link";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Can } from "ability/can";
ManagerUserRoute.propTypes = {};
const NotFound = React.lazy(() => import("store-front-pages/Notfound"));
const ManagerUser = React.lazy(() =>
  import("manager-page/component/managerUser/ManagerUser")
);
const NoPermistion = React.lazy(() =>
  import("components/error-notify/NoPermistion")
);
function ManagerUserRoute() {
  const match = useRouteMatch();
  const path = match.path === "/" ? "" : match.path;
  return (
    <Can do="read-write" on="admin" passThrough>
      {(allowed) =>
        allowed ? (
          <Switch>
            <Route exact path={path} component={ManagerUser} />
            <Route component={NotFound} />
          </Switch>
        ) : (
          <NoPermistion hasLayout />
        )
      }
    </Can>
  );
}

export default ManagerUserRoute;
