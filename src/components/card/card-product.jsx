import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import 'assets/scss/scss-components/card-product.scss';
import { useHistory } from 'react-router';
CardProduct.propTypes = {};

function CardProduct(props) {
	const {product} =props;
	const history = useHistory();
    const handleClick = (value) =>{
		history.push('/product/detail/1');
    }
	useEffect(()=>{
		// console.log(product==null);
	},[])
	return (
		<div className="card-product align-items-center m-2 " onClick={handleClick}>
			<div className="thumb">
				<img
					className="card-img-top"
					src={'https://docautuankiet.com/uploads/products/05022020033936/moi-gia-orochi_05022020033936.jpg'}
				/>
			</div>

			<div className="d-flex flex-column card-info w-100 thumb align-items-center ">
				<span className="text-color text-small">Brand</span>
				<span className="mt-2">{product==null?"product null":product.name}</span>
				<span className="text-color">150,000đ</span>
			</div>
		</div>
	);
}

export default CardProduct;
