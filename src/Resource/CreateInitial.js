export const Initial = {
	Cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
	Auth: localStorage.getItem('auth')
		? JSON.parse(localStorage.getItem('auth'))
		: {
				Token: '',
				isAuth: false,
				User: null,
		  },
};
