const AuthReducer = (state,action) => {
    switch (action.type) {
        case 'AUTH_USER':{
            const dt = action.data;
            localStorage.setItem('auth',JSON.stringify({...state,Token:dt.token,isAuth:!state.isAuth,User:dt.User}));
            return {...state,Token:dt.token,isAuth:!state.isAuth,User:dt.User};
        }
        default:
            return state;
    }
}

export default AuthReducer;
