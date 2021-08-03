import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { Suspense, useEffect, useState } from "react";

import Loading from "components/Loading";

import DEFINELINK from "routes/define-link";

import { AbilityContext } from "ability/can";
import { buildAbilityFor } from "ability/ability";

import { fetchRoles } from "utils/user";

const ManagementRouter = React.lazy(() => import("./manager-routes/index"));
const StoreRoute = React.lazy(() => import("./store-front-routes/index"));
const NotFound = React.lazy(() => import("store-front-pages/Notfound"));
function AppRouter() {
  const [ability, setAbility] = useState(buildAbilityFor([]));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const setRoles = async () => {
      try {
        const response = await fetchRoles();
        setAbility(buildAbilityFor(response));
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        throw error;
      }
    };
    setRoles();
  }, []);
  if (isLoading) {
    return <Loading hasLayout />;
  } else
    return (
      <AbilityContext.Provider value={ability}>
        <Suspense fallback={<Loading />}>
          <BrowserRouter>
            <Switch>
              <Route path={DEFINELINK.manager} component={ManagementRouter} />
              <Route path={DEFINELINK.store} component={StoreRoute} />
              <Route component={NotFound} />
            </Switch>
          </BrowserRouter>
        </Suspense>
      </AbilityContext.Provider>
    );
}

export default AppRouter;
