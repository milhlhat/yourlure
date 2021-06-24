import React, { useEffect, useState } from 'react';
import ProductChooseFilter from 'components/product/product-type/ProductChooseFilter.jsx';
import 'assets/scss/scss-components/product/product-type.scss';
import ProductByCate from 'components/product/product-type/ProductByCate';
import { getBestSellerCategory } from 'api/category-api';
import ProductBanner from 'components/product/ProductBanner';
import YLBreadCrumbs from 'components/custom-field/YLBreadCrumbs';
Product.propTypes = {};

function Product(props) {
	const [bestCate, setBestCate] = useState({ data: [], loading: true, error: false });

	useEffect(() => {
		const fetchBestSellerCategory = async () => {
			try {
				const response = await getBestSellerCategory();
				if (response.error) {
					console.log(response.error);
					let i = { ...bestCate, loading: false, error: true };
					setBestCate(i);
				} else {
					let i = { ...bestCate, data: response, loading: false, error: false };
					setBestCate(i);
				}
			} catch (error) {
				let i = { ...bestCate, loading: false, error: true };
				setBestCate(i);
				console.log('Error', error.message);
			}
		};

		fetchBestSellerCategory();
	}, []);

	return (
		<div className="container product-type mt-2">
			<ProductBanner title="Danh mục sản phẩm" />
			<YLBreadCrumbs children={[{ name: 'Sản phẩm' }]} />
			<div className="row">
				<div className="col-md-3 col-sm-12">
					<ProductChooseFilter />
				</div>
				<div className="col-md-9 col-sm-12">
					<ProductByCate bestCate={bestCate} />
				</div>
			</div>
		</div>
	);
}

export default Product;