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
import Viewdetails from "./pages/private/Users/Viewdetails";
import Awards from "./pages/private/Lives/Awards";
import Uploads from "./pages/private/Lives/Uploads";
import Alert from "./pages/private/Lives/Alert";
import Uploadvideos from "./pages/private/Lives/Uploadvideos";
import Livenew from "./pages/private/Lives/Livenew";
import Withrawhistroy from "./pages/private/Withrawals/Withrawhistroy";
import Pendingwithraw from "./pages/private/Withrawals/Pendingwithraw";
import Viewtree from "./pages/private/Users/Viewtree";
import Bonnushistory from "./pages/private/Users/Bonnushistory";
import Pendingaccounts from "./pages/private/Demat/Pendingaccounts";
import Withdraw from "./pages/private/Autopool/Withdraw";
import Distribute from "./pages/private/Autopool/Distribute";
import Alldemate from "./pages/private/Demat/Alldemate";


function App() {
  return (
    <>
      <Routes>
        <Route index element={<Login />} />
         {/* <Route path="/forgotpassword" element={<Forgotpassword/>}/> */}
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
          <Route path="admin/myprofile" element={<Myprofile />}/>
          <Route path="/user/details" element={<Viewdetails />}/>
          <Route path="/user/awards" element={<Awards />}/>
          <Route path="/user/uploads" element={<Uploads />}/>
          <Route path="/user/alerts" element={<Alert />}/>
          <Route path="/user/videos" element={<Uploadvideos />}/>
          <Route path="/user/news" element={<Livenew />}/>
          <Route path="/withraw/history" element={<Withrawhistroy />}/>
          <Route path="/pending/withraw" element={<Pendingwithraw />}/>
          <Route path="/user/downline" element={<Viewtree />}/>
          <Route path="/user/bonnushistory" element={<Bonnushistory />}/>
          <Route path="/pending/accounts" element={<Pendingaccounts />}/>
          <Route path="/demat-accounts" element={<Alldemate />}/>

          <Route path="/autopool-wallet/history" element={<Withdraw/>}/>
          <Route path="/autopool-wallet/distribute" element={<Distribute />}/>






 









        </Route>
      </Routes>
    </>
  );
}

export default App;
