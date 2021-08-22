import React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import DEFINELINK from "routes/define-link";
import { RenderRoutes } from "utils/common";

const Campaign = React.lazy(() => import("pages/store-front-pages/Campaign"));
const About = React.lazy(() => import("pages/store-front-pages/About"));
const HomePage = React.lazy(() => import("pages/store-front-pages/Home"));
const Login = React.lazy(() => import("pages/store-front-pages/Login"));
const Register = React.lazy(() => import("pages/store-front-pages/Register"));
const FogotPassWord = React.lazy(() =>
  import("pages/store-front-pages/ForgotPassWord")
);
const ViewCustomizeOrder = React.lazy(() =>
  import("pages/manager-pages/component/manager-order/ViewCustomizeOrder")
);
const NotFound = React.lazy(() => import("pages/store-front-pages/Notfound"));

export default function OtherRoute() {
  const match = useRouteMatch();
  const path = match.path === "/" ? "" : match.path;
  const routes = [
    {
      path: path + DEFINELINK.about,
      component: About,
      exact: true,
      // can: { do: "login", on: "website"},
    },
    { path: path + DEFINELINK.campaign, component: Campaign },
    { path: path + DEFINELINK.login, component: Login, exact: false },
    {
      path: DEFINELINK.register,
      component: Register,
      exact: false,
      // can: { do: "login", on: "website", not: true },
    },
    {
      path: path + DEFINELINK.forgotPassword,
      component: FogotPassWord,
      exact: false,
    },
    { path: DEFINELINK.home, component: HomePage },
  ];
  return (
    <Switch>
      <Redirect exact from={DEFINELINK.store} to={DEFINELINK.home} />{" "}
      <Route
        path={DEFINELINK.viewCustomizeOrder}
        component={ViewCustomizeOrder}
      />
      <RenderRoutes routes={routes} />
      <Route component={NotFound} />
    </Switch>
  );
}
