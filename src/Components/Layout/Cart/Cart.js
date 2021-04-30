import React, { useState, useContext, useEffect } from 'react';
import { MyContext } from '../../../Context/TechShopContext';
import { Stuff } from '../../../../Stuff';
import { Link } from 'react-router-dom';
const Cart = () => {
	const ctx = useContext(MyContext);
	const cart = [...ctx.carts.cart];

	const arr = [];
	cart.map((p) => arr.push({ id: p.id, quantity: p.quantity }));
	const [quantities, setQuantity] = useState(arr);
	//----------------------------------------------------
	const [sumTotal, setTotal] = useState({ sum: 0, quantity: 0 });
	const [changed, setChanged] = useState(false);

	const handleChange = (e) => {
		const value = e.target.value;
		const id = e.target.id;
		if (parseInt(value) <= 0) {
			return;
		}

		const tmp = [...quantities];
		const index = tmp.findIndex((v) => v.id == id);

		if (index > -1) {
			tmp.splice(index, 0, { id: id, quantity: value });
		}
		setQuantity((pre) => (pre = tmp));

		ctx.carts.cartDispatch({ type: 'EDIT', data: { id: id, quantity: value } });

		setChanged((pre) => (pre = !pre));
	};

	const handleClick = (e) => {
		const id = e.target.id;
		ctx.carts.cartDispatch({ type: 'REMOVE', data: { id: id } });
		setChanged((pre) => (pre = !pre));
	};

	const totalPrice = () => {
		let sum = 0,
			quantity = 0;
		for (const item of cart) {
			sum += item.price * item.quantity;
			quantity += item.quantity;
		}
		setTotal((pre) => (pre = { ...pre, sum: sum, quantity: quantity }));
	};

	const defaultQuantity = (id) => quantities.find((p) => p.id == id);

	useEffect(() => {
		totalPrice();
	}, [changed]);

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-sm-12 col-md-12 col-lg-6 col-xl-6'>
					<br />
					{cart.length > 0 && (
						<table className='table table-sm'>
							<thead className='thead-dark'>
								<tr>
									<th scope='col' colSpan='3'>
										<h5 className='text-uppercase'>Cart</h5>
									</th>
									<th scope='col' colSpan='3'></th>
								</tr>
							</thead>
							<tbody>
								{cart.map((val) => (
									<tr key={val.id}>
										<th scope='row'>{val.id}</th>
										<td>
											<img src={`${Stuff.URL}/${val.picture}`} width='50' />
										</td>
										<td>{val.productName}</td>
										<td>
											<input
												id={val.id}
												style={{ width: '70px' }}
												type='number'
												value={defaultQuantity(val.id).quantity}
												onChange={handleChange}
											/>
										</td>
										<td>{val.price}</td>
										<td>
											<button className='btn btn-danger' id={val.id} onClick={handleClick}>
												Remove
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
				</div>
				<div className='col-sm-12 col-md-12 col-lg-6 col-xl-6'>
					<br />
					<div className='container'>
						<div className='row justify-content-center'>
							<div className='col-sm-12 col-md-12 col-lg-8'>
								<table className='table table-sm'>
									<thead className='thead-dark'>
										<tr>
											<th scope='col' colSpan='3'>
												<h5 className='text-uppercase'>Sum</h5>
											</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<th scope='row' style={{ width: '10%' }}>
												<p>Quanlity:</p>
											</th>
											<td>
												<p>{sumTotal.quantity} Item</p>
											</td>
										</tr>
										<tr>
											<th scope='row' style={{ width: '10%' }}>
												<p>Total:</p>
											</th>
											<td>
												<p>{sumTotal.sum}</p>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div className='row justify-content-center'>
							<div className='com-sm-3'>
								<Link to='/payment' className='nav-link text-light'>
									<button className='btn btn-info  text-uppercase'>purchase</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;
