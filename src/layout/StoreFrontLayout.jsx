import React from 'react';
import Header from 'components/header/Header';
import Footer from 'components/footer/Footer';

function StoreFrontLayout(props) {
	return (
		<>
			<Header />
			<div className="main-container">
				<div className="main">{props.children}</div>
			</div>
			<Footer />
		</>
	);
}

export default StoreFrontLayout;
