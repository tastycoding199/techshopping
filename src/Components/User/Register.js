import React from 'react';
import './css/Styles.css';

import RegisterForm from './Register/RegisterForm';
import RegisterValidate from './Register/RegisterValidate';

const Register = () => {
	const { value, hanleChange, handleSubmit, error, loading } = RegisterForm(RegisterValidate);

	return (
		<div className='container-fluid'>
			<div className='row justify-content-center'>
				<div className='col-sm-12 col-md-7 col-lg-6 col-xl-4'>
					<br />
					<p align='center' className='largeTitle'>
						register
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
								onChange={hanleChange}
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
								onChange={hanleChange}
							/>
							{error.password && <small className='text-danger'>{error.password}</small>}
						</div>

						<div className='form-group'>
							<label className='text-uppercase font-weight-bold title' htmlFor='confirmPassword'>
								Confirm Password
							</label>
							<input
								type='password'
								className='form-control'
								id='confirmPassword'
								name='confirm'
								value={value.confirm}
								onChange={hanleChange}
							/>
							{error.confirm && <small className='text-danger'>{error.confirm}</small>}
						</div>

						<div className='form-group'>
							{error.complete && <small className='text-danger'>{error.complete}</small>}
						</div>

						{loading ? (
							<div
								className='spinner-border text-info'
								style={{ width: '3rem', height: '3rem' }}
								role='status'
							>
								<span className='sr-only'>Loading...</span>
							</div>
						) : (
							<button onClick={handleSubmit} className='btn btn-dark text-uppercase'>
								Enroll
							</button>
						)}
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
