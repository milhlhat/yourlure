import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import React, { Suspense, useEffect } from 'react';
import { Container } from 'reactstrap';
import Header from 'components/header/header';
import Loading from 'components/loading';
import CommonUtils from 'utils/common';
import Footer from 'components/footer/footer';

import HomeRoute from './home-route';
import CartProduct from 'components/cart/CartProduct';
import Payment from 'pages/Payment';
import About from 'pages/About';
import CartRoute from './cart-router';
const UserRoute = React.lazy(() => import('./user-route'));
const ProductRoute = React.lazy(() => import('./product-route'));
const NotFound = React.lazy(() => import('pages/notfound'));
const Campaign = React.lazy(() => import('pages/Campaign'));
function AppRouter() {
	useEffect(() => {
		CommonUtils.scrollTop();
	}, []);
	return (
		<Suspense fallback={<Loading />}>
			<BrowserRouter>
				<Header />
				<Container fluid="lg" className="main-container">
					<div className="main">
						<Switch>
							<Redirect exact from="/" to="/home" />
							 <Route path="/home" component={HomeRoute} />
							<Route path="/user" component={UserRoute} />
							<Route path="/product" component={ProductRoute} />
							<Route path="/cart" component={CartRoute} />
							<Route path="/about" component={About} />
							<Route path="/campaign" component={Campaign} />
							<Route component={NotFound} />
						</Switch>
					</div>
				</Container>
				<Footer />
			</BrowserRouter>
		</Suspense>
	);
}

export default AppRouter;
