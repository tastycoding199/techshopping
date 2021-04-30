import React, { useState, useContext } from 'react';
import NavData from './Fetch/NavData';
import { Link } from 'react-router-dom';
import './css/Style.css';

import { MyContext } from '../../Context/TechShopContext';

import { Stuff } from '../../../Stuff';

const Navbar = () => {
	const { value, loading, handleChange, search, hideResult, result } = NavData();
	const [hide, setHide] = useState(false);
	const [Id, setId] = useState(0);

	const ctx = useContext(MyContext);
	const carts = ctx.carts.cart;

	const totalCart = () => {
		let sum = 0;
		for (const item of carts) {
			sum += item.quantity;
		}
		return sum;
	};

	return (
		<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
			<Link className='navbar-brand' to='/'>
				TechShop
			</Link>
			<button
				className='navbar-toggler'
				type='button'
				data-toggle='collapse'
				data-target='#navbarSupportedContent'
				aria-controls='navbarSupportedContent'
				aria-expanded='false'
				aria-label='Toggle navigation'
			>
				<span className='navbar-toggler-icon'></span>
			</button>

			<div className='collapse navbar-collapse' id='navbarSupportedContent'>
				<ul className='navbar-nav mr-auto custom-nav'>
					{value.map((val) => (
						<li
							className='nav-item text-light mr-4'
							key={val.categoryId}
							onClick={() => {
								setHide((pre) => (pre = !pre));
								setId((pre) => (pre = val.categoryId));
							}}
						>
							{val.categoryName}
							{hide && Id == val.categoryId && (
								<ul className='nav flex-column sub-item bg-dark'>
									{val.brands.map((brand) => (
										<Link
											className='nav-link text-light'
											to={`../product?category=${val.categoryId}&brand=${brand.brandId}`}
											key={brand.brandId}
										>
											<li className='nav-item'>{brand.brandName}</li>
										</Link>
									))}
								</ul>
							)}
						</li>
					))}
				</ul>
				<div className='form-inline my-2 my-lg-0'>
					<input
						className='form-control mr-sm-2 search'
						type='search'
						placeholder='Search'
						aria-label='Search'
						onChange={handleChange}
						value={search}
					/>
					{hideResult && (
						<div className='result bg-dark' id='result'>
							<ul className='nav flex-column'>
								{loading ? (
									<div className='d-flex justify-content-center mt-3'>
										<div className='spinner-grow text-light spinner-grow-sm mr-2' role='status'>
											<span className='sr-only'>Loading...</span>
										</div>
										<div className='spinner-grow text-light spinner-grow-sm mr-2' role='status'>
											<span className='sr-only'>Loading...</span>
										</div>
										<div className='spinner-grow text-light spinner-grow-sm' role='status'>
											<span className='sr-only'>Loading...</span>
										</div>
									</div>
								) : (
									result.map((val) => (
										<Link
											className='nav-link text-light'
											to={`/product/${val.productId}`}
											key={val.productId}
										>
											<li className='nav-item'>
												<ul className='nav text-light'>
													<li className='nav-item'>
														<img width='70' src={`${Stuff.URL}/${val.picture}`} />
													</li>
													<li className='nav-item'>
														<p className='pl-1'>{val.productName}</p>
														<p className='pl-1'>{val.price}</p>
													</li>
												</ul>
											</li>
										</Link>
									))
								)}
							</ul>
						</div>
					)}
					<p className='text-light'>
						<Link className='nav-link text-light' to='/cart'>
							{carts.length > 0 ? totalCart() : ''}
						</Link>
					</p>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
