import React from "react";
import PropTypes from "prop-types";
import "../assets/scss/scss-pages/home.scss";
import data from "../assets/dumy-data/data-product.js";
import CartProduct from "components/card/card-product";
import YLButton from "components/custom-field/YLButton";
import Carosel from "components/card/Carosel";
Home.propTypes = {};

function Home(props) {
  const products=data.products();
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
          <YLButton value="Discover me" varian="dark"/>
          </div>
        </div>
      </div>
      <div className="carosel">
        <Carosel/>
      </div>
      <div className="top-product-sale bg-white p-2">
        <h2 className="ms-5">Sản phẩm bán chạy</h2>
        <div className="top-product-show">
          {products.map((value,index)=>(
            index<5 && <CartProduct key={index}/>
          ))}
        </div>
      </div>
      <div className="top-product-new bg-white p-3 mt-3 mb-3">
        <h2 className="ms-5">Sản phẩm mới </h2>
        <div className="top-product-show">
          {products.map((value,index)=>(
            index<5 && <CartProduct key={index}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
