import {useState,useContext} from 'react'
import {UserService} from '../../../Services/UserService';

import {MyContext} from '../../../Context/TechShopContext';

import {useHistory} from 'react-router-dom'

const UseLoginForm = (LoginValidate,oldLocation) => {
    const [value,setValue] = useState({username:'',password:''});
    const [error,setError] = useState({username:'',password:'',complete:''});
    const [loading,setLoading] = useState(false);

    const ctx = useContext(MyContext);
    
    const history = useHistory();

    const handleChange = e => {
        const {name,value}  = e.target;
		setValue((pre) => (pre = { ...pre, [name]: value}));
    }
    const handleSubmit = async e => {
        e.preventDefault();
        setError(pre=>pre=LoginValidate(value));

        if(value.username && value.password){
            await login();
        }
    }

    const login = async ()=>{
        setLoading(pre=>pre=!pre);
        const resp = await UserService.userLogin({UserName:value.username,Password:value.password});
        const data=resp.data;

        if(data.status){
            setLoading(pre=>pre=!pre);
            ctx.auths.authDispatch({type:'AUTH_USER',data:{token:data.data.token,User:data.data.user}});
            setValue(pre=>pre={...pre,username:'',password:''});
            history.push(oldLocation.pathname);
        }
        else{
            console.log(resp.errors);
            setError(pre=>pre={...pre,complete:resp.errors.message});
            setLoading(pre=>pre=!pre);
        }
    }

    return {
        value,
        handleChange,
        handleSubmit,
        error,
        loading
    }
}

export default UseLoginForm
