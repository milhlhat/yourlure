import React, { useEffect, useState } from 'react';
import CardProduct from 'components/card/card-product.jsx';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from 'react-js-pagination';
import 'assets/scss/scss-components/product/product-type.scss';
import { filterConfig } from 'constant/filter-setting';
import { findByFilter } from 'redux/product-action/filter';
import Loading from 'components/loading';
import ErrorLoad from 'components/ErrorLoad';
function ProductShow(props) {
	const products = props.products;
	const productFilter = useSelector((state) => state.productFilter.filter);
	const isLoading = useSelector((state) => state.productFilter.loading);
	const success = useSelector((state) => state.productFilter.success);
	const dispatch = useDispatch();
	const [activePage, setActivePage] = useState(1);

	function handlePageChange(newPage) {
		setActivePage(newPage);
		const filterAction = findByFilter({ ...productFilter, page: newPage - 1 });
		dispatch(filterAction);
	}
	if (isLoading) {
		return <Loading />;
	} else if (!success) {
		return <ErrorLoad />;
	} else
		return (
			<div className="product-show mt-3 bg-white bg-shadow">
				<div className="product-list">
					{products.productOutList.length <= 0 && <p>Không có sản phẩm </p>}
					{products.productOutList &&
						products.productOutList.map((item, i) => <CardProduct product={item} key={`card-prod-${i}`} />)}
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
