import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CardProduct from "./CardProduct";
import "assets/scss/scss-components/carosel/carosel.scss";

Carosel.propTypes = {};

function Carosel(props) {
  const { products } = props;

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 5000, min: 2601 },
      items: 6,
    },
    largeDesktop: {
      breakpoint: { max: 2600, min: 1028 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1027, min: 768 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 767, min: 464 },
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
        swipeable={true}
        draggable={true}
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
