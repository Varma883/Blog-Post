import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// we created a context
const AuthContext = createContext();

//we need to wrap the onbjesct to pass to the children files

export const AuthProvider = ({children})=>{

    const [authToken, setauthToken] = useState(null);
    const [isAuthenticated, setisAuthenticated] = useState(false);
    const [isLoading, setisLoading]=useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem('authToken');
        if(token){
            setauthToken(token);
            setisAuthenticated(true);
        }
        setisLoading(false)

    } ,[]);

    const login =(token) =>{
        localStorage.setItem('authToken', token);
        setauthToken(token);
        setisAuthenticated(true);
        navigate('/');
    };

    const logout =(token) =>{
        localStorage.removeItem('authToken');
        setauthToken(null);
        setisAuthenticated(false)
        navigate('/')
    }

      return (
    <AuthContext.Provider value={{ 
      authToken, 
      isAuthenticated, 
      isLoading, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );


    
};

export const useAuth = () => useContext(AuthContext);