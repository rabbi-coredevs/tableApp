import axios from "axios";
const uri = 'http://localhost:4000/api';


const config= {
    withCredentials: true,
 }

 export const getApiCall = async(endpoint,data) =>{
    try{
       return await axios.get(uri+endpoint,{
          params:{
             data,
          },
          ...config
       })
    }
    catch(error){
       console.log(error);
    }
 }
 
 export const postApiCall= async(endpoint, data={})=>{
    try {
     return await axios.post(uri+endpoint,data,{...config});  
    } catch (error) {
     console.log(error);
     return error?.response;
    }
 }

 export const patchApiCall= async(endpoint, data={})=>{
   try {
    return await axios.post(uri+endpoint,data,{...config});  
   } catch (error) {
    console.log(error);
    return error?.response;
   }
}