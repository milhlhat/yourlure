import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import data from 'assets/dumy-data/data-product.js';
import CartProduct from 'components/cart/CartProduct';
import CardProduct from 'components/card/card-product';
import 'assets/scss/scss-components/product/product-by-cate.scss'

ProductByCate.propTypes = {
    
};

function ProductByCate(props) {
    const products=data.products();
    const cates=data.category();

    useEffect(()=>{
        // console.log('by bate ');
		// console.log(products);
	},[])
    return (
        <div className="bg-white">
            {cates.map((cate,index)=>(
                <div className="" key={index}>
                    <div className="row">
                        <span className="col-8"><b>{cate.name}</b></span>
                        <span className="col-4">Xem thêm</span>
                    </div>
                    <div className="product-card-row">
                        {products.map((product,index)=>(
                            <div className="product-card" key={index}>
                            {product.categoryId==cate.id&& <CardProduct product={product}/>}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProductByCate;