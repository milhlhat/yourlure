import ManagerStaff from "manager-page/component/manager-staff/ManagerStaff";
import ManagerStaffAddNew from "manager-page/component/manager-staff/ManagerStaffAddNew";
import ManagerStaffDetail from "manager-page/component/manager-staff/ManagerStaffDetail";
import ManagerStaffEdit from "manager-page/component/manager-staff/ManagerStaffEdit";
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
