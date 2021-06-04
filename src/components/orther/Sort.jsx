import React from 'react';
import PropTypes from 'prop-types';
import data from "../../assets/dumy-data/data-product";

Sort.propTypes = {
    
};

function Sort(props) {
    const products=data.products();
    return (
        <div className="bg-white ps-2">
            <span>Sắp xếp theo </span>
            <button className="btn btn-outline-dark ms-2 active">Mới nhất</button>
            <button className="btn btn-outline-dark ms-2">Bán chạy</button>
            <span className="ms-3 ">{products.length} Sản phẩm</span>
        </div>
    );
}

export default Sort;