import React from "react";
import OutletConnection from "./Routes/OutletConnection";
import Home from "./pages/private/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/public/Login";
import Member from "./pages/private/Member";
import Package from "./pages/private/Package";
import { dashboardpath, memberpath, packagepath } from "./utils/Constants";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/" element={<OutletConnection />}>
          <Route path={dashboardpath} element={<Home />} />
          <Route path={memberpath} element={<Member />}/>
          <Route path={packagepath} element={<Package />}>

            
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
