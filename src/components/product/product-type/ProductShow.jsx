import React, { useEffect, useState } from 'react';

import CardProduct from 'components/card/card-product.jsx';
// import Paging from "./Paging";
import { useSelector } from 'react-redux';
import Pagination from 'react-js-pagination';
import 'assets/scss/scss-components/product/product-type.scss';
function ProductShow(props) {
	const products = useSelector((state) => state.productFilter);
	const [activePage, setActivePage] = useState(1);

	function handlePageChange(newPage) {
		console.log('newPage ', newPage);
	}

	useEffect(() => {
 
	}, [ ]);
	return (
		<div className="product-show mt-3 bg-white">
	 
			<Pagination className="pagination-sm"
       itemClass="page-item"
       linkClass="page-link"
				activePage={activePage}
				itemsCountPerPage={10}
				totalItemsCount={Number(1000)}
				pageRangeDisplayed={3}
				onChange={handlePageChange}
			/>
		</div>
	);
}

export default ProductShow;
