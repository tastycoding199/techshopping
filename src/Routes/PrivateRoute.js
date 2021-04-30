import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { MyContext } from '../Context/TechShopContext';

const PrivateRoute = ({ children, ...rest }) => {
	const ctx = useContext(MyContext);
	const auth = ctx.auths.auth;

	return (
		<Route
			{...rest}
			render={({ location }) =>
				auth.isAuth ? children : <Redirect to={{ pathname: '/login', state: { from: location } }} />
			}
		/>
	);
};

export default PrivateRoute;
