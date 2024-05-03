import { createContext, useEffect } from "react";
import { Show_Toast } from "../utils/Toastify";
import { useState } from "react";
import {jwtDecode} from "jwt-decode"
import { json } from "react-router-dom";
export const ContextData = createContext();

export const ContextDataProvider = ({ children }) => {
  const [user,setUser]=useState(null)
  const[hamburgClicked,setHamburgClicked]=useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false);



  const storedAuthState=sessionStorage.getItem('isAuthenticated');
  const initialAuthState=storedAuthState?JSON.parse(storedAuthState):false
  const [loggedIn, setLoggedIn] = useState(initialAuthState);

useEffect(()=>{
sessionStorage.setItem('isAuthenticated',JSON.stringify(loggedIn))
},[loggedIn]);

const loginFun =()=>{
  setLoggedIn(true)
};
const Logout =()=>{
  setLoggedIn(false)
};
  

  const Check_Validation = (event, fun_name, setState) => {
    const form = event.currentTarget;
    console.log(form,"form")
    event.preventDefault();
    setState(true);
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return false;
    } else {
      fun_name();
      return true;
    }
  };

  return (
    <ContextData.Provider value={{ Check_Validation ,hamburgClicked,setHamburgClicked ,setUser,user,isLoggedIn, setIsLoggedIn,loginFun,Logout,loggedIn}}>
      {children}
    </ContextData.Provider>
  );
};
