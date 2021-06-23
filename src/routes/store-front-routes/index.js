import { Route, Switch } from 'react-router-dom';
import React from 'react';
import StoreFrontLayout from 'layout/StoreFrontLayout';
import DEFINELINK from 'routes/define-link';
import OtherRoute from './other-route';
import CartRoute from './cart-router';

const UserRoute = React.lazy(() => import('./user-route'));
const ProductRoute = React.lazy(() => import('./product-route'));
const NotFound = React.lazy(() => import('pages/Notfound'));
function StoreFrontRouter() {
	return (
		<StoreFrontLayout>
			<Switch>
				<Route path={DEFINELINK.user} component={UserRoute} />
				<Route path={DEFINELINK.product} component={ProductRoute} />
				<Route path={DEFINELINK.cart} component={CartRoute} />
				<Route path="/" component={OtherRoute} />
				<Route component={NotFound} />
			</Switch>
		</StoreFrontLayout>
	);
}

export default StoreFrontRouter;
