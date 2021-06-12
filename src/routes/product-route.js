import React from 'react';
import PropTypes from 'prop-types';

import { Route, Switch } from 'react-router-dom';
ProductRoute.propTypes = {};
const Product = React.lazy(() => import('pages/product'));
const ProductDetail = React.lazy(() => import('pages/productDetail'));
const ProductCustomize = React.lazy(() => import('pages/customize-lure'));
const SearchProduct = React.lazy(() => import('pages/Search'));
const NotFound = React.lazy(() => import('pages/notfound'));
function ProductRoute(props) {
	return (
		<Switch>
			<Route exact path="/product" component={Product} />
			<Route exact path="/product/detail/:id" component={ProductDetail} />
			<Route exact path="/product/customize/:id" component={ProductCustomize} />
			<Route exact path="/product/search" component={SearchProduct} />
			<Route component={NotFound} />
		</Switch>
	);
}

export default ProductRoute;
