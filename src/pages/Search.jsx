import React from "react";
import "assets/scss/scss-pages/search.scss";
import ProductChooseFilter from "components/product/product-type/ProductChooseFilter";
import Sort from "components/orther/Sort";
import ProductShow from "components/product/product-type/ProductShow";
import { useSelector } from "react-redux";
import ProductBanner from "components/product/ProductBanner";
import YLBreadCrumbs from "components/custom-field/YLBreadCrumbs";

function SearchProduct(props) {
  const products = useSelector((state) => state.productFilter.data);

  return (
    <div className="container search-type mt-2">
      <ProductBanner title="Sản phẩm" />
      <YLBreadCrumbs children={[{ name: "Tìm kiếm" }]} />

      <div className="row">
        <div className="col-md-3 col-sm-12">
          <ProductChooseFilter />
        </div>
        <div className="col-md-9 col-sm-12">
          <Sort />
          <ProductShow products={products} />
        </div>
      </div>
    </div>
  );
}

export default SearchProduct;
