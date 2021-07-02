import React from "react";
import DEFINELINK from "routes/define-link";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import NotFound from "store-front-pages/Notfound";
import ManagerCategory from "manager-page/component/manager-category/ManagerCategory";
import ManagerCategoryAddNew from "manager-page/component/manager-category/ManagerCategoryAddNew";
ManagerCategoryRoute.propTypes = {};

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
      <Route component={NotFound} />
    </Switch>
  );
}

export default ManagerCategoryRoute;
