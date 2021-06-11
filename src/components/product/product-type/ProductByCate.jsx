import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import data from 'assets/dumy-data/data-product.js';
import CartProduct from 'components/cart/CartProduct';
import CardProduct from 'components/card/card-product';
import 'assets/scss/scss-components/product/product-by-cate.scss';
import YLButton from 'components/custom-field/YLButton';
import Loading from 'components/loading';

ProductByCate.propTypes = {};

function ProductByCate(props) {
	// const products = data.products();
	const cates = props.bestCate;

	useEffect(() => {
		// console.log('by bate ');
		// console.log(products);
	}, []);
  if (cates.error) {
    return <p>Server load failed</p>;
  }
  if (cates.loading) {
    return (
      <Loading/>
    );
  }  

	return (
		<div className="bg-white">
			{cates &&
				cates.data.map((cate, index) => (
					<div key={index}>
						<div className="d-flex justify-content-between align-items-center flex-wrap">
							<span className=" title">{cate.categoryName}</span>

							<div className=" ">
								{' '}
								<YLButton variant="link" to={'#'}>
									Xem thêm <i class="fa fa-angle-double-right"></i>
								</YLButton>
							</div>
						</div>
						<div className="product-card-row m-xl-5">
							{cate.productCollection.map((product, indexx) => (
								<React.Fragment key={indexx}>{<CardProduct product={product} />}</React.Fragment>
							))}
						</div>
					</div>
				))}
		</div>
	);
}

export default ProductByCate;
