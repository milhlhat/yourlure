import React from 'react';
import { filterConfig } from 'constant/filter-setting';
import { useDispatch, useSelector } from 'react-redux';
import { findByFilter, setFilter } from 'redux/product-action/filter';
function Sort(props) {
	const products = useSelector((state) => state.productFilter.data.productOutList);
	const sortBy = useSelector((state) => state.productFilter.filter.sortBy);
	const productFilter = useSelector((state) => state.productFilter.filter);

	const dispatch = useDispatch();
	function getSortSelectedByList(list, value) {
		if (list) {
			for (let i = 0; i < list.length; i++) {
				let item = list[i];
				if (item.value === value) {
					return { sortBy: item.sortBy, isAsc: item.isAsc };
				}
			}
			return {};
		} else {
			return {};
		}
	}
	function handleSelectSort(e) {
		const value = getSortSelectedByList(filterConfig.SORT_OPTIONS, e.target.value);
		const action = setFilter({ ...value });
		dispatch(action);
		const filterAction = findByFilter({ ...productFilter, ...value });
		dispatch(filterAction);
	}

	return (
		<div className="bg-white d-flex align-items-center p-2">
			<div className="d-flex align-items-center ">
				<span className="text-nowrap ">Sắp xếp theo: </span>

				<select className="form-select select-sort pointer border-0 ms-2" onChange={(e) => handleSelectSort(e)}>
					{filterConfig.SORT_OPTIONS.map((item, i) => (
						<option
							value={item.value}
							key={`sort-${i}`}
							className="pointer"
							selected={item.sortBy === sortBy}
						>
							{item.display}
						</option>
					))}
				</select>
			</div>
			<span className="ms-auto">{`${products ? products.length : 0} sản phẩm`}</span>
		</div>
	);
}

export default Sort;
