import React from 'react';
import DEFINELINK from 'routes/define-link';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ManagerUser from 'manager-page/component/managerUser/ManagerUser';
import NotFound from 'store-front-pages/Notfound';
ManagerUserRoute.propTypes = {};

function ManagerUserRoute() {
	const match = useRouteMatch();
	const path = match.path === '/' ? '' : match.path;
	return (
		<Switch>
		<Route exact path={path} component={ManagerUser} />
		<Route component={NotFound} />
		</Switch>
	);
}

export default ManagerUserRoute;
