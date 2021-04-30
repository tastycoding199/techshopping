import { useEffect, useState } from 'react'
import { ProductService } from '../../../../Services/ProductService';
const ProductDT = (id) => {
    const [value, setValue] = useState({});
	const [loading, setLoading] = useState(false);

		useEffect(async () => {
			await product();
		}, [id]);

	const product = async () => {
		setLoading((pre) => (pre = !pre));
		const resp = await ProductService.fetchProduct(id);
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
}

export default ProductDT
