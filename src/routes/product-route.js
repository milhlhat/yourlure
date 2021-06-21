import React from 'react';
import PropTypes from 'prop-types';

import DEFINELINK from 'routes/define-link';
import { Route, Switch } from 'react-router-dom';
ProductRoute.propTypes = {};
const Product = React.lazy(() => import('pages/Product-'));
const ProductDetail = React.lazy(() => import('pages/Product-Detail'));
const ProductCustomize = React.lazy(() => import('pages/CustomizeLure'));
const SearchProduct = React.lazy(() => import('pages/Search'));
const NotFound = React.lazy(() => import('pages/Notfound-'));
function ProductRoute(props) {
	return (
		<Switch>
			<Route exact path={DEFINELINK.product} component={Product} />
			<Route exact path={DEFINELINK.productDetail} component={ProductDetail} />
			<Route exact path={DEFINELINK.productCustomize} component={ProductCustomize} />
			<Route exact path={DEFINELINK.productSearch} component={SearchProduct} />
			<Route component={NotFound} />
		</Switch>
	);
}

export default ProductRoute;
