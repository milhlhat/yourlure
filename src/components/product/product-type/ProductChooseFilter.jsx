import React, { useState } from 'react';
import YLButton from 'components/custom-field/YLButton';
import { FastField, Field, Form, Formik } from 'formik';
import data from 'assets/dumy-data/data-product';
import YLCheckBoxField from 'components/custom-field/YLCheckBoxField.jsx';
import { handleChangeCheckbox } from 'utils/input';
import { findByFilter } from 'redux/product-action/filter';
import { useDispatch } from 'react-redux';
ProductChooseFilter.propTypes = {};

function ProductChooseFilter(props) {
	const category = { data: data.category() };
	const fish = { data: data.fish() };
	// const category = props.cateAll;
	// const fish = props.fishAll;
	const LIMIT_DATA_PER_PAGE = 15;
	const dispatch = useDispatch();
	const [selectCate, setSelectCate] = useState(category);
	const [selectFish, setSelectFish] = useState(fish);
	const [isCustom, setIsCustom] = useState(false);
	const [page, setPage] = useState(1);

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
	function handleSubmitFilter(e) {
		e.preventDefault();
		let listCateId = getListCateChecked(selectCate).toString();
		let listFishId = getListFishChecked(selectFish).toString();
		console.log(listCateId);
		const action = findByFilter({
			listCateId: listCateId,
			listFishId: listFishId,
			page: page,
			limit: LIMIT_DATA_PER_PAGE,
			custom: isCustom,
		});
		dispatch(action);
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
							onClick={() => setIsCustom(!isCustom)}
						/>
						<label className="form-check-label pointer" htmlFor={`flexCheckCheckedCustom`}>
							Loại tùy biến
						</label>
					</div>
					{/* {props.cateAll &&
						props.cateAll.map((item, i) => ( */}
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
