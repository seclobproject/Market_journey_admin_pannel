import React, { useContext } from "react";
import MenuItem from "./MenuItem";
import { Link } from "react-router-dom";
import { ContextData } from "../../Services/Context";
import { SidebarAnimation } from "../../libs/FramerMotion";
function Sidebar() {
  const { setHamburgClicked, hamburgClicked } = useContext(ContextData);

  const menus = [
    { title: "Dashboard", icon: "fas fa-chart-line", route: "dashboard" },
    {
      title: "Locations",
      icon: "fas fa-map-marker-alt",
      sub: [
        { title: "State", route: "locations/state" },
        { title: "District", route: "locations/district" },
        {
          title: "Zonal",
          route: "locations/zonal",
          // icon: "fas fa-landmark",
        },
        {
          title: "Panchayath",
          route: "locations/panchayath",
        },
      ],
    },
    { title: "Package", icon: "fas fa-box", route: "packages" },
   
    {
      title: "Users",
      icon: "fas fa-users",
      sub: [
        { title: "All Users", route: "member" },
        {
          title: "Pending Users",
          route: "user/pending",
        },
        {
          title: "Pending Subscription",
          route: "user/pending-renewals",
        },
        {
          title: "Subscription History",
          route: "user/subscription-history",
        },
      ],
    },
    

    {
      title: "Demat Account",
      icon: "fas fa-chart-pie",
      sub: [
        { title: "All Demat Accounts", route: "demat-accounts" },
        {
          title: "Pending Account",
          route: "pending/accounts",
        },
      ],
    },
    {
      title: "Bonus History",
      icon: "fas fa-clock",
      route: "user/bonnushistory",
    },

  

    {
      title: "Withdrawals",
      icon: "fas fa-money-bill",
      sub: [
        { title: "Pending Withdrawals", route: "pending/withraw" },
        { title: "Withdrawals History", route: "withraw/history" },
      ],
    },
    {
      title: "Autopool Wallet",
      icon: "fas fa-user",
      sub: [
        { title: "Distribute History", route: "autopool-wallet/distribute" },

        { title: "Credit History", route: "autopool-wallet/history" },
      ],
    },
    { title: "Reports", icon: "fas fa-file-alt", route: "reports" },

    {
      title: "Uploads",
      icon: "fas fa-cloud-upload-alt",
      sub: [
        {
          title: "Upload Image",
          route: "user/uploads",
        },

        {
          title: "Upload Video",
          route: "user/videos",
        },
      ],
    },

    { title: "Alerts", icon: "fas fa-bell", route: "user/alerts" },
    { title: "Live News", icon: "fas fa-newspaper", route: "user/news" },
    { title: "Awards & Rewards", icon: "fas fa-trophy", route: "user/awards" },
  ];

  return (
    <>
      <aside className="left-sidebar">
        <SidebarAnimation>
          <div>
            <div className="brand-logo d-flex align-items-center justify-content-center">
              <Link to={undefined} className="text-nowrap logo-img ">
                <a
                  href={undefined}
                  className="text-nowrap logo-img text-center d-block py-3 w-100"
                >
                  <img
                    src="/dist/images/Remj.png"
                    alt="Logo"
                    width="100"
                    height="50"
                  />
                </a>{" "}
              </Link>

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
    </>
  );
}

export default Sidebar;
