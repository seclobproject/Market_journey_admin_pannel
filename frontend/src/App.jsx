import React from "react";
import OutletConnection from "./Routes/OutletConnection";
import Home from "./pages/private/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/public/Login";
import Member from "./pages/private/Member";
import Package from "./pages/private/Package";
import Forgotpassword from "./pages/public/Forgotpassword";
import State from "./pages/private/Locations/State";
import District from "./pages/private/Locations/District";


function App() {
  return (
    <>
      <Routes>
        <Route index element={<Login />} />
         <Route path="/forgotpassword" element={<Forgotpassword/>}/>
         <Route path="/" element={<OutletConnection />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/member" element={<Member />} />
          <Route path="/packages" element={<Package />}/>
          <Route path="/locations/state" element={<State />}/>
          <Route path="/locations/district" element={<District />}/>



        </Route>
      </Routes>
    </>
  );
}

export default App;
