import React from 'react';
import PropTypes from 'prop-types';

import { Route, Switch } from 'react-router-dom';
ProductRoute.propTypes = {};
const Product = React.lazy(() => import('pages/product'));
const ProductDetail = React.lazy(() => import('pages/productDetail'));
const ProductCustomize = React.lazy(() => import('pages/customize-lure'));
function ProductRoute(props) {
	return (
		<Switch>
			<Route exact path="/product" component={Product} />
			<Route exact path="/product/detail/:id" component={ProductDetail} />
			<Route exact path="/product/customize/:id" component={ProductCustomize} />
		</Switch>
	);
}

export default ProductRoute;
