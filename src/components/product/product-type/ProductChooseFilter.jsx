import React, { useState } from 'react';
import YLButton from 'components/custom-field/YLButton';
import { FastField, Field, Form, Formik } from 'formik';
import data from '../../../assets/dumy-data/data-product';
import YLCheckBoxField from 'components/custom-field/YLCheckBoxField.jsx';
ProductChooseFilter.propTypes = {};

function ProductChooseFilter(props) {
	const [selectCate, setSelectCate] = useState([]);
	const [selectFish, setSelectFish] = useState([]);
	const category = data.category();
	const fish = data.fish();
	function handleChangeCate(e) {
		const name = e.target.name;
		const checked = e.target.checked;
	}
	function handleSubmitFilter(e) {
		e.preventDefault();
		let listFilter = [];
		let formValue = e.target;

		for (let i = 0; i < formValue.length; i++) {
			let field = formValue[i];
			if (field.type === 'checkbox') {
				console.log(field);
			}
		}
	}
	return (
		<div className="product-choose-filter">
			<div className="head-text">Danh mục</div>
			<form onSubmit={handleSubmitFilter}>
				<div className="form-filter p-2 mt-2">
					{/* {props.cateAll &&
						props.cateAll.map((item, i) => ( */}
					{category.map((item, i) => (
						<div class="form-check" key={i}>
							<input
								className="form-check-input"
								type="checkbox"
								id="flexCheckChecked"
								name={item.categoryID}
								onChange={(e) => handleChangeCate(e)}
							/>
							<label className="form-check-label" htmlFor="flexCheckChecked">
								{item.categoryName}
							</label>
						</div>
					))}
					<div className="button-submit m-2">
						<YLButton type="submit" variant="primary" value="Tìm kiếm" />
					</div>
				</div>
			</form>
		</div>
	);
}

export default ProductChooseFilter;
