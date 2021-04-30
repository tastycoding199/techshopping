import React, { useEffect, useState } from 'react';
import ProductData from './Fetch/ProductData';

import { Link, useLocation } from 'react-router-dom';
import { Stuff } from '../../../../Stuff';
const useQuery = () => {
	return new URLSearchParams(useLocation().search);
};

const Product = () => {
	const query = useQuery();
	const category = query.get('category');
	const brand = query.get('brand');

	const { value, loading } = ProductData(category, brand);

	return (
		<div>
			<br />
			{loading ? (
				<div className='d-flex justify-content-center'>
					<div className="spinner-border text-info" style={{width: '3rem',height: '3rem',marginTop:'10%'}} role="status">
						<span className="sr-only">Loading...</span>
					</div>
				</div>
			) : (
				<ul className='nav'>
					{value.map((val) => (
						<li className='nav-item mr-3' key={val.productId}>
							<div className='card' style={{ width: '18rem' }}>
								<img src={`${Stuff.URL}/${val.picture}`} className='card-img-top' alt='...' />
								<div className='card-body'>
									<h5 className='card-title'>{val.productName}</h5>
									<p className='card-text'>{val.price}</p>
									<Link to={`/product/${val.productId}`} className='btn btn-primary'>
										Detail
									</Link>
								</div>
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Product;
