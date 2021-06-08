import React, { useState } from 'react';

import 'assets/scss/scss-components/product/product-detail.scss';
import { useHistory } from 'react-router';

function ProductImage(props) {
	let { data } = props;
	const isCustome=true;
	const [selectImg, setSelectImg] = useState(0);
	const history = useHistory();
	 
	function goToCustomize(){
		history.push('/product/customize/2')
	}
	return (
		<div className="product-media d-flex flex-column m-4">
			<div className="big-image object-fit">
				<button className="big-image-edit bg-white " onClick={goToCustomize} hidden={!isCustome}>edit</button>
			<img src={data[selectImg]} height={350} className="" />
			</div>
			<div className="gallery mt-1">
				{data &&
					data.map((item, i) => (
						<div
							className={`me-1 small-images ' ${selectImg == i ? 'border-gallery' : ''} `}
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
