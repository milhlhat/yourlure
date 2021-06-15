import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link } from 'react-router-dom';
import 'assets/scss/scss-components/custom-field/YLBreadcrumbs.scss';
function handleClick(event) {
	// event.preventDefault();
	// console.info('You clicked a breadcrumb.');
}
function YLBreadCrumbs(props) {
	return (
		<Breadcrumbs maxItems={3} aria-label="breadcrumb" className="yl-breadcrumb ">
			<Link className="link" to="#">
				TRANG CHỦ
			</Link>
			<Link className="link" to="#">Catalog</Link>
			<Link  className="link"to="#">Accessories</Link>
			<Link className="link" to="/home">
				New Collection
			</Link>
		</Breadcrumbs>
	);
}

export default YLBreadCrumbs;
