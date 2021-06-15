import React, { useState } from 'react';

import 'assets/scss/scss-components/product/product-detail.scss';
import { useHistory } from 'react-router';

function ProductImage(props) {
	let { product } = props;
	const isCustome = true;
	const [selectImg, setSelectImg] = useState(0);
	const history = useHistory();

	function goToCustomize() {
		history.push(`/product/customize/${product.productId}`);
	}
	return (
		<div className="product-media d-flex flex-column m-4">
			{console.log(product ? product.imageCollection : 'null')}
			<div className="big-image object-fit">
				<button
					className={`big-image-edit ${product ? (product.customizable ? '' : 'd-none') : ''}`}
					onClick={goToCustomize}
					hidden={!isCustome}
				>
					<i class="fa fa-pencil"></i>
				</button>
				<img
					src={product ? product.imageCollection[selectImg].linkImage : ''}
					height={350}
					className=""
					alt="Ảnh sản phẩm"
				/>
			</div>
			<div className="gallery mt-1">
				{product &&
					product.imageCollection.map((item, i) => (
						<div
							className={`me-1 small-images ' ${selectImg == i ? 'border-gallery' : ''} `}
							key={i}
							onClick={() => setSelectImg(i)}
						>
							<img width={60} src={item.linkImage} />
						</div>
					))}
			</div>
		</div>
	);
}

export default ProductImage;
