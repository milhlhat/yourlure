import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import DEFINELINK from 'routes/define-link';
UserRoute.propTypes = {};
const ManagementAccount = React.lazy(() => import('components/user/ManagementAccount'));
function UserRoute(props) {
	return (
		<Switch>
			<Route path={DEFINELINK.account} component={ManagementAccount} />
		</Switch>
	);
}

export default UserRoute;
