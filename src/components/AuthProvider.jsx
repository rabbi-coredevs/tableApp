import { createContext, useEffect, useState } from "react";
import { getApiCall } from "../utils/apiCaller";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        getApiCall('/user/me').then(res=>{
            setLoading(false);
            // console.log(res);
            if(res.status === 200){
                setUser(res.data);
            }  
        })
    },[]);

    if(loading) return <h1>Loading....</h1>
    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
