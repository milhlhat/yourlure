import React from 'react';
import { useRouteMatch } from 'react-router-dom';

function ManagementRouter(props) {
    const match = useRouteMatch();
	console.log(match);
    return (
        <div>
            ManagementRouter
        </div>
    );
}

export default ManagementRouter;