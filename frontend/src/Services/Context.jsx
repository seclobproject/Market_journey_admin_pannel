import { createContext, useEffect } from "react";
import { useState } from "react";
import { Show_Toast } from "../utils/Toast";
import {jwtDecode} from "jwt-decode"

export const ContextData = createContext();

export const ContextDataProvider = ({ children }) => {
  const [user,setUser]=useState(null)
  console.log(user,'user')
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(isLoggedIn,"logged")
  const[hamburgClicked,setHamburgClicked]=useState(false)


  

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
    <ContextData.Provider value={{ Check_Validation ,hamburgClicked,setHamburgClicked ,setUser,user,isLoggedIn, setIsLoggedIn}}>
      {children}
    </ContextData.Provider>
  );
};
