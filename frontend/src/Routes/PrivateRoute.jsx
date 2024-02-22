import React, { useContext } from 'react'
import { ContextData } from '../Services/Context'
import { Navigate } from 'react-router-dom'


function PrivateRoute({children}) {
    const {isLoggedIn}=useContext(ContextData)
    console.log(isLoggedIn,"oooo")

    if(!isLoggedIn){
        return <Navigate to="/" />
    }
    if(isLoggedIn!=undefined||isLoggedIn!=null){
        return children;
    }
    else{
        return <Navigate to="/" />

    }
  
}

export default PrivateRoute