import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import reportWebVitals from './reportWebVitals';
import AppRouter from 'routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/scss/map.scss';
import store from 'redux/store';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<AppRouter />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
