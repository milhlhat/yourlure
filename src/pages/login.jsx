import React from 'react';
import { useHistory } from 'react-router';

function Login(props) {
	const history = useHistory();
	const login = () => {
		localStorage.setItem('accessToken', true);
		history.replace('/home');
	};
	return (
		<div>
			<button onClick={login}>Login</button>
		</div>
	);
}

export default Login;
