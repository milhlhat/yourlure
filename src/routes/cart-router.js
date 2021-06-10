import React from 'react';
import PropTypes from 'prop-types';

import { Route, Switch } from 'react-router-dom';
CartRoute.propTypes = {};
const CartProduct = React.lazy(() => import('components/cart/CartProduct'));
const Payment = React.lazy(() => import('pages/Payment'));
function CartRoute(props) {
	return (
		<Switch>
			<Route exact path="/cart" component={CartProduct} />
			<Route exact path="/cart/payment" component={Payment} />
		</Switch>
	);
}

export default CartRoute;
