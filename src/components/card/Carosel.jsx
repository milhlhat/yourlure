import React from "react";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import PropTypes from "prop-types";
import CardProduct from "./card-product";
import "assets/scss/scss-components/carosel/carosel.scss";

Carosel.propTypes = {};

function Carosel(props) {
  const { products, caroselId } = props;
const data =[{"productID":20,"productName":"NHÁI HƠI CÂU LURE F45 TNTLURE","imageCollection":[{"imageId":8,"linkImage":"https://vuadocau.com/wp-content/uploads/2020/05/Nhai-Hoi-F45-300x300.jpg.webp"}],"defaultPrice":100000.0},{"productID":25,"productName":"NHÁI HƠI HD55","imageCollection":[{"imageId":13,"linkImage":"https://vuadocau.com/wp-content/uploads/2019/04/Nhai-Hoi-HD-55-300x300.jpg.webp"}],"defaultPrice":130000.0},{"productID":14,"productName":"NHÁI HƠI F45S TNT LURE","imageCollection":[{"imageId":1,"linkImage":"https://vuadocau.com/wp-content/uploads/2020/06/F45S-300x300.jpg.webp"},{"imageId":2,"linkImage":"https://vuadocau.com/wp-content/uploads/2020/06/Nhai-Hoi-Jump-300x300.jpg.webp"}],"defaultPrice":100000.0},{"productID":23,"productName":"NHÁI HƠI CHUỘT SÓC CÂU CÁ LÓC CỰC NHẠY","imageCollection":[{"imageId":11,"linkImage":"https://vuadocau.com/wp-content/uploads/2020/02/chuot-soc-300x300.jpg.webp"}],"defaultPrice":120000.0},{"productID":16,"productName":"MỒI NHÁI HƠI CÂU CÁ LÓC F48 TNTLURE","imageCollection":[{"imageId":4,"linkImage":"https://vuadocau.com/wp-content/uploads/2020/05/Nhai-Hoi-F48-300x300.jpg.webp"}],"defaultPrice":100000.0},{"productID":9,"productName":"MỒI GIẢ CÂU LURE WHITE LION ELITELURE","imageCollection":[{"imageId":28,"linkImage":"https://vuadocau.com/wp-content/uploads/2020/07/White-Lion-Elitelure-300x300.jpg.webp"}],"defaultPrice":130000.0},{"productID":1,"productName":"MỒI CÂU LURE CHẼM, HỒNG, MÚ M80","imageCollection":[{"imageId":17,"linkImage":"https://vuadocau.com/wp-content/uploads/2021/01/M8010-300x300.jpg.webp"},{"imageId":21,"linkImage":"https://vuadocau.com/wp-content/uploads/2020/11/CR28-300x300.jpg"},{"imageId":19,"linkImage":"https://vuadocau.com/wp-content/uploads/2020/11/CR28-300x300.jpg"}],"defaultPrice":65000.0},{"productID":3,"productName":"MỒI CÂU LURE BIỂN SLURE 120","imageCollection":[{"imageId":22,"linkImage":"https://vuadocau.com/wp-content/uploads/2020/11/Slure-300x300.jpg"}],"defaultPrice":115000.0},{"productID":4,"productName":"MỒI CÂU LURE BIỂN X ROOL 128","imageCollection":[{"imageId":23,"linkImage":"https://vuadocau.com/wp-content/uploads/2020/11/X-rool-300x300.jpg"}],"defaultPrice":75000.0},{"productID":2,"productName":"MỒI LURE BIỂN CR28","imageCollection":[{"imageId":18,"linkImage":"https://vuadocau.com/wp-content/uploads/2020/11/CR28-300x300.jpg"},{"imageId":20,"linkImage":"https://vuadocau.com/wp-content/uploads/2020/11/CR28-300x300.jpg"}],"defaultPrice":80000.0}]

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
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
		{console.log("products")}
		{console.log(products)}
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
		  {products.map((product,i)=>(
			  <CardProduct product={product} key={i}/>
		  ))}
      </Carousel>
    </div>
  )
}

export default Carosel;
