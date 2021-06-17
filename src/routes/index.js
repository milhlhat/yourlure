import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { Suspense, useEffect } from 'react';
import { Container } from 'reactstrap';
import Header from 'components/header/Header';
import Loading from 'components/Loading';
import CommonUtils from 'utils/common';
import Footer from 'components/footer/Footer';

import OtherRoute from './other-route';
import CartRoute from './cart-router';
const UserRoute = React.lazy(() => import('./user-route'));
const ProductRoute = React.lazy(() => import('./product-route'));
const NotFound = React.lazy(() => import('pages/Notfound'));
function AppRouter() {
	useEffect(() => {
		CommonUtils.scrollTop();
	}, []);
	return (
		<Suspense fallback={<Loading />}>
			<BrowserRouter>
				<Header />
				<div  className="main-container">
					<div className="main">
						<Switch>
							<Route path="/user" component={UserRoute} />
							<Route path="/product" component={ProductRoute} />
							<Route path="/cart" component={CartRoute} />
							<Route path="/" component={OtherRoute} />
							<Route component={NotFound} />
						</Switch>
					</div>
				</div>
				<Footer />
			</BrowserRouter>
		</Suspense>
	);
}

export default AppRouter;
