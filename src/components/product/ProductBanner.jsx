import React from 'react';

function ProductBanner(props) {
	return (
		<div className="p-5">
			<h1>{props.title}</h1>
		</div>
	);
}

export default ProductBanner;