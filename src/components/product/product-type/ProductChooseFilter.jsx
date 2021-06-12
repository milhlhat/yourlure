import React, { useEffect, useState } from 'react';
import YLButton from 'components/custom-field/YLButton';
import data from 'assets/dumy-data/data-product';
import { handleChangeCheckbox } from 'utils/input';
import { findByFilter, setFilter } from 'redux/product-action/filter';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getAllCategory, getAllFish } from 'api/product-api';
import { useHistory, useLocation } from 'react-router-dom';
import { filterConfig } from 'constant/filter-setting';

function ProductChooseFilter(props) {
	// const category = { data: data.category() };
	// const fish = { data: data.fish() };
	const productFilter = useSelector((state) => state.productFilter.filter);

	const [fish, setFish] = useState({ data: [], loading: true, error: false });
	const [category, setCategory] = useState({ data: [], loading: true, error: false });

	const location = useLocation();
	const dispatch = useDispatch();
	let history = useHistory();

	const [selectCate, setSelectCate] = useState(category.data);
	const [selectFish, setSelectFish] = useState(fish.data);
	const [isCustom, setIsCustom] = useState(location.pathname === '/product/search' ? productFilter.custom : false);

	useEffect(() => {
		if (location.pathname !== '/product/search') {
			const action = setFilter({ custom: false, listFishId: [], listCateId: [] });
			dispatch(action);
		}
		const fetchAllFish = async () => {
			try {
				const response = await getAllFish();
				if (response.error) {
					console.log(response.error);
					let i = { ...fish, loading: false, error: true };
					setFish(i);
				} else {
					let i = { ...fish, data: response, loading: false, error: false };
					setFish(i);
					setSelectFish(response);
				}
			} catch (e) {
				let i = { ...fish, loading: false, error: true };
				setFish(i);
				console.log('fail to fetch  ');
			}
		};
		const fetchAllCategory = async () => {
			try {
				const response = await getAllCategory();
				if (response.error) {
					console.log(response.error);
					let i = { ...category, loading: false, error: true };
					setCategory(i);
				} else {
					let i = { ...category, data: response, loading: false, error: false };
					setCategory(i);
					setSelectCate(response);
				}
			} catch (e) {
				let i = { ...category, loading: false, error: true };
				setCategory(i);
				console.log('fail to fetch  ');
			}
		};
		fetchAllCategory();
		fetchAllFish();
	}, []);

	function goToSearchPage() {
		history.push({
			pathname: '/product/search',

			state: { detail: 'some_value' },
		});
	}
	function getCheckedByList(list, id) {
		if (list) {
			for (let i = 0; i < list.length; i++) {
				let item = list[i];
				if (item === id) {
					return true;
				}
			}
			return false;
		} else {
			return false;
		}
	}
	function getListCateChecked(list) {
		let l = [];
		for (let i = 0; i < list.length; i++) {
			let item = list[i];
			if (item.checked) {
				l.push(item.categoryID);
			}
		}
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
		return l;
	}
	function handleCheckIsCustom(e) {
		let value = e.target.checked;
		setIsCustom(value);
	}
	function handleSubmitFilter(e) {
		e.preventDefault();
		let listCateId = getListCateChecked(selectCate);
		let listFishId = getListFishChecked(selectFish);

		const action = setFilter({
			listCateId: listCateId,
			listFishId: listFishId,
			page: filterConfig.PAGE_NUMBER_DEFAULT,
			limit: filterConfig.LIMIT_DATA_PER_PAGE,
			custom: isCustom,
			isAsc: false,
		});
		dispatch(action);
		goToSearchPage();
		const filterAction = findByFilter(productFilter);
		dispatch(filterAction);
	}
	return (
		<div className="product-choose-filter">
			<div className="head-text">Danh mục</div>
			<form onSubmit={handleSubmitFilter}>
				<div className="form-filter p-2 mt-2">
					<span className="title">Tùy biến</span>

					<div className="form-check ">
						<input
							className="form-check-input pointer"
							type="checkbox"
							id={`flexCheckCheckedCustom`}
							onClick={(e) => handleCheckIsCustom(e)}
							defaultChecked={isCustom}
						/>
						<label className="form-check-label pointer" htmlFor={`flexCheckCheckedCustom`}>
							Loại tùy biến
						</label>
					</div>

					<span className="title">Loại mồi</span>
					{category &&
						category.data.map((item, i) => (
							<div className="form-check " key={i}>
								<input
									className="form-check-input pointer"
									type="checkbox"
									id={`cateChecked${i}`}
									name={item.categoryID}
									onClick={(e) => handleChangeCheckbox(e, selectCate, setSelectCate)}
									defaultChecked={getCheckedByList(productFilter.listCateId, item.categoryID)}
								/>
								<label className="form-check-label pointer" htmlFor={`cateChecked${i}`}>
									{item.categoryName}
								</label>
							</div>
						))}
					<span className="title">Loại cá</span>
					{fish &&
						fish.data.map((item, i) => (
							<div className="form-check " key={i}>
								<input
									className="form-check-input pointer"
									type="checkbox"
									id={`fishChecked${i}`}
									name={item.fishID}
									onClick={(e) => handleChangeCheckbox(e, selectFish, setSelectFish)}
									defaultChecked={getCheckedByList(productFilter.listFishId, item.fishID)}
								/>
								<label className="form-check-label pointer " htmlFor={`fishChecked${i}`}>
									{item.fishName}
								</label>
							</div>
						))}
					<div className="button-submit m-2 d-flex justify-content-center">
						<YLButton type="submit" variant="primary" value="Tìm kiếm" />
					</div>
				</div>
			</form>
		</div>
	);
}

export default ProductChooseFilter;
