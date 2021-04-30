import { useEffect, useState } from 'react';
import {NavService} from '../../../Services/NavService';
const NavData = () => {
    const [value,setValue] = useState([]);
    const [loading,setLoading] = useState(false);

    const [search,setSearch] = useState('');
    const [result,setResult] = useState([]);
    const [hideResult,setHidle] = useState(false);

    useEffect( async () => {
        await navBar();
    }, [])

    const navBar = async () => {
        setLoading(pre=>pre=!pre);
        const resp = await NavService.NavData();
        const data= resp.data;
        if(data.status){
            setValue(pre=>pre=data.data);
        }
        else{
            console.log(data);
        }
        setLoading(pre=>pre=!pre); 
    }

    const handleChange = async e => {
        const val = e.target.value;
        setSearch(pre=>pre=val);
        if(!val){
            setHidle(pre=>pre=false);
        }
        else{
            setHidle(pre=>pre=true);
            await searchDT(val);
        }
        
    }

    const searchDT = async (regex) => {
        setLoading(pre=>pre=!pre);
        const resp = await NavService.searchProduct(regex);
        const data = resp.data;

        if(data.status){
            setResult(pre=>pre=[...data.data]);
            console.log(data.data);
        }
        else{
            console.log(data.errors);
        }
        setLoading(pre=>pre=!pre);
    }
    
    

    return {
        value,
        loading,
        handleChange,
        search,
        hideResult,
        result
    }
     
};

export default NavData;
