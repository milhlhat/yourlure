import React from 'react';
import PropTypes from 'prop-types';
import ProductChooseFilter from 'components/product/product-type/ProductChooseFilter.jsx';
import ProductShow from 'components/product/product-type/ProductShow';
import '../assets/scss/scss-pages/product-type.scss';
import Sort from 'components/orther/Sort';

Product.propTypes = {
    
};

function Product(props) {
    return (
        <div className="container product-type mt-2">
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

export default Product;