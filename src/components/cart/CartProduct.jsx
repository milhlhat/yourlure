import React from 'react';
import PropTypes from 'prop-types';

CartProduct.propTypes = {
    
};

function CartProduct(props) {
    return (
        <div className="row">
            <div className="cart-left col-md-8 col-sm-12">
                <span>GIỎ HÀNG</span>
            </div>
            <div className="cart-right col-md-4 col-sm-12">
                CHI TIẾT ĐƠN HÀNG
            </div>
        </div>
    );
}

export default CartProduct;