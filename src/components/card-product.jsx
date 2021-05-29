import React from 'react';
import PropTypes from 'prop-types';
import 'assets/scss/scss-components/card-product.scss';
CartProduct.propTypes = {};

function CartProduct(props) {
	return (
		<div className="card-product align-items-center p-3 mx-1 ">
			<div className="thumb">
				<img
					className="card-img-top"
					src={'https://docautuankiet.com/uploads/products/05022020033936/moi-gia-orochi_05022020033936.jpg'}
				/>
			</div>

			<div className="d-flex flex-column card-info w-100 thumb align-items-center ">
				<span className="text-color text-small">Brand</span>
				<span className="mt-2">MỒI VIẾT HOA</span>
				<span className="text-color">150,000đ</span>
			</div>
		</div>
	);
}

export default CartProduct;
