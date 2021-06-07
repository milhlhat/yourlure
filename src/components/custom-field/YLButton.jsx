import React from 'react';
import PropTypes from 'prop-types';
import 'assets/scss/scss-components/custom-field/YLButton.scss';

import { Link, BrowserRouter as Router } from 'react-router-dom';
YLButton.propTypes = {};

function YLButton(props) {
	const { variant, value, onClick, disabled, type, to } = props;
	return (
		<Router>
			<div className="yl-button" onClick={onClick}>
				{type ? (
					<button
						className={`button button_${variant} ${disabled ? 'disabled' : ''} `}
						type={type}
						disabled={disabled}
					>
						{value}
					</button>
				) : (
					<Link
						to={disabled ? to : '#'}
						className={`button button_${variant} ${disabled ? 'disabled' : ''}`}
						onClick={onClick}
					>
						{value}
					</Link>
				)}
			</div>
		</Router>
	);
}

export default YLButton;
