import React, { useContext } from "react";
import Sidebar from "../Layout/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import Header from "../Layout/Header";
import { ContextData } from "../Services/Context";
import { Helmet } from "react-helmet";

function OutletConnection() {
  const { hamburgClicked } = useContext(ContextData);

  return (
    <>
      <>
        <div
          className={`page-wrapper  ${
            hamburgClicked ? "mini-sidebar" : "show-sidebar"
          } `}
          id="main-wrapper"
          data-theme="blue_theme"
          data-layout="vertical"
          data-sidebartype={`${hamburgClicked ? "mini-sidebar" : "full"}`}
          data-sidebar-position="fixed"
          data-header-position="fixed"
        >
          <Sidebar />
          <div className="body-wrapper"  >
          <Header />
          <div className="container-fluid px-3 " style={{minHeight:'100vh'}}>
          <Outlet/>
         </div>
        </div>
    
        </div>

        <Helmet>
          <script src="/dist/js/app.init.js"></script>
          <script src="/dist/js/sidebarmenu.js"></script>
        </Helmet>
      </>
    </>
  );
}

export default OutletConnection;
