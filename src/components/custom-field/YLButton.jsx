import React from 'react';
import PropTypes from 'prop-types';
import 'assets/scss/scss-components/custom-field/YLButton.scss';

import { Link, BrowserRouter as Router } from 'react-router-dom';
YLButton.propTypes = {};

function YLButton(props) {
	const { varian, value, onClick, disabled, type } = props;
	return (
		<Router>
			<div className="button" onClick={onClick} disabled={disabled}>
				{type ? (
					<button className={'transButton ' + varian} type={type}>
						{value}
					</button>
				) : (
					<Link to="#" className={'transButton ' + varian}>
						{value}
					</Link>
				)}
			</div>
		</Router>
	);
}

export default YLButton;
