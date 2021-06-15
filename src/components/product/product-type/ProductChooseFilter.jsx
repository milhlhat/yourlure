import React, { useEffect, useState } from 'react';
import YLButton from 'components/custom-field/YLButton';
import { getIsCheckedAll, handleChangeCheckbox, handleCheckAllCateOrFish } from 'utils/input';
import { findByFilter, setFilter } from 'redux/product-action/filter';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { filterConfig } from 'constant/filter-setting';
import { fetchCate, fetchFish } from 'redux/product-action/fetch-cate-fish';

function ProductChooseFilter(props) {
	const productFilter = useSelector((state) => state.productFilter.filter);
	const listFishId = useSelector((state) => state.productFilter.filter.listFishId);
	const listCateId = useSelector((state) => state.productFilter.filter.listCateId);
	const custom = useSelector((state) => state.productFilter.filter.custom);

	const cate = useSelector((state) => state.cateFishForFilter.cate);
	const f = useSelector((state) => state.cateFishForFilter.fish);

	const [fish, setFish] = useState([]);
	const [category, setCategory] = useState([]);

	const dispatch = useDispatch();
	let history = useHistory();

	const [isCustom, setIsCustom] = useState(custom);

	useEffect(() => {
		const cateAction = fetchCate();
		const fishAction = fetchFish();
		dispatch(cateAction);
		dispatch(fishAction);
	}, []);
	useEffect(() => {
		mapHistoryCheckToListSelect(listFishId, f, setFish);
		mapHistoryCheckToListSelect(listCateId, cate, setCategory);
	}, [f, cate, listFishId, listCateId]);

	function mapHistoryCheckToListSelect(listCheck, listRaw, setState) {
		let s = JSON.parse(JSON.stringify(listRaw));
		if (s.length > 0 && listCheck.length > 0) {
			for (let i = 0; i < s.length; i++) {
				let item = s[i];
				for (let j = 0; j < listCheck.length; j++) {
					if (item.categoryID === listCheck[j] || item.fishID === listCheck[j]) {
						s[i] = { ...item, checked: true };
					}
				}
			}
		}

		setState(s);
	}

	function goToSearchPage() {
		history.push({
			pathname: '/product/search',
		});
	}

	function getListCateChecked(list) {
		let l = [];
		for (let i = 0; i < list.length; i++) {
			let item = list[i];
			if (item.checked) {
				l.push(item.categoryID);
			}
		}
		console.log(l);
		return l;
	}
	function getListFishChecked(list) {
		let l = [];
		for (let i = 0; i < list.length; i++) {
			let item = list[i];
			if (item.checked) {
				l.push(item.fishID);
			}
		}
		console.log(l);
		return l;
	}
	function handleCheckIsCustom(e) {
		let value = e.target.checked;
		setIsCustom(value);
	}
	function handleSubmitFilter(e) {
		e.preventDefault();
		goToSearchPage();
		let listCateId = getListCateChecked(category);
		let listFishId = getListFishChecked(fish);
		// console.log('submit1', listCateId);
		//call api
		 
		//save filter choosen
		const action = setFilter({
			listCateId: listCateId,
			listFishId: listFishId,
			page: filterConfig.PAGE_NUMBER_DEFAULT,
			limit: filterConfig.LIMIT_DATA_PER_PAGE,
			custom: isCustom,
			isAsc: false,
		});
		dispatch(action);
	}
	return (
		<div className="product-choose-filter bg-shadow">
			<div className="head-text">Danh Mục</div>
			<form onSubmit={handleSubmitFilter}>
				<div className="form-filter p-2 mt-2">
					<span className="title">Loại mồi</span>
					<div className="form-check ">
						<input
							className="form-check-input pointer"
							type="checkbox"
							id={`checkAllCate`}
							onChange={(e) => handleCheckAllCateOrFish(e, category, setCategory)}
							checked={getIsCheckedAll(category)}
						/>
						<label className="form-check-label pointer" htmlFor={`checkAllCate`}>
							Tất cả
						</label>
					</div>
					{category &&
						category.map((item, i) => (
							<div className="form-check " key={`cmap${i}`}>
								<input
									className="form-check-input pointer"
									type="checkbox"
									id={`cateChecked${i}`}
									name={item.categoryID}
									onChange={(e) => handleChangeCheckbox(e, category, setCategory)}
									checked={item.checked ? item.checked : false}
								/>
								<label className="form-check-label pointer" htmlFor={`cateChecked${i}`}>
									{item.categoryName}
								</label>
							</div>
						))}
					<span className="title">Loại cá</span>
					<div className="form-check ">
						<input
							className="form-check-input pointer"
							type="checkbox"
							id={`checkAllFish`}
							onChange={(e) => handleCheckAllCateOrFish(e, fish, setFish)}
							checked={getIsCheckedAll(fish)}
						/>
						<label className="form-check-label pointer" htmlFor={`checkAllFish`}>
							Tất cả
						</label>
					</div>
					{fish &&
						fish.map((item, i) => (
							<div className="form-check " key={`fmap${i}`}>
								<input
									className="form-check-input pointer"
									type="checkbox"
									id={`fishChecked${i}`}
									name={item.fishID}
									onChange={(e) => handleChangeCheckbox(e, fish, setFish)}
									checked={item.checked ? item.checked : false}
								/>
								<label className="form-check-label pointer " htmlFor={`fishChecked${i}`}>
									{item.fishName}
								</label>
							</div>
						))}
					<span className="title">Khác</span>

					<div className="form-check ">
						<input
							className="form-check-input pointer"
							type="checkbox"
							id={`flexCheckCheckedCustom`}
							onChange={(e) => handleCheckIsCustom(e)}
							checked={isCustom}
						/>
						<label className="form-check-label pointer" htmlFor={`flexCheckCheckedCustom`}>
							Tùy biến
						</label>
					</div>
					<div className="button-submit m-2 d-flex justify-content-center">
						<YLButton type="submit" width={100} variant="primary" value="Lọc" />
					</div>
				</div>
			</form>
		</div>
	);
}

export default ProductChooseFilter;
