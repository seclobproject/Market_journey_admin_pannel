import { createContext, useEffect } from "react";
import { useState } from "react";

export const ContextData = createContext();

export const ContextDataProvider = ({ children }) => {
  const [user,setUser]=useState(null)
  console.log(user,'user')
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hamburgClicked, setHamburgClicked] = useState(true);
  console.log(hamburgClicked,'hamburgClicked')


  const getToken = async(token) => {
    try {
      const decoded =await jwtDecode(token);
      setUser({
        user_id:decoded?.id,
        token:token,
        role:decoded?.role
      });
    } catch (err) {
      Show_Toast('invalid token',false)
      console.log('Invalid token');
    }
  };

  const Check_Validation = (event, fun_name, setState) => {
    const form = event.currentTarget;
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
    <ContextData.Provider value={{ Check_Validation ,hamburgClicked,setHamburgClicked ,setUser,user,getToken,isLoggedIn, setIsLoggedIn}}>
      {children}
    </ContextData.Provider>
  );










  









 


    

  


  
  



  

  useEffect(() => {
  
  }, [])
  

  

  return (
    <ContextData.Provider
      value={{
       
        hamburgClicked,
        setHamburgClicked,
      


      }}>
      {children}
    </ContextData.Provider>
  );
};
