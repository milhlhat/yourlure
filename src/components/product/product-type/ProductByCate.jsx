import React, { useEffect } from 'react';

import CardProduct from 'components/card/card-product';
import 'assets/scss/scss-components/product/product-by-cate.scss';
import YLButton from 'components/custom-field/YLButton';
import Loading from 'components/loading';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilter, saveFilter } from 'utils/product';
import { useHistory } from 'react-router-dom';
import ErrorLoad from 'components/ErrorLoad';
ProductByCate.propTypes = {};

function ProductByCate(props) {
	const cates = props.bestCate;
	const productFilter = useSelector((state) => state.productFilter.filter);
	const history = useHistory();
	const dispatch = useDispatch();
	if (cates.error) {
		return <ErrorLoad />;
	}
	if (cates.loading) {
		return <Loading />;
	}
	function viewMoreCategory(id) {
		let listCategorySelect = JSON.parse(JSON.stringify(productFilter.listCateId));
		listCategorySelect.push(id);
		listCategorySelect = listCategorySelect.filter(function (item, pos) {
			return listCategorySelect.indexOf(item) == pos;
		});

		history.push('/product/search');
		saveFilter(dispatch, { ...productFilter, listCateId: listCategorySelect });
		fetchFilter(dispatch, { ...productFilter, listCateId: listCategorySelect });
	}
	return (
		<div className="product-by-cate">
			{cates &&
				cates.data.map((cate, index) => (
					<div key={index} className=" bg-white mb-5 p-2">
						<div className="d-flex justify-content-between align-items-center flex-wrap px-2">
							<span className=" title">{cate.categoryName}</span>

							<div>
								<YLButton variant="link" onClick={() => viewMoreCategory(cate.categoryID)}>
									Xem thêm <i class="fa fa-angle-double-right"></i>
								</YLButton>
							</div>
						</div>
						<div className="flex-card-row">
							
						<div className="product-card-row mx-xl-5">
							{cate.productCollection.map((product, indexx) => (
								<React.Fragment key={indexx}>{<CardProduct product={product} />}</React.Fragment>
							))}
						</div>
						</div>
					</div>
				))}
		</div>
	);
}

export default ProductByCate;
