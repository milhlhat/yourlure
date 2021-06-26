import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import ManagerLayout from 'layout/ManagerLayout';
import DEFINELINK from 'routes/define-link';

const ManagerUser = React.lazy(() => import('./manager-user-route.js'));
const ManagerProduct = React.lazy(() => import('./manager-product-route.js'));

function ManagementRouter(props) {
    const match = useRouteMatch();
	const path = match.path === '/' ? '' : match.path;
    return (
        <ManagerLayout>
            <Switch>
            <Route path={path + DEFINELINK.managementUser} component={ManagerUser} />
            <Route path={path + DEFINELINK.managementProduct} component={ManagerProduct} />
            </Switch>
        </ManagerLayout>
    );
}

export default ManagementRouter;