import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import YLSelect from 'components/custom-field/YLSelect';
import { FastField, Form, Formik } from 'formik';

SelectLocation.propTypes = {};

function SelectLocation(props) {
	const [provinces, setProvinces] = useState([]);
	const [districts, setDistricts] = useState([]);
	const [wards, setWards] = useState([]);
	let listProvinces = [];
	console.log();
	useEffect(async () => {
	 
	}, []);

	const initialValues = {
		provinceId: 1,
		districtId: '',
		wardId: '',
	};
	function convertOption(list) {
		let listTemp = [];
		for (let i = 0; i < list.length; i++) {
			listTemp[i] = { value: list[i].code, label: list[i].name };
		}
		return listTemp;
	}
	return (
		<div>
			<Formik
				initialValues={initialValues}
				// validationSchema={validationSchema}
				// onSubmit={(values) => {
				// 	login(values);
				// }}
			>
				{(formikProps) => {
					const { values, errors, touched } = formikProps;
					// console.log({ values, errors, touched });
					return (
						<Form>
							 
								<FastField
                                value={values.provinceId}
									name="provinceId"
									component={YLSelect}
									label="Tỉnh/ Thành phố"
									options={provinces}
								></FastField>
						 
						</Form>
					);
				}}
			</Formik>
		</div>
	);
}

export default SelectLocation;
