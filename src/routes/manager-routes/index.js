import React from "react";
import { Route, Switch } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import ManagerLayout from "layout/ManagerLayout";
import DEFINELINK from "routes/define-link";
import { Can } from "ability/can";
import NoPermistion from "components/error-notify/NoPermistion";

const ManagerUser = React.lazy(() => import("./manager-user-route.js"));
const ManagerProduct = React.lazy(() => import("./manager-product-route.js"));
const ManagerCategory = React.lazy(() => import("./manager-category-route.js"));

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
