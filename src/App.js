import React from 'react';
import { TechShopContext } from './Context/TechShopContext';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Components/User/Login';
import Register from './Components/User/Register';

import NotFound from './Components/NotFound/NotFound';
import Cart from './Components/Layout/Cart/Cart';

import Product from './Components/Layout/Product/Product';
import Home from './Components/Layout/Home';
import Detail from './Components/Layout/Detail/Detail';
import Navbar from './Components/Navbar/Navbar';

import Payment from './Components/Layout/Payment/Payment';
import PrivateRoute from './Routes/PrivateRoute';
const App = () => {
	return (
		<TechShopContext>
			<Router>
				<Navbar />
				<div className='container-fluid'>
					<div className='row'>
						<div className='col'>
							<Switch>
								<Route exact path='/' component={Home} />
								<Route exact path='/product' component={Product} />
								<Route path='/product/:id' component={Detail} />
								<Route path='/cart' component={Cart} />

								<PrivateRoute path='/payment'>
									<Payment/>
								</PrivateRoute>

								<Route path='/login' component={Login} />
								<Route path='/register' component={Register} />
								<Route path='*' component={NotFound} />
							</Switch>
						</div>
					</div>
				</div>
			</Router>
		</TechShopContext>
	);
};

export default App;
