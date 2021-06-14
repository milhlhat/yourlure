import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
UserRoute.propTypes = {};
const ManagementAccount = React.lazy(() => import('components/user/ManagementAccount'));
function UserRoute(props) {
	const match = useRouteMatch();
	return (
		<Switch>
			<Route path={`${match.url}/account`} component={ManagementAccount} />
		</Switch>
	);
}

export default UserRoute;
