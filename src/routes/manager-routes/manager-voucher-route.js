import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import DEFINELINK from "routes/define-link";
import NotFound from "store-front-pages/Notfound";

const ManagerVoucher = React.lazy(() =>
  import("manager-page/component/manager-voucher/ManagerVoucher")
);
const ManagerVoucherAddNew = React.lazy(() =>
  import("manager-page/component/manager-voucher/ManagerVoucherAddNew")
);
const ManagerVoucherEdit = React.lazy(() =>
  import("manager-page/component/manager-voucher/ManagerVoucherEdit")
);
ManagerVoucherRoute.propTypes = {};

function ManagerVoucherRoute() {
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

      <Route component={NotFound} />
    </Switch>
  );
}

export default ManagerVoucherRoute;
