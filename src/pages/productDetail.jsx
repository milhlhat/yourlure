import React, { useEffect, useState } from 'react';
import CardProduct from 'components/card/card-product';
import ProductImage from 'components/product/product-detail/product-media';
import ProductAction from 'components/product/product-detail/product-action';
import ProductAPI from 'api/product-api';
ProductDetail.propTypes = {};

 
function ProductDetail(props) {
	const [product, setProduct] = useState({
		data: null,
		isFetched: false,
		failFetch: false,
	});
	const fetchProduct = async () => {
		try {
			const response = await ProductAPI.getProductByID(props.match.params.id);
			if (response.error) {
				setProduct({ ...product, failFetch: true });
				throw new Error(response.error);
			} else {
				setProduct({
					data: response,
					isFetched: true,
					failFetch: false,
				});
			}
		} catch (error) {
			console.log('fail to fetch data');
		}
	};

	useEffect(() => {
		fetchProduct();
	}, []);
	return (
		<div className="">
			<div className="d-flex m-2 row">
				<div className="bg-white col-md-6 col-sm-12">
					<ProductImage product={product.data}  />
				</div>
				<div className="bg-white col-md-6 col-sm-12">
					<ProductAction product={product.data} />
				</div>
			</div>

			<div className="bg-white d-flex m-2">
				{/* {productByCate.map((value, index) => (
          <CardProduct product={value} key={index} />
        ))} */}
			</div>
		</div>
	);
}

export default ProductDetail;
