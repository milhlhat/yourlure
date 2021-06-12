import React, { useEffect, useState } from 'react';

import CardProduct from 'components/card/card-product.jsx';
// import Paging from "./Paging";
import { useDispatch, useSelector } from 'react-redux';
import Pagination from 'react-js-pagination';
import 'assets/scss/scss-components/product/product-type.scss';
import { filterConfig } from 'constant/filter-setting';
import { findByFilter } from 'redux/product-action/filter';
function ProductShow(props) {
	const products = useSelector((state) => state.productFilter.data);
	const productFilter = useSelector((state) => state.productFilter.filter);
const dispatch = useDispatch();
	const [activePage, setActivePage] = useState(1);

	function handlePageChange(newPage) {
		setActivePage(newPage);
		const filterAction = findByFilter({ ...productFilter, page: newPage - 1 });
		dispatch(filterAction);
	}

	useEffect(() => {}, []);
	return (
		<div className="product-show mt-3 bg-white">
			<div className="product-list">
				{products.productOutList && products.productOutList.map((item, i) => <CardProduct product={item} />)}
			</div>
			<div className="d-flex flex-end">
				{products.totalPage > 1 && (
					<Pagination
						itemClass="page-item"
						linkClass="page-link"
						activePage={activePage}
						itemsCountPerPage={filterConfig.LIMIT_DATA_PER_PAGE}
						totalItemsCount={products.totalProduct}
						pageRangeDisplayed={filterConfig.PAGE_RANGE_DISPLAYED}
						onChange={handlePageChange}
					/>
				)}
			</div>
		</div>
	);
}

export default ProductShow;
