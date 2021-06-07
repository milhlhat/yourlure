import React from 'react';
import PropTypes from 'prop-types';

Paging.propTypes = {
    pagination: PropTypes.object.isRequired,
    onPageChange: PropTypes.func,
};
Paging.defaultProps={

    onPageChange:null,
}

function Paging(props) {
    const {pagination,onPageChange}=props;
    const {_page, _limit, _totalRows}=pagination;
    const totalPage=Math.ceil(_totalRows/_limit);

    function handleChange(newPage){
        if(onPageChange){
            onPageChange(newPage);
        }
    }
    return (
        <div>
            <button disabled={_page<=1} onClick={()=>handleChange(_page-1)}>prev</button>
            <button disabled={_page>=totalPage} onClick={()=>handleChange(_page+1)}>next</button>
        </div>
    );
}

export default Paging;