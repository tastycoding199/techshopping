import axios from 'axios';
import { Stuff } from '../../Stuff';

export const CartService = {
	payForCart: async (data, token) => {
		if (!data || !token) {
			return null;
		}
		let resp = null;

		try {
			resp = await axios({
				method: 'POST',
				url: `${Stuff.URL}/api/Cart`,
				headers: { 'Authorization': `Bearer ${token}` },
                data:data
			});
		} catch (error) {
			resp = error.response.data;
		} finally {
			return resp;
		}
	},
};
