import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import 'assets/scss/scss-components/card-product.scss';
import { useHistory } from 'react-router';
CardProduct.propTypes = {};

function CardProduct(props) {
	const {product} =props;
	const history = useHistory();
    const handleClick = (id) =>{
		history.push(`/product/detail/${id}`);
    }
	useEffect(()=>{
		// console.log(product==null);
	},[])
	return (
		<div className="card-product align-items-center m-2 " onClick={()=>handleClick(product.productID)}>
			<div className="thumb">
				<img
					className="card-img-top"
					src={'https://docautuankiet.com/uploads/products/05022020033936/moi-gia-orochi_05022020033936.jpg'}
				/>
			</div>

			<div className="d-flex flex-column card-info w-100 thumb text-center align-items-center ">
				<span className="text-color text-small">{product==null?"brand null":product.brand}</span>
				<span className="mt-2">{product==null?"product null":product.productName}</span>
				<span className="text-color">
					{product==null?"price null":Number(product.defaultPrice).toLocaleString(
                      undefined,
                      {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      }
                    )}đ
					
					</span>
			</div>
		</div>
	);
}

export default CardProduct;
