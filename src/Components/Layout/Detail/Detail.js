import React, { useState, useContext } from 'react';
import ProductDT from './Fetch/ProductDT';
import { useParams, Link, useHistory } from 'react-router-dom';

import { Stuff } from '../../../../Stuff';
import { MyContext } from '../../../Context/TechShopContext';
const Detail = () => {
	const { id } = useParams();
	const history = useHistory();
	const { value, loading } = ProductDT(id);

	const [quantity, setQuantity] = useState(0);

	const ctx = useContext(MyContext);

	const handleClick = () => {
		if (parseInt(quantity) <= 0) {
			return;
		}
		const data = {
			id: value.productId,
			productName: value.productName,
			quantity: parseInt(quantity),
			picture: value.picture,
			price: value.price,
		};
		ctx.carts.cartDispatch({
			type: 'ADD',
			data: data,
		});
		history.push('/cart');
	};

	return loading ? (
		<div>
			<br />
			<div className='d-flex justify-content-center'>
				<div
					className='spinner-border text-info'
					style={{ width: '3rem', height: '3rem', marginTop: '10%' }}
					role='status'
				>
					<span className='sr-only'>Loading...</span>
				</div>
			</div>
		</div>
	) : (
		value && (
			<div className='container-fluid'>
				<div className='row'>
					<div className='col-sm-12 co-md-12 col-lg-6 col-xl-6 '>
						<img
							width='400'
							src={`${Stuff.URL}/${value.picture}`}
							className='img-fluid'
							alt='...'
						/>
					</div>
					<div className='col-sm-12 co-md-12 col-lg-6 col-xl-6 '>
						<br />
						<ul className='nav flex-column'>
							<li className='nav-item'>
								<h5>{value.productName}</h5>
							</li>
							<li className='nav-item'>
								<p>{value.price}</p>
							</li>
							<li className='nav-item'>
								<input
									type='number'
									value={quantity}
									onChange={(e) => setQuantity((pre) => (pre = e.target.value))}
								/>
							</li>
							<li className='nav-item'>
								<br />
								<button className='btn btn-success text-uppercase' onClick={handleClick}>
									Add to cart
								</button>
							</li>
						</ul>
						<br />
						<ul className='nav flex-column'>
							<li className='nav-item'>
								<p>Screen:{value.screen}</p>
							</li>
							<li className='nav-item'>
								<p>Ram:{value.ram} GB</p>
							</li>
							<li className='nav-item'>
								<p>Storage:{value.storage} GB</p>
							</li>
							<li className='nav-item'>
								<p>CPU:{value.cpu}</p>
							</li>
							<li className='nav-item'>
								<p>Battery:{value.battery} mah</p>
							</li>
						</ul>
					</div>
				</div>
			</div>
		)
	);
};

export default Detail;
