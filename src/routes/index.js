import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import React, { Suspense, useEffect } from "react";
import { Container } from "reactstrap";
import Header from "components/header/header";
import Loading from "components/loading";
import CommonUtils from "utils/common";
import Footer from "components/footer/footer";
const Login = React.lazy(() => import("pages/login"));
const Home = React.lazy(() => import("pages/home"));
const NotFound = React.lazy(() => import("pages/notfound"));
function AppRouter() {
  useEffect(() => {
    CommonUtils.scrollTop();
  }, []);
  return (
    <Container fluid="lg" className="pt-2 main-container">
      <Suspense fallback={<Loading />}>
        <BrowserRouter>
          <Header />
          <div className="main">
            <Switch>
              <Redirect exact from="/" to="/home" />
              <Route
                path="/home"
                render={() => {
                  return localStorage.getItem("accessToken") ? (
                    <Home />
                  ) : (
                    <Redirect to="/login" />
                  );
                }}
              />
              <Route path="/login" component={Login} />
              <Route component={NotFound} />
            </Switch>{" "}
          </div>
          <Footer />
        </BrowserRouter>
      </Suspense>
    </Container>
  );
}

export default AppRouter;
