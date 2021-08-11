import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import DEFINELINK from "routes/define-link";

ManagerCategoryRoute.propTypes = {};

const ManagerOrderDetail = React.lazy(() =>
  import("pages/manager-pages/component/manager-order/ManagerOrderDetail")
);
const ManagerOrder = React.lazy(() =>
  import("pages/manager-pages/component/manager-order/ManagerOrder")
);
const NotFound = React.lazy(() => import("pages/store-front-pages/Notfound"));
function ManagerCategoryRoute() {
  const match = useRouteMatch();
  const path = match.path === "/" ? "" : match.path;
  return (
    <Switch>
      <Route exact path={path} component={ManagerOrder} />
      <Route
        path={path + DEFINELINK.managementOrderDetail}
        component={ManagerOrderDetail}
      />
      <Route component={NotFound} />
    </Switch>
  );
}

export default ManagerCategoryRoute;
