import React, { useEffect, useState } from 'react';
import '../assets/scss/scss-pages/home.scss';
import data from '../assets/dumy-data/data-product.js';
import YLButton from 'components/custom-field/YLButton';
import Carosel from 'components/card/Carosel';
import ProductAPI from 'api/product-api';
import Loading from 'components/Loading';
import ErrorLoad from 'components/ErrorLoad';
import banner from 'assets/images/urban-fishing-in-boston-social.jpg';
import { Can } from 'ability/can';

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
		return fetchProductBestSeller(), fetchProductNewest();
	}, []);
	if (productListBestSeller.failFetch || productListNewest.failFetch) {
		return <ErrorLoad />;
	} else if (!productListBestSeller.isFetched || !productListNewest.isFetched) {
		return <Loading />;
	} else
		return (
			<div className="container home-page">
				<div className="banner ">
					<div className="img-banner bg-shadow">
						<img src={banner} alt="image" />
					</div>

					<div className="banner-content">
						<h3>
							Lorem ipsum dolo sit amet.
							<br />
							consectetur a
						</h3>
						<h3>Lorem ipsum dolo</h3>
						<div className="button-discover">
							<Can I="read" a="all" passThrough>
								{(allowed) => <YLButton value="Discover me" disabled={!allowed} variant="primary"></YLButton>}
							</Can>
						</div>
						 
					</div>
				</div>
				<div className="top-product-sale bg-white bg-shadow p-2">
					<h3 className="ms-md-4 ms-2">Sản phẩm bán chạy</h3>
					<div className="ms-md-4 ms-2 bottom-line"></div>
					<div className="top-product-show mt-5 mb-3">
						{productListBestSeller.list.length > 0 && (
							<Carosel products={productListBestSeller.list} caroselId="bestsaleproduct" />
						)}
					</div>
				</div>
				<div className="top-product-new bg-white bg-shadow p-3 mt-5 mb-3">
					<h3 className="ms-md-4 ms-2">Sản phẩm mới </h3>
					<div className="ms-md-4 ms-2 bottom-line"></div>
					<div className="top-product-show mt-5 mb-3">
						{productListNewest.list.length > 0 && (
							<Carosel products={productListNewest.list} caroselId="newproduct" />
						)}
					</div>
				</div>
			</div>
		);
}

export default Home;
