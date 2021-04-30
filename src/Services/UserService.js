import axios from 'axios';

import { Stuff } from '../../Stuff';

export const UserService = {
	userRegister: async (data) => {
		if (!data || !data.UserName) {
			return null;
		}
		let resp = null;
		try {
			resp = await axios({
				method: 'POST',
				url: `${Stuff.URL}/api/User/Register`,
				data: data,
			});
		} catch (error) {
			resp = error.response.data;
		} finally {
			return resp;
		}
	},
	userLogin:async (data) => {
		if(!data || !data.UserName){
			return null;
		}
		let resp = null;
		try {
			resp = await axios({method:'POST',url:`${Stuff.URL}/api/User/Login`,data:data});
		} catch (error) {
			resp=error.response.data;
		}
		finally{
			return resp;
		}
	}
};
