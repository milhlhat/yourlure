import React from "react";
import DEFINELINK from "routes/define-link";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Can } from "authorization/can";

ManagerUserRoute.propTypes = {};
const NotFound = React.lazy(() => import("pages/store-front-pages/Notfound"));
const ManagerUser = React.lazy(() =>
  import("pages/manager-pages/component/managerUser/ManagerUser")
);
const NoPermistion = React.lazy(() =>
  import("components/error-notify/NoPermistion")
);
const ManagerUserDetail = React.lazy(() =>
  import("pages/manager-pages/component/managerUser/ManagerUserDetail")
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
            <Route path={path+DEFINELINK.managementUserDetail} component={ManagerUserDetail} />
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
