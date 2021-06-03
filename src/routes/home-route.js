import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import HomePage from 'pages/home';

export default function HomeRoute() {
	return (
		<Switch>
			<Route
				exact
				path={`${process.env.PUBLIC_URL}/`}
				render={() => {
					return localStorage.getItem('YL-user') ? <HomePage /> : <Redirect to="/login" />;
				}}
			/>
		</Switch>
	);
}
