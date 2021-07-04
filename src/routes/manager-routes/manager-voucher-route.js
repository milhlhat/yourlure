import ManagerVoucher from "manager-page/component/manager-voucher/ManagerVoucher";
import ManagerVoucherAddNew from "manager-page/component/manager-voucher/ManagerVoucherAddNew";
import ManagerVoucherDetail from "manager-page/component/manager-voucher/ManagerVoucherDetail";
import ManagerVoucherEdit from "manager-page/component/manager-voucher/ManagerVoucherEdit";
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
      <Route exact path={path} component={ManagerVoucher} />
      <Route
        path={path + DEFINELINK.managementVoucherAddNew}
        component={ManagerVoucherAddNew}
      />
      <Route
        path={path + DEFINELINK.managementVoucherEdit}
        component={ManagerVoucherEdit}
      />
      <Route
        path={path + DEFINELINK.managementVoucherDetail}
        component={ManagerVoucherDetail}
      />
      <Route component={NotFound} />
    </Switch>
  );
}

export default ManagerCategoryRoute;
