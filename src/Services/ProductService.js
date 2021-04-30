
import axios from 'axios';
import {Stuff} from '../../Stuff';

export const ProductService = {
    fetchProducts:async (categoryId=1,brandId=1) =>{
        let resp=null;
        try {
            resp = await axios({method:'GET',url:`${Stuff.URL}/api/Product?CategoryId=${parseInt(categoryId)}&BrandId=${parseInt(brandId)}`})
        } catch (error) {
            resp=error.response.data;
        }
        finally{
            return resp;
        }
    },
    fetchProduct: async (id=1)=>{
        let resp=null;
        try {
            resp = await axios({method:'GET',url:`${Stuff.URL}/api/Product/${id}`})
        } catch (error) {
            resp=error.response.data;
        }
        finally{
            return resp;
        }
    }
}