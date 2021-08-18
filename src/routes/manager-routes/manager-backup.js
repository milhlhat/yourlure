import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

ManagerCategoryRoute.propTypes = {};
const NotFound = React.lazy(() => import("pages/store-front-pages/Notfound"));
const ManagerBackup = React.lazy(() =>
  import("pages/manager-pages/component/backup/ManagerBackup")
);

function ManagerCategoryRoute() {
  const match = useRouteMatch();
  const path = match.path === "/" ? "" : match.path;
  return (
    <Switch>
      <Route exact path={path} component={ManagerBackup} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default ManagerCategoryRoute;
