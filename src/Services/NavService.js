import { Stuff } from '../../Stuff';
import axios from 'axios';

export const NavService = {
	NavData: async () => {
		let resp = null;
		try {
			resp = await axios({ method: 'GET', url: `${Stuff.URL}/api/Nav` });
		} catch (error) {
			resp = error.response.data;
		} finally {
			return resp;
		}
	},
	searchProduct: async (regex) => {
		let resp = null;
		try {
			resp = await axios({
				method: 'POST',
				url: `${Stuff.URL}/api/Product`,
				data: { ProductName: regex },
			});
		} catch (error) {
			resp = error.response.data;
		} finally {
			return resp;
		}
	},
};
