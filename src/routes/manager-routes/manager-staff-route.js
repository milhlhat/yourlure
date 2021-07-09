import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import DEFINELINK from "routes/define-link";
ManagerCategoryRoute.propTypes = {};
const NotFound = React.lazy(() => import("store-front-pages/Notfound"));
const ManagerStaffEdit = React.lazy(() =>
  import("manager-page/component/manager-staff/ManagerStaffEdit")
);
const ManagerStaff = React.lazy(() =>
  import("manager-page/component/manager-staff/ManagerStaff")
);
const ManagerStaffAddNew = React.lazy(() =>
  import("manager-page/component/manager-staff/ManagerStaffAddNew")
);
const ManagerStaffDetail = React.lazy(() =>
  import("manager-page/component/manager-staff/ManagerStaffDetail")
);
function ManagerCategoryRoute() {
  const match = useRouteMatch();
  const path = match.path === "/" ? "" : match.path;
  return (
    <Switch>
      <Route exact path={path} component={ManagerStaff} />
      <Route
        path={path + DEFINELINK.managementStaffAddNew}
        component={ManagerStaffAddNew}
      />
      <Route
        path={path + DEFINELINK.managementStaffDetail}
        component={ManagerStaffDetail}
      />
      <Route
        path={path + DEFINELINK.managementStaffEdit}
        component={ManagerStaffEdit}
      />
      <Route component={NotFound} />
    </Switch>
  );
}

export default ManagerCategoryRoute;
