import React from "react";
import DEFINELINK from "routes/define-link";
import { Route, Switch, useRouteMatch } from "react-router-dom";

ManagerCategoryRoute.propTypes = {};

const ManagerCategoryDetail = React.lazy(() =>
  import("manager-page/component/manager-category/ManagerCategoryDetail")
);
const ManagerCategoryEdit = React.lazy(() =>
  import("manager-page/component/manager-category/ManagerCategoryEdit")
);
const ManagerCategoryAddNew = React.lazy(() =>
  import("manager-page/component/manager-category/ManagerCategoryAddNew")
);
const ManagerCategory = React.lazy(() =>
  import("manager-page/component/manager-category/ManagerCategory")
);
const NotFound = React.lazy(() => import("store-front-pages/Notfound"));

function ManagerCategoryRoute() {
  const match = useRouteMatch();
  const path = match.path === "/" ? "" : match.path;
  return (
    <Switch>
      <Route exact path={path} component={ManagerCategory} />
      <Route
        path={path + DEFINELINK.managerCategoryAddNew}
        component={ManagerCategoryAddNew}
      />
      <Route
        path={path + DEFINELINK.managerCategoryEdit}
        component={ManagerCategoryEdit}
      />
      <Route
        path={path + DEFINELINK.managerCategoryDetail}
        component={ManagerCategoryDetail}
      />
      <Route component={NotFound} />
    </Switch>
  );
}

export default ManagerCategoryRoute;
