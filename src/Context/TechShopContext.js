import React, { createContext, useReducer } from 'react';

import CartReducer from '../Reducers/CartReducer';
import AuthReducer from '../Reducers/AuthReducer';

import { Initial } from '../Resource/CreateInitial';

export const MyContext = createContext(Initial);

export const TechShopContext = ({ children }) => {
	const [cart, cartDispatch] = useReducer(CartReducer, Initial.Cart);
	const [auth, authDispatch] = useReducer(AuthReducer, Initial.Auth);

	const val = {
		carts: { cart, cartDispatch },
		auths: { auth, authDispatch },
	};

	return (
		<MyContext.Provider value={val}>
			{children}
		</MyContext.Provider>
	);
};
