import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';
import 'assets/scss/scss-components/header.scss';
import { useDispatch, useSelector } from 'react-redux';
import { findByFilter, setFilter } from 'redux/product-action/fetch-filter';
import { filterConfig } from 'constant/filter-setting';
import DEFINELINK from 'routes/define-link';

function Header(props) {
	const productFilter = useSelector((state) => state.productFilter.filter);
	const dispatch = useDispatch();
	const history = useHistory();
	const [isOpen, setIsOpen] = useState(false);
	const [isClose, setIsClose] = useState(true);
	const [keyword, setKeyword] = useState(productFilter.keyword);
	const location = useLocation();
	const toggle = () => {
		setIsOpen(!isClose);
	};
	let path = location.pathname;

	///
	function useOutsideAlerter(ref) {
		useEffect(() => {
			/**
			 * Alert if clicked on outside of element
			 */
			function handleClickOutside(event) {
				if (ref.current && !ref.current.contains(event.target)) {
					if (isOpen) {
					}
				}
				if (ref.current && !ref.current.contains(event.target)) {
					setIsClose(!isClose);
					if (!isClose) {
						setIsOpen(false);
					}
				}
			}

			// Bind the event listener
			document.addEventListener('mouseup', handleClickOutside);
			return () => {
				// Unbind the event listener on clean up
				document.removeEventListener('mouseup', handleClickOutside);
			};
		}, [ref, isClose]);
	}

	const wrapperRef = useRef(null);
	useOutsideAlerter(wrapperRef);

	useEffect(() => {
		if (path !== '/product/search') {
			const action = setFilter({
				listCateId: [],
				listFishId: [],
				page: filterConfig.PAGE_NUMBER_DEFAULT,
				limit: filterConfig.LIMIT_DATA_PER_PAGE,
				custom: false,
				isAsc: false,
				sortBy: 'sumQuantity',
				keyword: '',
			});
			dispatch(action);
		}
	}, [path]);
	function goToSearchPage() {
		history.push({
			pathname: '/product/search',
		});
	}
	function handleSubmitSearch() {
		const action = setFilter({
			listCateId: [],
			listFishId: [],
			page: filterConfig.PAGE_NUMBER_DEFAULT,
			limit: filterConfig.LIMIT_DATA_PER_PAGE,
			custom: false,
			isAsc: false,
			sortBy: 'sumQuantity',
			keyword: keyword,
		});
		dispatch(action);
		goToSearchPage();
	}
	function onChangeTextSearch(e) {
		setKeyword(e.target.value);
		if (e.key === 'Enter') {
			handleSubmitSearch();
		}
	}
	return (
		<div className="bg-white bg-shadow">
			<div className="container">
				<Navbar light expand="md" className="p-2 flex-end">
					<NavbarBrand className="me-auto" href="/">
						LOGO
					</NavbarBrand>
					<div ref={wrapperRef}>
						<NavbarToggler onClick={toggle} />
					</div>
					<Collapse isOpen={isOpen} navbar>
						<Nav className="me-auto" navbar>
							<div className={'' + path.indexOf('product') > -1 ? 'active' : ''}>
								<Link className="nav-link item-hover" to="/product">
									Sản phẩm
								</Link>
							</div>
							<div>
								<Link className="nav-link item-hover" to="/product/customize/14">
									Tùy biến
								</Link>
							</div>
							<div className={'' + path.indexOf('campaign') > -1 ? 'active' : ''}>
								<Link className="nav-link item-hover" to="/campaign">
									Sự kiện
								</Link>
							</div>
							<div className={'' + path.indexOf('about') > -1 ? 'active' : ''}>
								<Link className="nav-link item-hover" to="/about">
									About
								</Link>
							</div>

							<div className="pt-1" ref={wrapperRef}>
								<NavItem className="d-flex ms-auto search-form px-3 ">
									<input
										type="search"
										className="search "
										placeholder="Tìm kiếm..."
										name="keyword"
										onKeyDown={(e) => onChangeTextSearch(e)}
									/>
									<i className="fad fa-search text-success" onClick={() => handleSubmitSearch()}></i>
								</NavItem>
							</div>
							<NavItem className="header-cart ms-2 ">
								<Link className="nav-link" to={DEFINELINK.cart}>
								<i class="fad fa-shopping-cart"></i>
								</Link>
							</NavItem>
							<NavItem className="header-user ms-2 me-2 ">
								<Link className="nav-link" to={DEFINELINK.customer}>
									<i className="fa fa-user"></i>
								</Link>
							</NavItem>
						</Nav>
					</Collapse>
				</Navbar>
			</div>
		</div>
	);
}

export default Header;
