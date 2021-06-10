import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ProductChooseFilter from 'components/product/product-type/ProductChooseFilter.jsx';
import ProductShow from 'components/product/product-type/ProductShow';
import 'assets/scss/scss-components/product/product-type.scss';
import Sort from 'components/orther/Sort';
import SearchProduct from './Search';
import ProductByCate from 'components/product/product-type/ProductByCate';
import { getAllCategory } from 'api/product-api';

Product.propTypes = {};

function Product(props) {
	const [cateAll, setCateAll] = useState();
	const [fishAll, setFishAll] = useState();
	useEffect(() => {
		const fetchAllCategory = async () => {
			try {
				const response = await getAllCategory();
				if (response.error) {
					console.log(response);
				} else {
					setCateAll(response);
				}
			} catch (e) {}
		};
		fetchAllCategory();
	}, []);

	return (
		<div className="container product-type mt-2">
			<h1>Sản phẩm</h1>
			<div className="row">
				<div className="col-md-3 col-sm-12">
					<ProductChooseFilter cateAll={cateAll} fishAll={fishAll} />
				</div>
				<div className="col-md-9 col-sm-12">
					{/* <ProductShow/> */}
					<ProductByCate />
				</div>
			</div>
		</div>
	);
}

export default Product;
