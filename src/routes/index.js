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
const UserRoute = React.lazy(() => import('./user-route'));
const ProductRoute = React.lazy(() => import('./product-route'));
const NotFound = React.lazy(() => import('pages/notfound'));
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
							{/* <Redirect exact from="/" to="/home" /> */}
							<Route path="/user" component={UserRoute} />
							<Route path="/product" component={ProductRoute} />
							<Route path="/cart" component={CartProduct} />
							<Route path="/payment" component={Payment} />
							<Route path="/" component={HomeRoute} />
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
