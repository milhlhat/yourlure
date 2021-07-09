import React from "react";
import DEFINELINK from "routes/define-link";
import { Route, Switch, useRouteMatch } from "react-router-dom";
ManagerProductRoute.propTypes = {};
const ManagerProduct = React.lazy(() =>
  import("manager-page/component/manager-product/ManagerProduct")
);
// const ManagerProductAddNew = React.lazy(() => import('manager-page/component/manager-product/ManagerProductAddNew'));
const NotFound = React.lazy(() => import("store-front-pages/Notfound"));
const ManagerProductAddNew = React.lazy(() =>
  import("manager-page/component/manager-product/ManagerProductAddNew")
);
const ManagerProductDetail = React.lazy(() =>
  import("manager-page/component/manager-product/ManagerProductDetail")
);
const ManagerProductEdit = React.lazy(() =>
  import("manager-page/component/manager-product/ManagerProductEdit")
);

function ManagerProductRoute() {
  const match = useRouteMatch();
  const path = match.path === "/" ? "" : match.path;
  return (
    <Switch>
      <Route exact path={path} component={ManagerProduct} />
      <Route
        path={path + DEFINELINK.managerProductAddNew}
        component={ManagerProductAddNew}
      />
      <Route
        path={path + DEFINELINK.managerProductDetail}
        component={ManagerProductDetail}
      />
      <Route
        path={path + DEFINELINK.managerProductEdit}
        component={ManagerProductEdit}
      />
      <Route component={NotFound} />
    </Switch>
  );
}

export default ManagerProductRoute;
