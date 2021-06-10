import React from "react";
import PropTypes from "prop-types";
import CardProduct from "./card-product";
import "assets/scss/scss-components/carosel/carosel.scss";

Carosel.propTypes = {};

function Carosel(props) {
  const { products, caroselId } = props;
  return (
    <div
      id={caroselId==null?"carouselExampleControls":caroselId}
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="row">
            <div className="item-center col-4 bg-white">
              <CardProduct product={products[0]} />
            </div>
            <div className="item-center col-4 bg-white">
              <CardProduct product={products[1]} />
            </div>
            <div className="item-center col-4 bg-white">
              <CardProduct product={products[2]} />
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="row">
            <div className="item-center col-4 bg-white">
              <CardProduct product={products[3]} />
            </div>
            <div className="item-center col-4 bg-white">
              <CardProduct product={products[4]} />
            </div>
            <div className="item-center col-4 bg-white">
              <CardProduct product={products[5]} />
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="row">
            <div className="item-center col-4 bg-white">
              <CardProduct product={products[6]} />
            </div>
            <div className="item-center col-4 bg-white">
              <CardProduct product={products[7]} />
            </div>
            <div className="item-center col-4 bg-white">
              <CardProduct product={products[8]} />
            </div>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target={"#"+caroselId==null?"#carouselExampleControls":"#"+caroselId}
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="color-black"><i className="fa fa-chevron-left"></i></span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target={caroselId==null?"#carouselExampleControls":"#"+caroselId}
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="color-black"><i className="fa fa-chevron-right"></i></span>
      </button>
    </div>
  );
}

export default Carosel;
