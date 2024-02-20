import React, { useContext } from "react";
import MenuItem from "./MenuItem";
import { Link } from "react-router-dom";
import { ContextData } from "../../Services/Context";
import { SidebarAnimation } from "../../libs/FramerMotion";

function Sidebar() {
  const { setHamburgClicked, hamburgClicked } = useContext(ContextData);

  const menus = [
    { title: "Dashboard", icon: "fas fa-chart-line", route: "dashboard" },
    { title: "Package", icon: "fas fa-box", route: "packages" },
    {
      title: "Users",
      icon: "fas fa-users",
      sub: [
        { title: "All Users", route: "member", icon: "fas fa-users" },
        {
          title: "View Users",
          route: "settings-locations",
          icon: "fas fa-user-check",
        },

        {
          title: "Franchise Users",
          route: "settings-invoice",
          icon: "fas fa-building",
        },
      ],
    },
    {
      title: "Locations",
      icon: "fas fa-map-marker-alt",
      sub: [
        { title: "State", route: "settings-emirates", icon: "fas fa-flag" },
        { title: "District", route: "settings-locations", icon: "fas fa-city" },
        {
          title: "Constituency",
          route: "settings-invoice",
          icon: "fas fa-landmark",
        },
      ],
    },

    {
      title: "Uploads",
      icon: "fas fa-cloud-upload-alt",
      sub: [
        { title: "Videos", route: "settings-emirates", icon: "fas fa-video" },
        { title: "Images", route: "settings-locations", icon: "far fa-image" },
      ],
    },

    { title: "Alerts", icon: "fas fa-bell", route: "" },
    { title: "Live News", icon: "fas fa-newspaper", route: "" },
    { title: "Wallets", icon: "fas fa-wallet", route: "" },
    { title: "Withdrawals", icon: "fas fa-money-bill", route: "" },
    { title: "Awards & Rewards", icon: "fas fa-trophy", route: "" },
  ];

  return (
    <>
      <aside className="left-sidebar">
        <SidebarAnimation>
          <div>
            <div className="brand-logo d-flex align-items-center justify-content-center">
              <Link to={"/"} className="text-nowrap logo-img ">
                <h2 className="fw-bolder">MJ</h2>
              </Link>

              <div
                className="close-btn d-lg-none d-block sidebartoggler cursor-pointer"
                id="sidebarCollapse"
              >
                <i
                  className="ti ti-x fs-8 text-muted"
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
      {/* 
      <Helmet>
      <script src="/public/dist/js/sidebarmenu.js"></script>

      </Helmet> */}
    </>
  );
}

export default Sidebar;
