import InputField from 'components/custom-field/YLInput.jsx';
import YLButton from 'components/custom-field/YLButton.jsx';
import React from 'react';
import { useHistory } from 'react-router';
import * as Yup from 'yup';
import { FastField, Form, Formik } from 'formik';
import { getUser, setUser } from 'redux/action/user-slice';
import { useDispatch } from 'react-redux';

import { unwrapResult } from '@reduxjs/toolkit';

function Login(props) {
	const history = useHistory();
	//redux

	const dispatch = useDispatch();

	const login = async (values) => {
		// const action = setUser(values);

		// dispatch(action);
		// history.replace("/home");
		try {
			const actionResult = await dispatch(getUser(values));
			const currentUser = unwrapResult(actionResult);
			console.log('currentUser', currentUser);
		} catch (e) {
			console.log('failed to login', e);
		}
	};

	//constructor value for formik field
	const initialValues = {
		account: '',
		password: '',
	};
	//check validate for formik field
	const validationSchema = Yup.object().shape({
		account: Yup.string().required('This field is required.'),
		password: Yup.string().required('This field is required.'),
	});

	return (
		<div>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					login(values);
				}}
			>
				{(formikProps) => {
					const { values, errors, touched } = formikProps;
					// console.log({ values, errors, touched });
					return (
						<Form>
							<FastField
								name="account"
								component={InputField}
								label="Số điện thoại"
								placeholder="Nhập số điện thoại"
							></FastField>
							<FastField
								name="password"
								type="password"
								component={InputField}
								label="Mật khẩu"
								placeholder="Nhập mật khẩu"
							></FastField>
							<YLButton type="submit" variant="primary" value="Login"></YLButton>
						</Form>
					);
				}}
			</Formik>
			<YLButton variant="warning" value="Đăng ký"/>
		</div>
	);
}

export default Login;
