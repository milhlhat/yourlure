import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { Suspense, useEffect, useState } from 'react';

import Loading from 'components/Loading';

import DEFINELINK from 'routes/define-link';

import { AbilityContext } from 'ability/can';
import defineAbilityFor from 'ability/ability';
import UserApi from 'api/user-api';

const ManagementRouter = React.lazy(() => import('./manager-routes/index'));
const StoreRoute = React.lazy(() => import('./store-front-routes/index'));
const NotFound = React.lazy(() => import('pages/Notfound'));
function AppRouter() {
	const [ability, setAbility] = useState(defineAbilityFor({}));
	useEffect(() => {
		const fetchRoles = async () => {
			try {
				const response = await UserApi.getMe();
				setAbility(defineAbilityFor(response));
			} catch (error) {}
		};
		fetchRoles();
	}, []);
	return (
		<AbilityContext.Provider value={ability}>
			<Suspense fallback={<Loading />}>
				<BrowserRouter>
					<Switch>
						<Route path={DEFINELINK.manager} component={ManagementRouter} />
						<Route path={DEFINELINK.store} component={StoreRoute} />
						<Route component={NotFound} />
					</Switch>
				</BrowserRouter>
			</Suspense>
		</AbilityContext.Provider>
	);
}

export default AppRouter;
