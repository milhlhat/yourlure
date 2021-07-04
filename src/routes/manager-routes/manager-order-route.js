
import ManagerOrder from "manager-page/component/manager-order/ManagerOrder";
import ManagerOrderDetail from "manager-page/component/manager-order/ManagerOrderDetail";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import DEFINELINK from "routes/define-link";
import NotFound from "store-front-pages/Notfound";
ManagerCategoryRoute.propTypes = {};

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
