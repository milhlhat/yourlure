import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";

ManagerProductAddNew.propTypes = {
    
};

function ManagerProductAddNew(props) {
    const history = useHistory()
    return (
        <div>
            add new work!!!
            <Link to='/manager/product'>back</Link>
        </div>
    );
}

export default ManagerProductAddNew;