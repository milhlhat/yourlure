import React from 'react';
import 'assets/scss/scss-components/loading.scss';
import { LinearProgress } from '@material-ui/core';
function Loading() {
	return (
		<div className="loading">
			<LinearProgress className="w-75" />
		</div>
	);
}

export default Loading;
