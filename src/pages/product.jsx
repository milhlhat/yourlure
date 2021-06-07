import React from 'react';
import PropTypes from 'prop-types';
import ProductChooseFilter from 'components/product/product-type/ProductChooseFilter.jsx';
import ProductShow from 'components/product/product-type/ProductShow';
import '../assets/scss/scss-pages/product-type.scss';
import Sort from 'components/orther/Sort';
import SearchProduct from './Search';

Product.propTypes = {
    
};

function Product(props) {
    return (
        <div className="container product-type mt-2">
            <SearchProduct/>
        </div>
    );
}

export default Product;