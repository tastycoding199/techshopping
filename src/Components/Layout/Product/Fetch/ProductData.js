import { useEffect, useState } from 'react';

import { ProductService } from '../../../../Services/ProductService';

const ProductData = (categoryid = 1, brandid = 1) => {

	const [value, setValue] = useState([]);
	const [loading, setLoading] = useState(false);

		useEffect(async () => {
			await products();
		}, [categoryid,brandid]);

	const products = async () => {
		setLoading((pre) => (pre = !pre));
		const resp = await ProductService.fetchProducts(categoryid, brandid);
		const data = resp.data;
		
		if (data.status) {
			setValue((pre) => (pre = data.data));
		} else {
			console.log(resp.errors);
		}
		setLoading((pre) => (pre = !pre));
	};

	return {
		value,
		loading,
	};
};

export default ProductData;
