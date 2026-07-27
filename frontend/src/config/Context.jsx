import React, { createContext, useContext, useEffect, useState } from 'react'
import api from './Api'
import axios from 'axios'

const myContext = createContext()
function APiContext({ children }) {
    const [isAuth, setIsAuth] = useState(false)
    const [isUser, setIsUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const checkAuth = async () => {
        try {
            const res = await api.get("/api/profile");
            setIsAuth(true);
            setIsUser(res.data);
        } catch (error) {
            setIsAuth(false);
            setIsUser(null);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        checkAuth();
    }, []);
    
    const value = { api, isAuth, setIsAuth, isUser, setIsUser,loading,setLoading }
    return (
        <myContext.Provider value={value} >
            {children}
        </myContext.Provider>
    )
}
export const useMyContext = () => useContext(myContext)
export default APiContext