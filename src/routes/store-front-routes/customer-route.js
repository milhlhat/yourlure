import React from "react";
import { Route, Switch, useRouteMatch, Redirect } from "react-router-dom";
import DEFINELINK from "routes/define-link";
import CustomerInfoLayout from "components/customer/CustomerInfoLayout";

const CustomerAccount = React.lazy(() =>
  import("components/customer/CustomerAccount")
);
const EditCustomerAccount = React.lazy(() =>
  import("components/customer/EditCustomerAccount")
);
const CutomerOrder = React.lazy(() =>
  import("components/customer/CutomerOrder")
);
const CustomerAddress = React.lazy(() =>
  import("components/customer/CustomerAddress")
);
const AddNewAddress = React.lazy(() =>
  import("components/customer/AddNewAddress")
);
const ChangeAddress = React.lazy(() =>
  import("components/customer/EditAddress")
);
const ChangePassword = React.lazy(() =>
  import("components/customer/ChangePassword")
);
const NotFound = React.lazy(() => import("store-front-pages/Notfound"));

function CutomerInfoRoute() {
  const match = useRouteMatch();
  const path = match.path === "/" ? "" : match.path;
  return (
    <CustomerInfoLayout>
      {(account) => (
        <Switch>
          <Redirect exact from={path} to={path + DEFINELINK.account} />
          <Route
            exact
            path={path + DEFINELINK.account}
            render={() => <CustomerAccount account={account} />}
          />
          <Route
            
            path={path + DEFINELINK.accountEdit}
            render={() => <EditCustomerAccount account={account} />}
          />
          <Route
            path={path + DEFINELINK.order}
            render={() => <CutomerOrder account={account} />}
          />
          <Route
            exact
            path={path + DEFINELINK.address}
            render={() => <CustomerAddress account={account} />}
          />
          <Route
            exact
            path={path + DEFINELINK.addressEdit}
            render={() => <ChangeAddress account={account} />}
          />
          <Route
            path={path + DEFINELINK.addressAdd}
            component={AddNewAddress}
          />
          <Route
            path={path + DEFINELINK.changePassword}
            component={ChangePassword}
          />
          <Route component={NotFound} />
        </Switch>
      )}
    </CustomerInfoLayout>
  );
}

export default CutomerInfoRoute;
