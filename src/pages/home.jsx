import React, { useEffect, useState } from 'react';
import '../assets/scss/scss-pages/home.scss';
import data from '../assets/dumy-data/data-product.js';
import YLButton from 'components/custom-field/YLButton';
import Carosel from 'components/card/Carosel';
import ProductAPI from 'api/product-api';
import Loading from 'components/loading';
import ErrorLoad from 'components/ErrorLoad';
Home.propTypes = {};

function Home(props) {
	const [productListBestSeller, setProductListBestSeller] = useState({
		list: [],
		isFetched: false,
		failFetch: false,
	});
	const [productListNewest, setProductListNewest] = useState({
		list: [],
		isFetched: false,
		failFetch: false,
	});
	const products = data.products();
	const handleOnPointerOut = () => {
		console.log('on mouse out');
	};

	const fetchProductNewest = async () => {
		try {
			const response = await ProductAPI.getNewList();
			if (response.error) {
				setProductListNewest({ ...productListNewest, failFetch: true });
				throw new Error(response.error);
			} else {
				await setProductListNewest({
					list: response,
					isFetched: true,
					failFetch: false,
				});
			}
		} catch (error) {
			console.log('fail to fetch customer list');
		}
	};
	const fetchProductBestSeller = async () => {
		try {
			const response = await ProductAPI.getBestSeller();
			if (response.error) {
				setProductListBestSeller({ ...productListBestSeller, failFetch: true });
				throw new Error(response.error);
			} else {
				await setProductListBestSeller({
					list: response,
					isFetched: true,
					failFetch: false,
				});
			}
		} catch (error) {
			setProductListBestSeller({
				failFetch: true,
			});
			console.log('fail to fetch customer list');
		}
	};

	useEffect(() => {
		fetchProductNewest();
		fetchProductBestSeller();
		console.log(productListBestSeller.list);

		// setProductListBestSeller({...productListBestSeller,list:products});
		// setProductListNewest({...productListNewest,list:products})
		return fetchProductBestSeller(), fetchProductNewest();
	}, []);
	if (productListBestSeller.failFetch || productListNewest.failFetch) {
		return <ErrorLoad />;
	} else if (!productListBestSeller.isFetched || !productListNewest.isFetched) {
		return <Loading />;
	} else
		return (
			<div className="container home-page">
				<div className="banner">
					<div className="img-banner">
						<img
							src="https://cdn11.bigcommerce.com/s-55834/images/stencil/original/carousel/31/fishing-tackle-shop38932.jpg"
							alt="image"
						/>
						{/* <img/> */}
					</div>

					<div className="banner-content">
						<h3>
							Lorem ipsum dolo sit amet.
							<br />
							consectetur a
						</h3>
						<h3>Lorem ipsum dolo</h3>
						<div className="button-discover">
							<YLButton value="Discover me" variant="dark" />
						</div>
					</div>
				</div>
				<div className="top-product-sale bg-white p-2">
					<h2 className="ms-5">Sản phẩm bán chạy</h2>
					<div className="top-product-show">
						<Carosel products={productListBestSeller.list} caroselId="bestsaleproduct" />
					</div>
				</div>
				<div className="top-product-new bg-white p-3 mt-3 mb-3">
					<h2 className="ms-5">Sản phẩm mới </h2>
					<div className="top-product-show">
						<Carosel products={productListNewest.list} caroselId="newproduct" />
					</div>
				</div>
			</div>
		);
}

export default Home;
