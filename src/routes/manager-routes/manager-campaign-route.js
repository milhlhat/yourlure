import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import DEFINELINK from "routes/define-link";

const ManagerCampaign = React.lazy(() =>
  import("pages/manager-pages/component/manager-campaign/ManagerCampaign")
);
const ManagerCampaignAddNew = React.lazy(() =>
  import("pages/manager-pages/component/manager-campaign/ManagerCampaignAddNew")
);
const ManagerCampaignEdit = React.lazy(() =>
  import("pages/manager-pages/component/manager-campaign/ManagerCampaignEdit")
);
const ManagerCampaignDetail = React.lazy(() =>
  import("pages/manager-pages/component/manager-campaign/ManagerCampaignDetail")
);
const NotFound = React.lazy(() => import("pages/store-front-pages/Notfound"));
function CampainRoute() {
  const match = useRouteMatch();
  const path = match.path === "/" ? "" : match.path;
  return (
    <Switch>
      <Route exact path={path} component={ManagerCampaign} />
      <Route
        path={path + DEFINELINK.managementFishAddNew}
        component={ManagerCampaignAddNew}
      />
      <Route
        path={path + DEFINELINK.managementFishEdit}
        component={ManagerCampaignEdit}
      />
      <Route
        path={path + DEFINELINK.managementCampaignDetail}
        component={ManagerCampaignDetail}
      />
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default CampainRoute;
