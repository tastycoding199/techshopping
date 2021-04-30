import { useState} from 'react';
import {UserService} from '../../../Services/UserService';
import { useHistory } from "react-router-dom";
const UseForm = (RegisterValidate) => {
	

	const [value, setValue] = useState({ username: '', password: '',confirm:''});
	const [error, setError] = useState({ username: '', password: '',confirm:'',complete:''});
	const [loading,setLoading] = useState(false);

	let history = useHistory();

	const hanleChange = e => {
		const {name,value}  = e.target;
		setValue((pre) => (pre = { ...pre, [name]: value}));
	};

    const handleSubmit = async  e => {
        e.preventDefault();
        setError(pre=>pre=RegisterValidate(value));

		if(value.username && value.password && value.password && value.password===value.confirm){
			await userEnrolling();
		}
		
    }

	const userEnrolling = async () => {
		setLoading(pre=>pre=!pre);
		const data = await  UserService.userRegister({
			UserName: value.username,
			Password: value.password,
			Role:'User'
		});
		
		if(data.data.status){
			console.log(data.data);
			setValue(pre=>pre={...value,username:'',password:'',confirm:''});
			setLoading(pre=>pre=!pre);
			history.push('/login');
		}
		else{
			setLoading(pre=>pre=!pre);
			console.log(data.errors);
			setError(pre=>pre={...pre,complete:data.errors.message});
		}
		
	};
    

	return {
        value,
		hanleChange,
        handleSubmit,
        error,
		loading
	};
};

export default UseForm;
