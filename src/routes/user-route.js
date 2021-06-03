import React from 'react';
import PropTypes from 'prop-types';
 
import { Route, Switch } from 'react-router-dom';
UserRoute.propTypes = {
    
};
const Login = React.lazy(() => import('pages/login'));
function UserRoute(props) {
    return (
        <Switch>
       	<Route exact path="/user/login" component={Login} />
    </Switch>
    );
}

export default UserRoute;