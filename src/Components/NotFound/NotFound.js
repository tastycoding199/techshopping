import React from 'react';

const NotFound = ({ location }) => {
	return (
		<div>
			<h3 className='text-danger text-uppercase'>
               Not found for {location.pathname}
            </h3>
			
		</div>
	);
};

export default NotFound;
