import ManagerFishAddNew from "manager-page/component/manager-fish/ManagerFishAddNew";
import ManagerFishEdit from "manager-page/component/manager-fish/ManagerFishEdit";
import ManagerFishDetail from "manager-page/component/manager-fish/ManagerFishDetail";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import DEFINELINK from "routes/define-link";
const ManagerFish = React.lazy(() => import("manager-page/component/manager-fish/ManagerFish"));
const NotFound = React.lazy(() => import("store-front-pages/Notfound"));

export default function OtherRoute() {
    const match = useRouteMatch();
    const path = match.path === "/" ? "" : match.path;
    const routes = [
        {
            path: path,
            component: ManagerFish,
            // can: { do: "login", on: "website"},
        },
        {
            path: path + DEFINELINK.managementFishAddNew,
            component: ManagerFishAddNew,
            exact: true,
            // can: { do: "login", on: "website"},
        },
    ];
    return (
        // <Switch>
        //     <RenderRoutes routes={routes} />
        //     <Route component={NotFound} />
        // </Switch>

        <Switch>
            <Route exact path={path} component={ManagerFish} />
            <Route exact path={path + DEFINELINK.managementFishAddNew} component={ManagerFishAddNew} />
            <Route exact path={path + DEFINELINK.managementFishEdit} component={ManagerFishEdit} />
            <Route exact path={path + DEFINELINK.managementFishDetail} component={ManagerFishDetail} />
            <Route component={NotFound} />
        </Switch>
    );
}
