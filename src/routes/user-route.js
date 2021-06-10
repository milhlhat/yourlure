import React from 'react';
import PropTypes from 'prop-types';
 
import { Route, Switch, useRouteMatch } from 'react-router-dom';
UserRoute.propTypes = {
    
};
const Login = React.lazy(() => import('pages/login'));
const Register = React.lazy(() => import('pages/register'));
function UserRoute(props) {
    const match = useRouteMatch();
    return (
        <Switch>
       	<Route path={`${match.url}/login`} component={Login} />
       	<Route path={`${match.url}/register`} component={Register} />
    </Switch>
    );
}

export default UserRoute;