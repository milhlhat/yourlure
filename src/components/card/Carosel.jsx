import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import CardProduct from './card-product';
import 'assets/scss/scss-components/carosel/carosel.scss';

Carosel.propTypes = {};

function Carosel(props) {
	const { products } = props;

	const responsive = {
		superLargeDesktop: {
			// the naming can be any, depends on you.
			breakpoint: { max: 4000, min: 1500 },
			items: 5,
		},
		desktop: {
			breakpoint: { max: 1500, min: 1024 },
			items: 4,
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 3,
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 2,
		},
	};
	return (
		<div className="carosel-custome">
			<Carousel
				swipeable={false}
				draggable={false}
				showDots={false}
				responsive={responsive}
				ssr={true} // means to render carousel on server-side.
				infinite={true}
				keyBoardControl={true}
				customTransition="all 1s"
				transitionDuration={500}
			>
				{products.map((product, i) => (
					<CardProduct product={product} key={i} />
				))}
			</Carousel>
		</div>
	);
}

export default Carosel;
