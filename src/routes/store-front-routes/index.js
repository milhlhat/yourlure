import { Route, Switch } from "react-router-dom";
import React from "react";
import StoreFrontLayout from "layout/StoreFrontLayout";
import DEFINELINK from "routes/define-link";

const OtherRoute = React.lazy(() => import('./other-route'));
const CartRoute = React.lazy(() => import('./cart-router'));
const CustomerRoute = React.lazy(() => import('./customer-route'));
const ProductRoute = React.lazy(() => import('./product-route'));
const NotFound = React.lazy(() => import('pages/store-front-pages/Notfound'));
function StoreFrontRouter() {
	return (
		<StoreFrontLayout>
			<Switch>
				<Route path={DEFINELINK.customer} component={CustomerRoute} />
				<Route path={DEFINELINK.product} component={ProductRoute} />
				<Route path={DEFINELINK.cart} component={CartRoute} />
				<Route path="/" component={OtherRoute} />
				<Route component={NotFound} />
			</Switch>
		</StoreFrontLayout>
	);
}

export default StoreFrontRouter;
