import React from 'react';
import PropTypes from 'prop-types';
import data from '../../../assets/dumy-data/data-product';
import CartProduct from 'components/card/card-product.jsx';
import { useHistory } from 'react-router';
ProductShow.propTypes = {
    
};

function ProductShow(props) {
    const products = data.products();
    const categorys = data.category();
    
    return (
        <div className="product-show mt-3 bg-white">
            {products.map((product,index)=>(
                <CartProduct key={index}/>
            ))}
        </div>
    );
}

export default ProductShow;