import React, {useState} from 'react';

import 'assets/scss/scss-components/product/product-detail.scss';
import {useHistory} from 'react-router';
import { createImageUrlByLinkOrFile } from 'utils/manager-product';

function ProductImage(props) {
    let {product,setBigImgLink,bigImgLink} = props;
    const isCustome = true;
    const [selectImg, setSelectImg] = useState(0);
    const history = useHistory();

    function goToCustomize() {
        history.push(`/product/customize/${product.productId}`);
    }

    const handleChangeImg = (i)=>{
        setSelectImg(i);
        setBigImgLink(null);
    }
    return (
        <div className="bg-white bg-shadow product-media d-flex flex-column">
            <div className="big-image object-fit p-md-3 p-1">
                <button
                    className={`big-image-edit ${product ? (product.customizable ? '' : 'd-none') : ''}`}
                    onClick={goToCustomize}
                    hidden={!isCustome}
                >
                    <i className="fa fa-pencil"></i>
                </button>
                <img
                    src={createImageUrlByLinkOrFile(bigImgLink?bigImgLink:product ? product.imageCollection[selectImg]?.linkImage : '')}
                    height={350}
                    alt={`Ảnh sản phẩm ${product?.productName}`}
                />
            </div>
            <div className="gallery my-2 p-md-3 p-1">
                {product &&
                product.imageCollection.map((item, i) => (
                    <div
                        className={`me-1 small-images ' ${selectImg == i ? 'border-gallery' : ''} `}
                        key={i}
                        onClick={() => handleChangeImg(i)}
                    >
                        <img width={60} src={createImageUrlByLinkOrFile(item.linkImage)}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductImage;
