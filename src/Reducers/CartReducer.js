const CartReducer = (state, action) => {
	switch (action.type) {
		case 'ADD': {
			const data = action.data;
			if (state.length > 0) {
				const cartTmp = [...state];
				const index = cartTmp.findIndex((val) => val.id == data.id);
				if (index > -1) {
					cartTmp[index].quantity += data.quantity;
				} else {
					cartTmp.push(data);
				}
				localStorage.setItem('cart', JSON.stringify(cartTmp));
				return cartTmp;
			}
			localStorage.setItem('cart', JSON.stringify([...state,data]));
			return [...state,data];
		}
		case 'EDIT':{
			const data = action.data;

			const cartTmp = [...state];
			const index = cartTmp.findIndex(val=>val.id==data.id);
			if(index>-1){
				cartTmp[index].quantity=parseInt(data.quantity);
				localStorage.setItem('cart', JSON.stringify(cartTmp));
				return cartTmp;
			}
			return state;
		}
		case 'REMOVE':{
			const data = action.data;

			const cartTmp = [...state];
			const index = cartTmp.findIndex(val=>val.id==data.id);
			if(index>-1){
				cartTmp.splice(index,1);
				localStorage.setItem('cart', JSON.stringify(cartTmp));
				return cartTmp;
			}
			return state;
		}
		default:
			return state;
	}
};

export default CartReducer;
