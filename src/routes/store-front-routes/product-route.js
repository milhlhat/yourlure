import React from 'react';

import DEFINELINK from 'routes/define-link';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
ProductRoute.propTypes = {};
const Product = React.lazy(() => import('store-front-pages/Product'));
const ProductDetail = React.lazy(() => import('store-front-pages/ProductDetail'));
const ProductCustomize = React.lazy(() => import('store-front-pages/CustomizeLure'));
const SearchProduct = React.lazy(() => import('store-front-pages/Search'));
const NotFound = React.lazy(() => import('store-front-pages/Notfound'));
function ProductRoute() {
	const match = useRouteMatch();
	const path = match.path === '/' ? '' : match.path;
	return (
		<Switch>
			<Route exact path={path} component={Product} />
			<Route path={path + DEFINELINK.productDetail} component={ProductDetail} />
			<Route path={path + DEFINELINK.productCustomize} component={ProductCustomize} />
			<Route path={path + DEFINELINK.productSearch} component={SearchProduct} />
			<Route component={NotFound} />
		</Switch>
	);
}

export default ProductRoute;
