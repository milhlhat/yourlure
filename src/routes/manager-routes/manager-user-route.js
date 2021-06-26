import React from 'react';
import DEFINELINK from 'routes/define-link';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
ManagerUserRoute.propTypes = {};

function ManagerUserRoute() {
	const match = useRouteMatch();
	const path = match.path === '/' ? '' : match.path;
	return (
		<Switch>
		</Switch>
	);
}

export default ManagerUserRoute;
