import React, { useContext } from "react";
import MenuItem from "./MenuItem";
import { Link } from "react-router-dom";
import { ContextData } from "../../Services/Context";
import { SidebarAnimation } from "../../libs/FramerMotion";
import { Helmet } from 'react-helmet';
function Sidebar() {
  const { setHamburgClicked, hamburgClicked } = useContext(ContextData);

  const menus = [
    { title: "Dashboard", icon: "fas fa-chart-line", route: "dashboard" },
    { title: "Package", icon: "fas fa-box", route: "packages" },
    {
      title: "Users",
      icon: "fas fa-users",
      sub: [
        { title: "All Users", route: "member"},
        {
          title: "Pending Users",
          route: "user/pending",
          // icon: "fas fa-user-check",
        },

        {
          title: "Franchise Users",
          route: "settings-invoice",
          // icon: "fas fa-building",
        },
      ],
    },
    {
      title: "Locations",
      icon: "fas fa-map-marker-alt",
      sub: [
        { title: "State", route: "locations/state",  },
        { title: "District", route: "locations/district",},
        {
          title: "Zonal",
          route: "locations/zonal",
          // icon: "fas fa-landmark",
        },
        {
          title: "Panchayath",
          route: "locations/panchayath",
          // icon: "fas fa-landmark",
        },
      ],
    },

    {
      title: "Uploads",
      icon: "fas fa-cloud-upload-alt",
      // route: "user/uploads",
      sub: [
        {
          title: "Upload Image",
          route: "user/uploads",
          // icon: "fas fa-user-check",
        },

        {
          title: "Upload Video",
          route: "user/videos",

          // icon: "fas fa-building",
        },
     
      ],
    },

    { title: "Alerts", icon: "fas fa-bell", route: "user/alerts" },
    { title: "Live News", icon: "fas fa-newspaper", route: "user/news" },

    {
      title: "Withdrawals",
      icon: "fas fa-money-bill",
      sub: [
        { title: "Withdraw History", route: "withraw/history",  },
        { title: "Pending withrawals", route: "pending/withraw",  },

      ],
      
    } ,  
    { title: "Awards & Rewards", icon: "fas fa-trophy", route: "user/awards" },
    {
      title: "My Account",
      icon: "fas fa-user",
      sub: [
        { title: "Profile", route: "admin/profile",  },
        { title: "Change password", route: "resetpassword",  },

      ],
      
    }
    
  ];

  return (
    <>
      <aside className="left-sidebar">
        <SidebarAnimation>
          <div>
            <div className="brand-logo d-flex align-items-center justify-content-center">
              <Link to={undefined} className="text-nowrap logo-img ">
              <a href={undefined} className="text-nowrap logo-img text-center d-block py-3 w-100">
  <img src="/dist/images/marketlogo.png" alt="Logo" width="100" height="50" />
</a>              </Link>

              <div
                className="close-btn d-lg-none d-block sidebartoggler cursor-pointer"
                id="sidebarCollapse"
              >
                <i
                  className="ti ti-x fs-8 sm-3"
                  onClick={() => setHamburgClicked(!hamburgClicked)}
                />
              </div>
            </div>
            {/* Sidebar navigation*/}
            <nav className="sidebar-nav scroll-sidebar" data-simplebar>
              <ul id="sidebarnav">
                {menus.map((menu, index) => {
                  return <MenuItem key={index} menu={menu} />;
                })}
              </ul>
            </nav>
          </div>
        </SidebarAnimation>
      </aside>
      
      {/* <Helmet>
      <script src="public/dist/js/sidebarmenu.js"></script>

      </Helmet> */}
    </>
  );
}

export default Sidebar;
