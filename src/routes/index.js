import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import React, { Suspense, useEffect } from "react";
import { Container } from "reactstrap";
import Header from "components/header/header";
import Loading from "components/loading";
import CommonUtils from "utils/common";
import Footer from "components/footer/footer";
import Product from "pages/product";
const Login = React.lazy(() => import("pages/login"));
const Home = React.lazy(() => import("pages/home"));
const NotFound = React.lazy(() => import("pages/notfound"));
function AppRouter() {
  useEffect(() => {
    CommonUtils.scrollTop();
  }, []);
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Header />
        <Container fluid="lg" className="main-container">
          <div className="main">
            <Switch>
              <Redirect exact from="/" to="/home" />
              <Route
                path="/home"
                render={() => {
                  return localStorage.getItem("YL-user") ? (
                    <Home />
                  ) : (
                    <Redirect to="/login" />
                  );
                }}
              />
              <Route path="/login" component={Login} />
              <Route path="/product" component={Product} />
              <Route component={NotFound} />
            </Switch>{" "}
          </div>
        </Container>
          <Footer />
      </BrowserRouter>
    </Suspense>
  );
}

export default AppRouter;
