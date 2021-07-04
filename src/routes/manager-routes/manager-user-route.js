import React from "react";
import DEFINELINK from "routes/define-link";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ManagerUser from "manager-page/component/managerUser/ManagerUser";
import NotFound from "store-front-pages/Notfound";
import { Can } from "ability/can";
import NoPermistion from "components/error-notify/NoPermistion";
ManagerUserRoute.propTypes = {};

function ManagerUserRoute() {
  const match = useRouteMatch();
  const path = match.path === "/" ? "" : match.path;
  return (
    <Can do="read-write" on="admin" passThrough>
      {(allowed) =>
        allowed ? (
          <Switch>
            <Route exact path={path} component={ManagerUser} />
            <Route component={NotFound} />
          </Switch>
        ) : (
          <NoPermistion hasLayout />
        )
      }
    </Can>
  );
}

export default ManagerUserRoute;
