import { createContext, useEffect } from "react";
import { useState } from "react";
import { Show_Toast } from "../utils/Toast";
import {jwtDecode} from "jwt-decode"
import { json } from "react-router-dom";

export const ContextData = createContext();

export const ContextDataProvider = ({ children }) => {
  const [user,setUser]=useState(null)
  const[hamburgClicked,setHamburgClicked]=useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  console.log(isLoggedIn,"logged")

  const storedAuthState=localStorage.getItem('isAuthenticated');
  const initialAuthState=storedAuthState?JSON.parse(storedAuthState):false
  const [loggedIn, setLoggedIn] = useState(initialAuthState);

useEffect(()=>{
localStorage.setItem('isAuthenticated',JSON.stringify(loggedIn))
},[loggedIn]);

const loginFun =()=>{
  console.log(loggedIn,"here  logged in")
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
