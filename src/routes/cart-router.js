import React from 'react';
import PropTypes from 'prop-types';
import DEFINELINK from 'routes/define-link';
import { Route, Switch } from 'react-router-dom';
CartRoute.propTypes = {};
const CartProduct = React.lazy(() => import('components/cart/CartProduct'));
const Payment = React.lazy(() => import('pages/Payment'));
function CartRoute(props) {
	return (
		<Switch>
			<Route exact path={DEFINELINK.cart} component={CartProduct} />
			<Route exact path={DEFINELINK.payment} component={Payment} />
		</Switch>
	);
}

export default CartRoute;
