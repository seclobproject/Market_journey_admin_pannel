import React from 'react'
import { Helmet } from 'react-helmet'

function Myprofile() {
  return (
    <>
  
    <div className="container-fluid">
      
      <div className="card overflow-hidden">
        <div className="card-body p-0">
        <div className="card bg-info-subtle shadow-none position-relative overflow-hidden mb-4">
        <div className="card-body px-4 py-3">
          <div className="row align-items-center">
            <div className="col-9">
              <h4 className="fw-semibold mb-8" style={{color:'white'}} >Admin Profile</h4>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a className="text text-decoration-none" style={{color:'white'}} href={undefined}>My account</a>
                  </li>
                  <li className="breadcrumb-item" style={{color:'white'}}aria-current="page">Profile</li>
                </ol>
              </nav>
            </div>
            {/* <div className="col-3">
              <div className="text-center mb-n5">
                <img src="/public/dist/images/web logo-01.png" alt className="img-fluid mb-n4" />
              </div>
            </div> */}
          </div>
        </div>
      </div>          <div className="row align-items-center">
            <div className="col-lg-4 order-lg-1 order-2">
              <div className="d-flex align-items-center justify-content-around m-4">
                <div className="text-center">
                  {/* <i className="ti ti-file-description fs-6 d-block mb-2" /> */}
                  {/* <h4 className="mb-0 fw-semibold lh-1">938</h4>
                  <p className="mb-0 fs-4">Posts</p> */}
                </div>
                <div className="text-center">
                  {/* <i className="ti ti-user-circle fs-6 d-block mb-2" /> */}
                  {/* <h4 className="mb-0 fw-semibold lh-1">3,586</h4>
                  <p className="mb-0 fs-4">Followers</p> */}
                </div>
                <div className="text-center">
                  {/* <i className="ti ti-user-check fs-6 d-block mb-2" /> */}
                  {/* <h4 className="mb-0 fw-semibold lh-1">2,659</h4>
                  <p className="mb-0 fs-4">Following</p> */}
                </div>
              </div>
            </div>
            <div className="col-lg-4 mt-n3 order-lg-2 order-1">
              <div className="mt-n5">
                <div className="d-flex align-items-center justify-content-center mb-2">
                  <div className="linear-gradient d-flex align-items-center justify-content-center rounded-circle" style={{width: 110, height: 110,zIndex:9}} >
                    <div className="border border-4 border-white d-flex align-items-center justify-content-center rounded-circle overflow-hidden" style={{width: 100, height: 100}} >
                      <img src="/public/dist/images/web logo-01.png" alt className="w-50 h-50" />
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h5 className="fs-5 mb-0 fw-semibold"  style={{ color: "#F7AE15" }}>Market Journey</h5>
                </div>
              </div>
            </div>
            
          </div>
          <ul className="nav nav-pills user-profile-tab justify-content-end mt-2 bg-info-subtle rounded-2" id="pills-tab" role="tablist">
        
           
            
            <li className="nav-item" role="presentation">
              <button className="nav-link position-relative rounded-0 d-flex align-items-center justify-content-center bg-transparent fs-3 py-6" id="pills-gallery-tab" data-bs-toggle="pill" data-bs-target="#pills-gallery" type="button" role="tab" aria-controls="pills-gallery" aria-selected="false">
                {/* <i className="ti ti-photo-plus me-2 fs-6" /> */}
                {/* <span className="d-none d-md-block" style={{color:'black'}}>Gallery</span> */}
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="tab-content" id="pills-tabContent">
        <div className="tab-pane fade show active" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex={0}>
          <div className="row">
            <div className="col-lg-4">
              <div className="card shadow-none border">
                <div className="card-body">
                  <a className="nav-link nav-icon-hover" href="javascript:void(0)" id="drop2" data-bs-toggle="dropdown" aria-expanded="false">
      <img src="../../dist/images/profile/user-1.jpg" className="rounded-circle" width={100} height={100} alt />
      </a>
      <div className=" mt-4">
                  <h5 className="fs-5 mb-0 fw-semibold">Admin</h5>
                </div>
          
                  <ul className="list-unstyled mb- mt-3">
                    {/* <li className="d-flex align-items-center gap-3 mb-4">
                      <i className="ti ti-briefcase text-dark fs-6" />
                      <h6 className="fs-4 fw-semibold mb-0">Sir, P P Institute Of Science</h6>
                    </li> */}
                    <li className="d-flex align-items-center gap-3 mb-4">
                      <i className="ti ti-mail text-dark fs-6" />
                      <h6 className="fs-4 fw-semibold mb-0">admin@gmail.com</h6>
                    </li>
                    {/* <li className="d-flex align-items-center gap-3 mb-4">
                      <i className="ti ti-device-desktop text-dark fs-6" />
                      <h6 className="fs-4 fw-semibold mb-0">www.xyz.com</h6>
                    </li>
                    <li className="d-flex align-items-center gap-3 mb-2">
                      <i className="ti ti-map-pin text-dark fs-6" />
                      <h6 className="fs-4 fw-semibold mb-0">Newyork, USA - 100001</h6>
                    </li> */}
                  </ul>
                </div>
              </div>
           
            </div>
         
          </div>
        </div>
   
      </div>
      
  
 </div>
 




    </>


  )
}
<Helmet>
<script src="./assets/libs/jquery/dist/jquery.min.js"></script>
<script src="./assets/js/app.min.js"></script>
<script src="./assets/js/app.init.js"></script>
<script src="./assets/libs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
<script src="./assets/libs/simplebar/dist/simplebar.min.js"></script>

<script src="./assets/js/sidebarmenu.js"></script>
<script src="./assets/js/theme.js"></script>


</Helmet>

export default Myprofile