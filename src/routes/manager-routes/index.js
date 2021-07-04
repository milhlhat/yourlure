import { Can } from "ability/can";
import NoPermistion from "components/error-notify/NoPermistion";
import ManagerLayout from "layout/ManagerLayout";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import DEFINELINK from "routes/define-link";

const ManagerUser = React.lazy(() => import("./manager-user-route.js"));
const ManagerProduct = React.lazy(() => import("./manager-product-route.js"));
const ManagerCategory = React.lazy(() => import("./manager-category-route.js"));
const ManagerFish = React.lazy(() => import("./manager-fish-router.js"));
const ManagerStaff = React.lazy(() => import("./manager-staff-route"));
const ManagerVoucher = React.lazy(() => import("./manager-voucher-route"));
const ManagerOrder = React.lazy(() => import("./manager-order-route"));

function ManagementRouter(props) {
  const match = useRouteMatch();
  const path = match.path === "/" ? "" : match.path;
  return (
    <Can do="read-write" on="admin-staff" passThrough>
      {(allowed) =>
        allowed ? (
          <ManagerLayout>
            <Switch>
              <Route
                path={path + DEFINELINK.managementUser}
                component={ManagerUser}
              />
              <Route
                path={path + DEFINELINK.managementProduct}
                component={ManagerProduct}
              />
              <Route
                path={path + DEFINELINK.managementCategory}
                component={ManagerCategory}
              />
              <Route path={path + DEFINELINK.managementFish}
                component={ManagerFish}
              />
              <Route path={path + DEFINELINK.managementStaff}
                component={ManagerStaff}
              />
              <Route path={path + DEFINELINK.managementVoucher}
                component={ManagerVoucher}
              />
              <Route path={path + DEFINELINK.managementOrder}
                component={ManagerOrder}
              />
            </Switch>
          </ManagerLayout>
        ) : (
          <NoPermistion hasLayout />
        )
      }
    </Can>
  );
}

export default ManagementRouter;
