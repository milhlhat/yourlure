import React from "react";
import {Route, Switch, useRouteMatch, Redirect} from "react-router-dom";
import DEFINELINK from "routes/define-link";
import CustomerInfoLayout from "components/customer/CustomerInfoLayout";
import NoPermistion from "components/error-notify/NoPermistion";
import {Can} from "ability/can";
import {RenderRoutes} from '../../utils/common';

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

    const routes = [
        {path: path + DEFINELINK.account, component: CustomerAccount, exact: true},
        {path: path + DEFINELINK.accountEdit, component: EditCustomerAccount},
        {path: path + DEFINELINK.order, component: CutomerOrder, exact: true},
        {path: path + DEFINELINK.address, component: CustomerAddress, exact: true},
        {path: path + DEFINELINK.addressEdit, component: ChangeAddress},
        {path: path + DEFINELINK.addressAdd, component: AddNewAddress},
        {path: path + DEFINELINK.changePassword, component: ChangePassword}
    ];
    return (
        <Can do="read-write" on="customer" passThrough>
            {(allowed) =>
                allowed ? (
                    <CustomerInfoLayout>
                        {(account) => (
                            <Switch>
                                <Redirect exact from={path} to={path + DEFINELINK.account}/>
                                <RenderRoutes routes={routes}/>
                                <Route component={NotFound}/>
                            </Switch>
                        )}
                    </CustomerInfoLayout>
                ) : (
                    <NoPermistion hasLayout/>
                )
            }
        </Can>
    );
}

export default CutomerInfoRoute;
