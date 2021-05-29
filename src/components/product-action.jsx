import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

ProductAction.propTypes = {};

function ProductAction(props) {
	return (
		<div className="product-action">
			<span className="title">Lorem ipsum dolor sit amet, consectetur</span>
			<div className="">190,000</div>
			<div className="tab">
				<div className="">
					<span>MUA HÀNG</span>
				</div>
				<div className="detail-tab">
					<a href="/#footer">CHI TIẾT</a>
				</div>
				<div className="">
					<Link to="#">THÔNG SỐ</Link>
				</div>
			</div>
		</div>
	);
}

export default ProductAction;
