import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import DEFINELINK from 'routes/define-link';
UserRoute.propTypes = {};
const ManagementAccount = React.lazy(() => import('store-front-pages/CustomerInfoManagement'));
const NotFound = React.lazy(() => import('store-front-pages/Notfound'));

function UserRoute() {
	const match = useRouteMatch();
	const path = match.path === '/' ? '' : match.path;
	return (
		<Switch>
			<Route path={path + DEFINELINK.account} component={ManagementAccount} />
			<Route component={NotFound} />
		</Switch>
	);
}

export default UserRoute;
