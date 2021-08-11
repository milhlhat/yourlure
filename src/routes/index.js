import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { Suspense, useEffect, useState } from "react";

import Loading from "components/Loading";

import DEFINELINK from "routes/define-link";

import { AbilityContext } from "authorization/can";
import { buildAbilityFor } from "authorization/ability";

import { fetchRoles } from "utils/user";
import { Helmet } from "react-helmet";
import { ToastContainer } from "react-toastify";
import userConfig from "../constants/user-config";

const ManagementRouter = React.lazy(() => import("./manager-routes/index"));
const StoreRoute = React.lazy(() => import("./store-front-routes/index"));
const NotFound = React.lazy(() => import("pages/store-front-pages/Notfound"));

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
        if (error.response?.status === 403) {
          localStorage.removeItem(userConfig.LOCAL_STORE_ACCESS_TOKEN);
        }
      }
    };
    setRoles();
  }, []);
  if (isLoading) {
    return <Loading hasLayout />;
  } else
    return (
      <AbilityContext.Provider value={ability}>
        <Helmet>
          <title>Yourlure</title>
          <meta
            name="description"
            content="Website tuỳ biến mồi lure đầu tiên Việt Nam"
          />
        </Helmet>
        <ToastContainer
          autoClose={2000}
          pauseOnFocusLoss={false}
          pauseOnHover={false}
        />
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
