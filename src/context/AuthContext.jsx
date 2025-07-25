import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { URL_BACK } from "../config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(null)
  const [authMessage, setAuthMessage] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [registered, setRegistered] = useState(false)

  useEffect(()=>{
    async function checkLoign() {
      try {
        const response = await fetch(URL_BACK + 'verifyToken', { credentials: "include" });
        const data = await response.json();
        if (data && data.status) {
          setIsAuthenticated(true);
          setUser(data.user);
          getUsers()
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error(error);
        setIsAuthenticated(false);
        setUser(null);
      }
  }
    checkLoign()
  }, [])

  const getUsers = async () => {
      try {
      const response = await fetch(URL_BACK + "usuarios");
      const data = await response.json();
      if(data && data.status){
        setUsers(data.users)
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(()=>{
    const getUsers = async () => {
      try {
      const response = await fetch(URL_BACK + "usuarios");
      const data = await response.json();
      if(data && data.status){
        setUsers(data.users)
      }
    } catch (error) {
      console.error(error);
    }
  }
    getUsers()
  }, [])


  const login = async (user) => {
    if (!user) return { message: "need a user" };
    try {
      const response = await fetch(URL_BACK + "login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(user)
      });
      const data = await response.json()
      if(data && data.status){
        setIsAuthenticated(true)
        setUser(data.user)
        await getUsers()
      }
      setAuthMessage(data.message)

    } catch (error) {
      console.error(error)
    }
  }

  const register = async (user) => {
    if (!user) return { message: "need a user" };
    try {
      const response = await fetch(URL_BACK + "register", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(user)
      })
       const data = await response.json();

      if(data && data.status){
        setRegistered(true)
        await getUsers()
      }
    } catch (error) {
      console.error(error);
      
    }
  }

  const logout = async () => {
      try{
        const response = await fetch(URL_BACK + "logout", {credentials: 'include'})
        const data = await response.json()
        if(data && data.status){
            setIsAuthenticated(false)
            setUser(null)
          }
      }catch(error){
        console.error(error);
      }
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      isAuthenticated,
      registered, 
      register, 
      logout, 
      users,
      authMessage }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
