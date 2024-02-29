import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { ContextData } from "../Services/Context";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate =useNavigate();
  const{setHamburgClicked,hamburgClicked,logout,user}=useContext(ContextData)
  
console.log(user,"user from headre")
  const handleLogout = () => {
    localStorage.removeItem("User");
    navigate("/");
    logout()

  };

  return (

        <>
   <header className="app-header"> 
  <nav className="navbar navbar-expand-lg navbar-light">
    <ul className="navbar-nav">
      <li className="nav-item">
        <a className="nav-link sidebartoggler nav-icon-hover ms-n3" id="headerCollapse" href={undefined} onClick={()=>setHamburgClicked(!hamburgClicked)}>
          <i className="ti ti-menu-2" />
        </a>
      </li>
    </ul>
 
    {/* <button className="navbar-toggler p-0 border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="p-2">
        <i className="ti ti-dots fs-7" />
      </span>
    </button> */}
    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
      <div className="d-flex align-items-center justify-content-between">
        <a href="javascript:void(0)" className="nav-link d-flex d-lg-none align-items-center justify-content-center" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobilenavbar" aria-controls="offcanvasWithBothOptions">
          <i className="ti ti-align-justified fs-7" />
        </a>
        <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-center">

          <li className="nav-item dropdown">
          
         
            <div className="navbar-collapse justify-content-end px-0" id="navbarNav">
  <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-end">
    <li className="nav-item dropdown">
      <a className="nav-link nav-icon-hover" href="javascript:void(0)" id="drop2" data-bs-toggle="dropdown" aria-expanded="false">
      <img src="../../dist/images/profile/user-1.jpg" className="rounded-circle" width={35} height={35} alt />
      </a>
      <div className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up" aria-labelledby="drop2">
        <div className="message-body">
          <Link to={'/admin/profile'} className="d-flex align-items-center gap-2 dropdown-item">
            <i className="ti ti-user fs-6" />
            <p className="mb-0 fs-3">My Profile</p>
          </Link>
          <Link to={'/resetpassword'} className="d-flex align-items-center gap-2 dropdown-item">
            <i className="ti ti-mail fs-6" />
            <p className="mb-0 fs-3">Change Password</p>
          </Link>
         
          <a href={undefined}  onClick={handleLogout} className="btn btn-cancel mx-3 mt-2 d-block">Logout</a>
        </div>
      </div>
    </li>
  </ul>
</div>

          </li>
        </ul>
      </div>
    </div>
  </nav>
</header>
    </>

  );
}

export default Header;
