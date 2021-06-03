import React from 'react';
import PropTypes from 'prop-types';
import data from './data-product';
import CartProduct from 'components/card-product.jsx';
ProductShow.propTypes = {
    
};

function ProductShow(props) {
    const products = data.products();
    const categorys = data.category();
    return (
        <div className="product-show">
            {products.map((product,index)=>(
                <CartProduct/>
            ))}
        </div>
    );
}

export default ProductShow;