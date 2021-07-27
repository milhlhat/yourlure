import React, { useEffect, useState } from "react";
import "../assets/scss/scss-pages/home.scss";
import YLButton from "components/custom-field/YLButton";
import Carosel from "components/card/Carosel";
import ProductAPI from "api/product-api";
import Loading from "components/Loading";
import ErrorLoad from "components/error-notify/ErrorLoad";
import banner from "assets/images/urban-fishing-in-boston-social.jpg";
import { Can } from "ability/can";
import DEFINELINK from "routes/define-link";

function Home() {
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

  useEffect(() => {
    const fetchProductNewest = async () => {
      try {
        const response = await ProductAPI.getNewList();
        setProductListNewest({
          list: response,
          isFetched: true,
          failFetch: false,
        });
      } catch (error) {
        console.log("fail to fetch list");
      }
    };
    const fetchProductBestSeller = async () => {
      try {
        const response = await ProductAPI.getBestSeller();
        setProductListBestSeller({
          list: response,
          isFetched: true,
          failFetch: false,
        });
      } catch (error) {
        setProductListBestSeller({
          failFetch: true,
        });
        console.log("fail to fetch customer list");
      }
    };
    fetchProductNewest();
    fetchProductBestSeller();
  }, []);
  if (productListBestSeller.failFetch || productListNewest.failFetch) {
    return <ErrorLoad hasLayout />;
  } else if (!productListBestSeller.isFetched || !productListNewest.isFetched) {
    return <Loading hasLayout />;
  } else
    return (
      <div className="container home-page">
        <div className="banner ">
          <div className="img-banner bg-shadow">
            <img src={banner} alt="banner yourlure" />
          </div>
          <div className="banner-content">
            <h3>
              Tất cả sự lãng mạn của môn câu cá, nằm trong tâm trí của người đi
              câu và không con cá nào có thể miêu tả được nó.
            </h3>
            <div className="button-discover">
              {/* <Can I="read" a="all" > */}
              {/* {(allowed) => ( */}
              <YLButton
                value="Khám phá"
                // disabled={!allowed}
                to={DEFINELINK.product}
                variant="primary"
                width={"150px"}
              />
              {/* )} */}
              {/* </Can> */}
            </div>
          </div>
        </div>
        <div className="top-product-sale bg-white bg-shadow p-2">
          <h3 className="ms-md-4 ms-2">Sản phẩm bán chạy</h3>
          <div className="ms-md-4 ms-2 bottom-line" />
          <div className="top-product-show mt-5 mb-3">
            {productListBestSeller.list.length > 0 && (
              <Carosel
                products={productListBestSeller.list}
                caroselId="bestsaleproduct"
              />
            )}
          </div>
        </div>
        <div className="top-product-new bg-white bg-shadow p-3 mt-5 mb-3">
          <h3 className="ms-md-4 ms-2">Sản phẩm mới </h3>
          <div className="ms-md-4 ms-2 bottom-line" />
          <div className="top-product-show mt-5 mb-3">
            {productListNewest.list.length > 0 && (
              <Carosel
                products={productListNewest.list}
                caroselId="newproduct"
              />
            )}
          </div>
        </div>
      </div>
    );
}

export default Home;
