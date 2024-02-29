import React from "react";
import OutletConnection from "./Routes/OutletConnection";
import Home from "./pages/private/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/public/Login";

import Package from "./pages/private/Package";
import Forgotpassword from "./pages/public/Forgotpassword";
import State from "./pages/private/Locations/State";
import District from "./pages/private/Locations/District";
import Zonal from "./pages/private/Locations/Zonal";
import Panchayath from "./pages/private/Locations/Panchayath";
import Member from "./pages/private/Users/Member";
import Pendingusers from "./pages/private/Users/Pendingusers";
import Resetpassword from "./pages/public/Resetpassword";
import Myprofile from "./pages/private/Myprofile";


function App() {
  return (
    <>
      <Routes>
        <Route index element={<Login />} />
         <Route path="/forgotpassword" element={<Forgotpassword/>}/>
         <Route path="/resetpassword" element={<Resetpassword/>}/>
         <Route path="/" element={<OutletConnection />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/member" element={<Member />} />
          <Route path="/packages" element={<Package />}/>
          <Route path="/locations/state" element={<State />}/>
          <Route path="/locations/district" element={<District />}/>
          <Route path="/locations/zonal" element={<Zonal />}/>
          <Route path="/locations/panchayath" element={<Panchayath />}/>
          <Route path="/user/pending" element={<Pendingusers />}/>
          <Route path="/admin/profile" element={<Myprofile />}/>






        </Route>
      </Routes>
    </>
  );
}

export default App;
