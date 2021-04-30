import React from 'react';
import PaymentData from './Fetch/PaymentData';
import Errors from './Fetch/Errors'
const Payment = () => {
	const { paying, handleChange, value, loading,toTalPrice,sumQuatity,error } = PaymentData(Errors);

	return (
		<div className='container-fluid'>
			<div className='row justify-content-center'>
				<div className='col-sm-12 col-md-10 col-lg-6 col-xl-4'>
					<br />
					<ul className='nav flex-column'>
						<li className='nav-item'>
							<p>
								<span className='font-weight-bold'>Quatity:</span>
                                {sumQuatity()}
							</p>
						</li>
						<li className='nav-item'>
							<p>
								<span className='font-weight-bold'>Total Price:</span>
                                {toTalPrice()}
							</p>
						</li>
						<li className='nav-item'>
							<form>
								<div className='form-group  mb-2'>
									<input
										name='address'
										type='text'
										className='form-control'
										placeholder='Address'
										value={value.address}
										onChange={handleChange}
									/>
                                    {error.address && <small className='text-danger'>{error.address}</small>}
								</div>
								<div className='form-group  mb-2'>
									<input
										name='phoneNumber'
										type='text'
										className='form-control'
										placeholder='Phone Number'
										value={value.phoneNumber}
										onChange={handleChange}
									/>
                                    {error.phoneNumber && <small className='text-danger'>{error.phoneNumber}</small>}
								</div>
								{loading ? (
									<button className='btn btn-primary btn-lg btn-block text-uppercase' type='button' disabled>
										<span
											className='spinner-border'
											role='status'
											aria-hidden='true'
                                            style={{width: '1.5rem',height: '1.5rem'}}
										></span>
										Loading...
									</button>
								) : (
									<button
                                        type='button'
										onClick={paying}
										className='btn btn-primary btn-lg btn-block text-uppercase'
									>
										Payment
									</button>
								)}
							</form>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Payment;
