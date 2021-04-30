import React,{useContext}from 'react';
import UseLoginForm from './Login/UseLoginForm';
import LoginValidate from './Login/LoginValidate';
import './css/Styles.css';

import {useHistory} from 'react-router-dom';

import {MyContext} from '../../Context/TechShopContext';

const Login = (p) => {
	const location = p.history.location.state ? p.history.location.state.from : {pathname:''};

	const { value, handleChange, handleSubmit, error, loading } = UseLoginForm(
		LoginValidate,
		location,
	);

	const history = useHistory();
	const ctx = useContext(MyContext);
	const auth = ctx.auths.auth.isAuth;

	if(auth){
		history.push(location.pathname);
	}

	

	return (
		<div className='container-fluid'>
			<div className='row justify-content-center'>
				<div className='col-sm-12 col-md-7 col-lg-6 col-xl-4'>
					<br />
					<p align='center' className='largeTitle'>
						login
					</p>
				</div>
			</div>
			<div className='row justify-content-center'>
				<div className='col-sm-12 col-md-7 col-lg-6 col-xl-4'>
					<form>
						<div className='form-group'>
							<label className='text-uppercase font-weight-bold title' htmlFor='username'>
								user name
							</label>
							<input
								type='text'
								className='form-control'
								name='username'
								id='username'
								value={value.username}
								onChange={handleChange}
							/>
							{error.username && <small className='text-danger'>{error.username}</small>}
						</div>
						<div className='form-group'>
							<label className='text-uppercase font-weight-bold title' htmlFor='password'>
								Password
							</label>
							<input
								type='password'
								className='form-control'
								id='password'
								name='password'
								value={value.password}
								onChange={handleChange}
							/>
							{error.password && <small className='text-danger'>{error.password}</small>}
						</div>
						<div className='form-group'>
							<a className='nav-link pl-0 text-success' href='/Register'>
								Enroll now,If you have not an account
							</a>
						</div>
						<div className='form-group'>
							{error.complete && <span className='text-danger'>{error.complete}</span>}
						</div>

						{loading ? (
							<div className="spinner-border text-info" style={{width: '3rem',height:'3rem'}} role="status">
								<span className="sr-only">Loading...</span>
						  	</div>
						) : (
							<button onClick={handleSubmit} className='btn btn-dark text-uppercase'>
								Login
							</button>
						)}
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
