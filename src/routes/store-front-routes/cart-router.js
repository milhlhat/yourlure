import React from 'react';
import DEFINELINK from 'routes/define-link';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
CartRoute.propTypes = {};
const CartProduct = React.lazy(() => import('components/cart/CartProduct'));
const Payment = React.lazy(() => import('pages/Payment'));
const NotFound = React.lazy(() => import('pages/Notfound'));

function CartRoute() {
	const match = useRouteMatch();
	const path = match.path === '/' ? '' : match.path;
	return (
		<Switch>
			<Route exact path={path} component={CartProduct} />
			<Route path={path + DEFINELINK.payment} component={Payment} />
			<Route component={NotFound} />
		</Switch>
	);
}

export default CartRoute;
