import React from 'react';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';
import DEFINELINK from 'routes/define-link';
const Campaign = React.lazy(() => import('pages/Campaign'));
const About = React.lazy(() => import('pages/About'));
const HomePage = React.lazy(() => import('pages/Home'));
const Login = React.lazy(() => import('pages/Login'));
const Register = React.lazy(() => import('pages/Register'));
const FogotPassWord = React.lazy(() => import('pages/FogotPassWord'));
const NotFound = React.lazy(() => import('pages/Notfound'));

export default function OtherRoute() {
	const match = useRouteMatch();
	const path = match.path === '/' ? '' : match.path;
	return (
		<Switch>
			<Redirect exact from="/" to="/home" />
			<Route path={path + DEFINELINK.about} component={About} />
			<Route path={path + DEFINELINK.campaign} component={Campaign} />
			<Route path={path + DEFINELINK.login} component={Login} />
			<Route path={path + DEFINELINK.register} component={Register} />
			<Route path={path + DEFINELINK.forgotPassword} component={FogotPassWord} />
			<Route
				path={DEFINELINK.home}
				component={HomePage}
				// render={() => {
				// 	return localStorage.getItem('YL-user') ? <HomePage /> : <Redirect to="/login" />;
				// }}
			/>
			<Route component={NotFound} />
		</Switch>
	);
}