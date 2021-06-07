import React from 'react';
import 'assets/scss/scss-pages/search.scss';
import ProductChooseFilter from 'components/product/product-type/ProductChooseFilter';
import Sort from 'components/orther/Sort';
import ProductShow from 'components/product/product-type/ProductShow';


function SearchProduct(props) {
    return (
        <div className="container search-type mt-2">
            <h1>Sản phẩm</h1>
            <div className="row">
                <div className="col-md-3 col-sm-12">
                <ProductChooseFilter/>
                </div>
                <div className="col-md-9 col-sm-12">
                    <Sort/>
                <ProductShow/>
                </div>
            </div>
        </div>
    );
}

export default SearchProduct;