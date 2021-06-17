import React from 'react';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';
const Campaign = React.lazy(() => import('pages/Campaign'));
const About = React.lazy(() => import('pages/About'));
const HomePage = React.lazy(() => import('pages/Home'));
const Login = React.lazy(() => import('pages/Login'));
const Register = React.lazy(() => import('pages/Register'));
const FogotPassWord = React.lazy(() => import('pages/FogotPassWord'));
const NotFound = React.lazy(() => import('pages/Notfound'));

export default function OtherRoute() {
	const match = useRouteMatch();
 
	return (
		<Switch>
			<Redirect exact from="/" to="/home" />
			<Route path={`${match.url}about`} component={About} />
			<Route path={`${match.url}campaign`} component={Campaign} />
			<Route path={`${match.url}login`} component={Login} />
			<Route path={`${match.url}register`} component={Register} />
			<Route path={`${match.url}fogot-password`} component={FogotPassWord} />
			<Route
				path={`${match.url}home`}
				component={HomePage}
				// render={() => {
				// 	return localStorage.getItem('YL-user') ? <HomePage /> : <Redirect to="/login" />;
				// }}
			/>
			<Route component={NotFound} />
		</Switch>
	);
}
