import { useState, useEffect, useContext } from 'react';
import { MyContext } from '../../../../Context/TechShopContext';
import { CartService } from '../../../../Services/CartService';
import { useHistory } from 'react-router-dom';
const PaymentData = (Errors) => {
	const ctx = useContext(MyContext);
	const cart = [...ctx.carts.cart];
	const userId = ctx.auths.auth.User.id;
	const token = ctx.auths.auth.Token;
	const [value, setValue] = useState({ address: '', phoneNumber: '' });
	const [error, setError] = useState({ address: '', phoneNumber: '' });
	const [loading, setLoading] = useState(false);
	const history = useHistory();
	const sumQuatity = () => {
		let sum = 0;
		for (const item of cart) {
			sum += item.quantity;
		}
		return sum;
	};

	const toTalPrice = () => {
		let sum = 0;
		for (const cartItem of cart) {
			sum += cartItem.quantity * cartItem.price;
		}
		return sum;
	};

	const billDetail = () => {
		const arr = [];
		cart.map((p) => arr.push({ ProductId: p.id, Quanlity: p.quantity, Price: p.price }));
		return arr;
	};

	const getDay = (date) => {
		const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
		const day = parseInt(date.getDate()) < 10 ? `0${date.getDate()}` : `${date.getDate()}`;

		return `${date.getFullYear()}-${month}-${day}`;
	};

	const paying = async (e) => {
		e.preventDefault();
		setError((pre) => (pre = Errors(value)));
		if (value.phoneNumber && value.address && value.phoneNumber.match(/[0-9]/)) {
			const date = new Date(Date.now());
			const currentDay = getDay(date);
			const price = toTalPrice();

			const Bill = {
				PhoneNumber: parseInt(value.phoneNumber),
				Address: value.address,
				Date: currentDay,
				TotalPrice: price,
				UserId: userId,
			};
			const BillDetail = billDetail();

			const payload = {
				Bill,
				BillDetail,
			};
			await add(payload, token);
		}
	};

	const handleChange = (e) => {
		const { value, name } = e.target;
		setValue((pre) => (pre = { ...pre, [name]: value }));
	};

	const add = async (payload, token) => {
		setLoading((pre) => (pre = !pre));

		const resp = await CartService.payForCart(payload, token);
		const data = resp.data;

		if (data && data.status) {
			setLoading((pre) => (pre = !pre));
			setValue((pre) => (pre = { ...pre, address: '', phoneNumber: '' }));
            localStorage.removeItem('cart');
			history.push('/');
		} else {
			if (!resp || resp.status == 401) {
				localStorage.removeItem('auth');
				history.push('/login');
			}
			console.log(resp.errors);
			setLoading((pre) => (pre = !pre));
		}
	};

	return {
		handleChange,
		paying,
		value,
		loading,
		toTalPrice,
		sumQuatity,
		error,
	};
};

export default PaymentData;
