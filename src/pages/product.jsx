import React from 'react';
import PropTypes from 'prop-types';
import ProductChooseFilter from 'components/product/product-type/ProductChooseFilter.jsx';
import ProductShow from 'components/product/product-type/ProductShow';
import '../assets/scss/scss-pages/product-type.scss';

Product.propTypes = {
    
};

function Product(props) {
    return (
        <div className="container product-type mt-2">
            <h1>Sản phẩm</h1>
            <div className="row">
                <div className="col-3">
                <ProductChooseFilter/>
                </div>
                <div className="col-9">
                <ProductShow/>
                </div>
            </div>
        </div>
    );
}

export default Product;