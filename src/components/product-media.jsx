import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Magnifier from 'react-magnifier';
import 'assets/css/pages/product-detail.css';
ProductImage.propTypes = {};

function ProductImage(props) {
	let { data } = props;
	const [selectImg, setSelectImg] = useState(0);
	return (
		<div className=" d-flex flex-column m-4">
			<Magnifier src={data[selectImg]} height={350} width={300} className="object-fit" />

			<div className="gallery mt-1">
				{data &&
					data.map((item, i) => (
						<div
							className={`me-1 ' ${selectImg == i ? 'border-gallery' : ''} `}
							key={i}
							onClick={() => setSelectImg(i)}
						>
							<img width={100} src={item} />
						</div>
					))}
			</div>
		</div>
	);
}

export default ProductImage;
