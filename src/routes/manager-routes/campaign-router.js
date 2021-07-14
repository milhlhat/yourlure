import ManagerCampaign from "manager-page/component/manager-campaign/ManagerCampaign";
import ManagerCampaignAddNew from "manager-page/component/manager-campaign/ManagerCampaignAddNew";
import ManagerCampaignEdit from "manager-page/component/manager-campaign/ManagerCampaignEdit";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import DEFINELINK from "routes/define-link";
import NotFound from "store-front-pages/Notfound";
ManagerCampaignRoute.propTypes = {};

function ManagerCampaignRoute() {
    const match = useRouteMatch();
    const path = match.path === "/" ? "" : match.path;
    return (
        <Switch>
            <Route exact path={path} component={ManagerCampaign} />
            <Route
                path={path + DEFINELINK.managementCampaignAddNew}
                component={ManagerCampaignAddNew}
            />
            <Route
                path={path + DEFINELINK.managementCampaignEdit}
                component={ManagerCampaignEdit}
            />
            <Route component={NotFound} />
        </Switch>
    );
}

export default ManagerCampaignRoute;
