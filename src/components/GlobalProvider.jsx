import { useEffect } from "react";
import { getApiCall } from "../utils/apiCaller";
import { useDispatch } from "react-redux";
import { removeUser, setUser } from "../features/admins/userSlice";

const GlobalProvider = ({children}) => {

    const dispatch= useDispatch();
    useEffect(()=> {
        getApiCall('/user/me').then(res=>{
            if(res.status===200){
                dispatch(setUser(res.data));
            }
            else {
                dispatch(removeUser());
            
            }
           
        })
    },[]);
  return (
    <div>
        {children}
      
    </div>
  )
};

export default GlobalProvider;
