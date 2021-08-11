import React, { useEffect } from "react";
import "assets/scss/scss-pages/search.scss";
import ProductChooseFilter from "components/product/product-type/ProductChooseFilter";
import Sort from "components/orther/Sort";
import ProductShow from "components/product/product-type/ProductShow";
import { useDispatch, useSelector } from "react-redux";
import ProductBanner from "components/product/ProductBanner";
import YLBreadCrumbs from "components/custom-field/YLBreadCrumbs";
import { fetchFilter } from "utils/product";

function SearchProduct(props) {
	const products = useSelector((state) => state.productFilter.data);
	const filter = useSelector((state) => state.productFilter.filter);
	const dispatch = useDispatch();
	useEffect(() => {
		fetchFilter(dispatch, filter);
	}, [filter]);
	return (
		<div className="container search-type mt-2">
			<ProductBanner title="Sản phẩm" />
			<YLBreadCrumbs children={[{ name: 'Tìm kiếm' }]} />

			<div className="row">
				<div className="col-md-3 col-sm-12">
					<ProductChooseFilter />
				</div>
				<div className="col-md-9 col-sm-12">
					<Sort />
					<ProductShow products={products} />
				</div>
			</div>
		</div>
	);
}

export default SearchProduct;
