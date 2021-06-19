import InputField from 'components/custom-field/YLInput.jsx';
import YLButton from 'components/custom-field/YLButton.jsx';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import * as Yup from 'yup';
import { FastField, Form, Formik } from 'formik';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import 'assets/scss/scss-pages/login.scss';

import { unwrapResult } from '@reduxjs/toolkit';
import { login } from 'redux/user-action/fetch-login';
import UserApi from 'api/user-api';

function Login(props) {
	const history = useHistory();
	//redux
	const userLogin = useSelector((state) => state.userLogin);
	const dispatch = useDispatch();
	const INVALID_PHONE = 400;
	const INVALID_PASSWORD = 422;
	const FORBIDDEN = 403;
	const [open, setOpen] = useState(false);
	async function getLogin(values) {
		// const action = setUser(values);

		// dispatch(action);
		// history.replace("/home");

		try {
			dispatch(login(values));
			// const currentUser = unwrapResult(actionResult);
		} catch (error) {
			console.log(error);
		}
	}

	//constructor value for formik field
	const initialValues = {
		phone: '',
		password: '',
	};
	//check validate for formik field
	const validationSchema = Yup.object().shape({
		phone: Yup.string().required('This field is required.'),
		password: Yup.string().required('This field is required.'),
	});
	function checkLoginFail() {
		if (
			!userLogin.success &&
			(userLogin.status == INVALID_PHONE || userLogin.status == INVALID_PASSWORD || userLogin.status == FORBIDDEN)
		) {
			return true;
		} else return false;
	}
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};
	function Alert(props) {
		return <MuiAlert elevation={6} variant="filled" {...props} />;
	}

	useEffect(() => {
		setOpen(checkLoginFail());
		return setOpen(checkLoginFail());
	}, [userLogin.status]);
	return (
		<div className="login">
			<div className="login-big-image">
				<img src="https://i.pinimg.com/564x/d5/22/3f/d5223f9a7ffd85e69e8176030c745892.jpg" alt="" />
			</div>
			<div className="login-form">
				<Snackbar
					open={open}
					autoHideDuration={2000}
					onClose={handleClose}
					anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				>
					<Alert onClose={handleClose} severity="error">
						Sai số điện thoại hoặc mật khẩu.
					</Alert>
				</Snackbar>
				<div className="login-form-input">
					<h1>Đăng Nhập</h1>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={(values) => {
							getLogin(values);
						}}
					>
						{(formikProps) => {
							const { values, errors, touched } = formikProps;
							// console.log({ values, errors, touched });
							return (
								<Form>
									<FastField
										name="phone"
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
									<div className="mt-2">
										<YLButton type="submit" variant="primary" value="Login" width={100}></YLButton>
									</div>
									<div className="mt-2">
										<YLButton
											variant="warning"
											onClick={() => history.push('/register')}
											value="Đăng ký"
											width={100}
										/>
									</div>
								</Form>
							);
						}}
					</Formik>
				</div>
				<div className="mt-2">
					<YLButton
						variant="link"
						onClick={() => history.push('/fogot-password')}
						value="Quên mật khẩu?"
						width={100}
					/>
				</div>
			</div>
		</div>
	);
}

export default Login;
