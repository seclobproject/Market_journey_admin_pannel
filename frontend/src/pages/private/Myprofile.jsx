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
              <h4 className="fw-semibold mb-8">Admin Profile</h4>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a className="text text-decoration-none" style={{color:'black'}} href={undefined}>My account</a>
                  </li>
                  <li className="breadcrumb-item" style={{color:'black'}}aria-current="page">Profile</li>
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
                  <i className="ti ti-file-description fs-6 d-block mb-2" />
                  <h4 className="mb-0 fw-semibold lh-1">938</h4>
                  <p className="mb-0 fs-4">Posts</p>
                </div>
                <div className="text-center">
                  <i className="ti ti-user-circle fs-6 d-block mb-2" />
                  <h4 className="mb-0 fw-semibold lh-1">3,586</h4>
                  <p className="mb-0 fs-4">Followers</p>
                </div>
                <div className="text-center">
                  <i className="ti ti-user-check fs-6 d-block mb-2" />
                  <h4 className="mb-0 fw-semibold lh-1">2,659</h4>
                  <p className="mb-0 fs-4">Following</p>
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
                  <h5 className="fs-5 mb-0 fw-semibold">Market Journey</h5>
                </div>
              </div>
            </div>
            
          </div>
          <ul className="nav nav-pills user-profile-tab justify-content-end mt-2 bg-info-subtle rounded-2" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
              <button className="nav-link position-relative rounded-0 active d-flex align-items-center justify-content-center bg-transparent fs-3 py-6" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="true">
                <i className="ti ti-user-circle me-2 fs-6" />
                <span className="d-none d-md-block " style={{color:'black'}}>Profile</span>
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link position-relative rounded-0 d-flex align-items-center justify-content-center bg-transparent fs-3 py-6" id="pills-followers-tab" data-bs-toggle="pill" data-bs-target="#pills-followers" type="button" role="tab" aria-controls="pills-followers" aria-selected="false">
                <i className="ti ti-heart me-2 fs-6" />
                <span className="d-none d-md-block" style={{color:'black'}}>Followers</span>
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link position-relative rounded-0 d-flex align-items-center justify-content-center bg-transparent fs-3 py-6" id="pills-friends-tab" data-bs-toggle="pill" data-bs-target="#pills-friends" type="button" role="tab" aria-controls="pills-friends" aria-selected="false">
                <i className="ti ti-user-circle me-2 fs-6" />
                <span className="d-none d-md-block" style={{color:'black'}}>Friends</span>
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link position-relative rounded-0 d-flex align-items-center justify-content-center bg-transparent fs-3 py-6" id="pills-gallery-tab" data-bs-toggle="pill" data-bs-target="#pills-gallery" type="button" role="tab" aria-controls="pills-gallery" aria-selected="false">
                <i className="ti ti-photo-plus me-2 fs-6" />
                <span className="d-none d-md-block" style={{color:'black'}}>Gallery</span>
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
                    <li className="d-flex align-items-center gap-3 mb-4">
                      <i className="ti ti-briefcase text-dark fs-6" />
                      <h6 className="fs-4 fw-semibold mb-0">Sir, P P Institute Of Science</h6>
                    </li>
                    <li className="d-flex align-items-center gap-3 mb-4">
                      <i className="ti ti-mail text-dark fs-6" />
                      <h6 className="fs-4 fw-semibold mb-0">xyzjonathan@gmail.com</h6>
                    </li>
                    <li className="d-flex align-items-center gap-3 mb-4">
                      <i className="ti ti-device-desktop text-dark fs-6" />
                      <h6 className="fs-4 fw-semibold mb-0">www.xyz.com</h6>
                    </li>
                    <li className="d-flex align-items-center gap-3 mb-2">
                      <i className="ti ti-map-pin text-dark fs-6" />
                      <h6 className="fs-4 fw-semibold mb-0">Newyork, USA - 100001</h6>
                    </li>
                  </ul>
                </div>
              </div>
           
            </div>
         
          </div>
        </div>
        <div className="tab-pane fade" id="pills-followers" role="tabpanel" aria-labelledby="pills-followers-tab" tabIndex={0}>
          <div className="d-sm-flex align-items-center justify-content-between mt-3 mb-4">
            <h3 className="mb-3 mb-sm-0 fw-semibold d-flex align-items-center">Followers <span className="badge text-bg-secondary fs-2 rounded-4 py-1 px-2 ms-2">20</span></h3>
            <form className="position-relative">
              <input type="text" className="form-control search-chat py-2 ps-5" id="text-srh" placeholder="Search Followers" />
              <i className="ti ti-search position-absolute top-50 start-0 translate-middle-y text-dark ms-3" />
            </form>
          </div>
          <div className="row">
            <div className=" col-md-6 col-xl-4">
              <div className="card">
                <div className="card-body p-4 d-flex align-items-center gap-3">
                  <img src="./assets/images/profile/user-1.jpg" alt className="rounded-circle" width={40} height={40} />
                  <div>
                    <h5 className="fw-semibold mb-0">Betty Adams</h5>
                    <span className="fs-2 d-flex align-items-center"><i className="ti ti-map-pin text-dark fs-3 me-1" />Sint Maarten</span>
                  </div>
                  <button className="btn btn-outline-primary py-1 px-2 ms-auto">Follow</button>
                </div>
              </div>
            </div>
            <div className=" col-md-6 col-xl-4">
              <div className="card">
                <div className="card-body p-4 d-flex align-items-center gap-3">
                  <img src="./assets/images/profile/user-2.jpg" alt className="rounded-circle" width={40} height={40} />
                  <div>
                    <h5 className="fw-semibold mb-0">Virginia Wong</h5>
                    <span className="fs-2 d-flex align-items-center"><i className="ti ti-map-pin text-dark fs-3 me-1" />Tunisia</span>
                  </div>
                  <button className="btn btn-outline-primary py-1 px-2 ms-auto">Follow</button>
                </div>
              </div>
            </div>
            <div className=" col-md-6 col-xl-4">
              <div className="card">
                <div className="card-body p-4 d-flex align-items-center gap-3">
                  <img src="./assets/images/profile/user-3.jpg" alt className="rounded-circle" width={40} height={40} />
                  <div>
                    <h5 className="fw-semibold mb-0">Birdie Burgess</h5>
                    <span className="fs-2 d-flex align-items-center"><i className="ti ti-map-pin text-dark fs-3 me-1" />Algeria</span>
                  </div>
                  <button className="btn btn-primary py-1 px-2 ms-auto">Followed</button>
                </div>
              </div>
            </div>
            <div className=" col-md-6 col-xl-4">
              <div className="card">
                <div className="card-body p-4 d-flex align-items-center gap-3">
                  <img src="./assets/images/profile/user-4.jpg" alt className="rounded-circle" width={40} height={40} />
                  <div>
                    <h5 className="fw-semibold mb-0">Steven Lindsey</h5>
                    <span className="fs-2 d-flex align-items-center"><i className="ti ti-map-pin text-dark fs-3 me-1" />Malaysia</span>
                  </div>
                  <button className="btn btn-primary py-1 px-2 ms-auto">Followed</button>
                </div>
              </div>
            </div>
            <div className=" col-md-6 col-xl-4">
              <div className="card">
                <div className="card-body p-4 d-flex align-items-center gap-3">
                  <img src="./assets/images/profile/user-5.jpg" alt className="rounded-circle" width={40} height={40} />
                  <div>
                    <h5 className="fw-semibold mb-0">Hannah Rhodes</h5>
                    <span className="fs-2 d-flex align-items-center"><i className="ti ti-map-pin text-dark fs-3 me-1" />Grenada</span>
                  </div>
                  <button className="btn btn-primary py-1 px-2 ms-auto">Followed</button>
                </div>
              </div>
            </div>
            <div className=" col-md-6 col-xl-4">
              <div className="card">
                <div className="card-body p-4 d-flex align-items-center gap-3">
                  <img src="./assets/images/profile/user-6.jpg" alt className="rounded-circle" width={40} height={40} />
                  <div>
                    <h5 className="fw-semibold mb-0">Effie Gross</h5>
                    <span className="fs-2 d-flex align-items-center"><i className="ti ti-map-pin text-dark fs-3 me-1" />Azerbaijan</span>
                  </div>
                  <button className="btn btn-outline-primary py-1 px-2 ms-auto">Follow</button>
                </div>
              </div>
            </div>
            <div className=" col-md-6 col-xl-4">
              <div className="card">
                <div className="card-body p-4 d-flex align-items-center gap-3">
                  <img src="./assets/images/profile/user-7.jpg" alt className="rounded-circle" width={40} height={40} />
                  <div>
                    <h5 className="fw-semibold mb-0">Mark Barton</h5>
                    <span className="fs-2 d-flex align-items-center"><i className="ti ti-map-pin text-dark fs-3 me-1" />French Southern Territories</span>
                  </div>
                  <button className="btn btn-outline-primary py-1 px-2 ms-auto">Follow</button>
                </div>
              </div>
            </div>
            <div className=" col-md-6 col-xl-4">
              <div className="card">
                <div className="card-body p-4 d-flex align-items-center gap-3">
                  <img src="./assets/images/profile/user-8.jpg" alt className="rounded-circle" width={40} height={40} />
                  <div>
                    <h5 className="fw-semibold mb-0">Carolyn Knight</h5>
                    <span className="fs-2 d-flex align-items-center"><i className="ti ti-map-pin text-dark fs-3 me-1" />Nauru</span>
                  </div>
                  <button className="btn btn-primary py-1 px-2 ms-auto">Followed</button>
                </div>
              </div>
            </div>
            <div className=" col-md-6 col-xl-4">
              <div className="card">
                <div className="card-body p-4 d-flex align-items-center gap-3">
                  <img src="./assets/images/profile/user-9.jpg" alt className="rounded-circle" width={40} height={40} />
                  <div>
                    <h5 className="fw-semibold mb-0">Elizabeth Malone</h5>
                    <span className="fs-2 d-flex align-items-center"><i className="ti ti-map-pin text-dark fs-3 me-1" />Djibouti</span>
                  </div>
                  <button className="btn btn-primary py-1 px-2 ms-auto">Followed</button>
                </div>
              </div>
            </div>
            <div className=" col-md-6 col-xl-4">
              <div className="card">
                <div className="card-body p-4 d-flex align-items-center gap-3">
                  <img src="./assets/images/profile/user-10.jpg" alt className="rounded-circle" width={40} height={40} />
                  <div>
                    <h5 className="fw-semibold mb-0">Jon Cohen</h5>
                    <span className="fs-2 d-flex align-items-center"><i className="ti ti-map-pin text-dark fs-3 me-1" />United States</span>
                  </div>
                  <button className="btn btn-primary py-1 px-2 ms-auto">Followed</button>
                </div>
              </div>
            </div>
            <div className=" col-md-6 col-xl-4">
              <div className="card">
                <div className="card-body p-4 d-flex align-items-center gap-3">
                  <img src="./assets/images/profile/user-1.jpg" alt className="rounded-circle" width={40} height={40} />
                  <div>
                    <h5 className="fw-semibold mb-0">Mary Hernandez</h5>
                    <span className="fs-2 d-flex align-items-center"><i className="ti ti-map-pin text-dark fs-3 me-1" />Equatorial Guinea</span>
                  </div>
                  <button className="btn btn-outline-primary py-1 px-2 ms-auto">Follow</button>
                </div>
              </div>
            </div>
            <div className=" col-md-6 col-xl-4">
              <div className="card">
                <div className="card-body p-4 d-flex align-items-center gap-3">
                  <img src="./assets/images/profile/user-2.jpg" alt className="rounded-circle" width={40} height={40} />
                  <div>
                    <h5 className="fw-semibold mb-0">Willie Peterson</h5>
                    <span className="fs-2 d-flex align-items-center"><i className="ti ti-map-pin text-dark fs-3 me-1" />Solomon Islands</span>
                  </div>
                  <button className="btn btn-primary py-1 px-2 ms-auto">Followed</button>
                </div>
              </div>
            </div>
            <div className=" col-md-6 col-xl-4">
              <div className="card">
                <div className="card-body p-4 d-flex align-items-center gap-3">
                  <img src="./assets/images/profile/user-3.jpg" alt className="rounded-circle" width={40} height={40} />
                  <div>
                    <h5 className="fw-semibold mb-0">Harvey Baldwin</h5>
                    <span className="fs-2 d-flex align-items-center"><i className="ti ti-map-pin text-dark fs-3 me-1" />Uruguay</span>
                  </div>
                  <button className="btn btn-primary py-1 px-2 ms-auto">Followed</button>
                </div>
              </div>
            </div>
            <div className=" col-md-6 col-xl-4">
              <div className="card">
                <div className="card-body p-4 d-flex align-items-center gap-3">
                  <img src="./assets/images/profile/user-4.jpg" alt className="rounded-circle" width={40} height={40} />
                  <div>
                    <h5 className="fw-semibold mb-0">Alice George</h5>
                    <span className="fs-2 d-flex align-items-center"><i className="ti ti-map-pin text-dark fs-3 me-1" />Madagascar</span>
                  </div>
                  <button className="btn btn-outline-primary py-1 px-2 ms-auto">Follow</button>
                </div>
              </div>
            </div>
            <div className=" col-md-6 col-xl-4">
              <div className="card">
                <div className="card-body p-4 d-flex align-items-center gap-3">
                  <img src="./assets/images/profile/user-5.jpg" alt className="rounded-circle" width={40} height={40} />
                  <div>
                    <h5 className="fw-semibold mb-0">Beulah Simpson</h5>
                    <span className="fs-2 d-flex align-items-center"><i className="ti ti-map-pin text-dark fs-3 me-1" />Bahrain</span>
                  </div>
                  <button className="btn btn-primary py-1 px-2 ms-auto">Followed</button>
                </div>
              </div>
            </div>
            <div className=" col-md-6 col-xl-4">
              <div className="card">
                <div className="card-body p-4 d-flex align-items-center gap-3">
                  <img src="./assets/images/profile/user-6.jpg" alt className="rounded-circle" width={40} height={40} />
                  <div>
                    <h5 className="fw-semibold mb-0">Francis Barber</h5>
                    <span className="fs-2 d-flex align-items-center"><i className="ti ti-map-pin text-dark fs-3 me-1" />Colombia</span>
                  </div>
                  <button className="btn btn-outline-primary py-1 px-2 ms-auto">Follow</button>
                </div>
              </div>
            </div>
            <div className=" col-md-6 col-xl-4">
              <div className="card">
                <div className="card-body p-4 d-flex align-items-center gap-3">
                  <img src="./assets/images/profile/user-7.jpg" alt className="rounded-circle" width={40} height={40} />
                  <div>
                    <h5 className="fw-semibold mb-0">Christian Morales</h5>
                    <span className="fs-2 d-flex align-items-center"><i className="ti ti-map-pin text-dark fs-3 me-1" />Maldives</span>
                  </div>
                  <button className="btn btn-primary py-1 px-2 ms-auto">Followed</button>
                </div>
              </div>
            </div>
            <div className=" col-md-6 col-xl-4">
              <div className="card">
                <div className="card-body p-4 d-flex align-items-center gap-3">
                  <img src="./assets/images/profile/user-8.jpg" alt className="rounded-circle" width={40} height={40} />
                  <div>
                    <h5 className="fw-semibold mb-0">Laura Nelson</h5>
                    <span className="fs-2 d-flex align-items-center"><i className="ti ti-map-pin text-dark fs-3 me-1" />St. Helena</span>
                  </div>
                  <button className="btn btn-primary py-1 px-2 ms-auto">Followed</button>
                </div>
              </div>
            </div>
            <div className=" col-md-6 col-xl-4">
              <div className="card">
                <div className="card-body p-4 d-flex align-items-center gap-3">
                  <img src="./assets/images/profile/user-9.jpg" alt className="rounded-circle" width={40} height={40} />
                  <div>
                    <h5 className="fw-semibold mb-0">Blanche Strickland</h5>
                    <span className="fs-2 d-flex align-items-center"><i className="ti ti-map-pin text-dark fs-3 me-1" />South Africa</span>
                  </div>
                  <button className="btn btn-primary py-1 px-2 ms-auto">Followed</button>
                </div>
              </div>
            </div>
            <div className=" col-md-6 col-xl-4">
              <div className="card">
                <div className="card-body p-4 d-flex align-items-center gap-3">
                  <img src="./assets/images/profile/user-10.jpg" alt className="rounded-circle" width={40} height={40} />
                  <div>
                    <h5 className="fw-semibold mb-0">Adam Washington</h5>
                    <span className="fs-2 d-flex align-items-center"><i className="ti ti-map-pin text-dark fs-3 me-1" />Suriname</span>
                  </div>
                  <button className="btn btn-primary py-1 px-2 ms-auto">Followed</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tab-pane fade" id="pills-friends" role="tabpanel" aria-labelledby="pills-friends-tab" tabIndex={0}>
          <div className="d-sm-flex align-items-center justify-content-between mt-3 mb-4">
            <h3 className="mb-3 mb-sm-0 fw-semibold d-flex align-items-center">Friends <span className="badge text-bg-secondary fs-2 rounded-4 py-1 px-2 ms-2">20</span></h3>
            <form className="position-relative">
              <input type="text" className="form-control search-chat py-2 ps-5" id="text-srh" placeholder="Search Friends" />
              <i className="ti ti-search position-absolute top-50 start-0 translate-middle-y text-dark ms-3" />
            </form>
          </div>
          <div className="row">
            <div className="col-sm-6 col-lg-4">
              <div className="card hover-img">
                <div className="card-body p-4 text-center border-bottom">
                  <img src="./assets/images/profile/user-1.jpg" alt className="rounded-circle mb-3" width={80} height={80} />
                  <h5 className="fw-semibold mb-0">Betty Adams</h5>
                  <span className="text-dark fs-2">Medical Secretary</span>
                </div>
                <ul className="px-2 py-2 bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
                  <li className="position-relative">
                    <a className="text-primary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold" href="javascript:void(0)">
                      <i className="ti ti-brand-facebook" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-danger d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-instagram" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-info d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-github" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-secondary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-twitter" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="card hover-img">
                <div className="card-body p-4 text-center border-bottom">
                  <img src="./assets/images/profile/user-2.jpg" alt className="rounded-circle mb-3" width={80} height={80} />
                  <h5 className="fw-semibold mb-0">Inez Lyons</h5>
                  <span className="text-dark fs-2">Medical Technician</span>
                </div>
                <ul className="px-2 py-2 bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
                  <li className="position-relative">
                    <a className="text-primary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold" href="javascript:void(0)">
                      <i className="ti ti-brand-facebook" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-danger d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-instagram" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-info d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-github" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-secondary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-twitter" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="card hover-img">
                <div className="card-body p-4 text-center border-bottom">
                  <img src="./assets/images/profile/user-3.jpg" alt className="rounded-circle mb-3" width={80} height={80} />
                  <h5 className="fw-semibold mb-0">Lydia Bryan</h5>
                  <span className="text-dark fs-2">Preschool Teacher</span>
                </div>
                <ul className="px-2 py-2 bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
                  <li className="position-relative">
                    <a className="text-primary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold" href="javascript:void(0)">
                      <i className="ti ti-brand-facebook" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-danger d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-instagram" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-info d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-github" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-secondary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-twitter" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="card hover-img">
                <div className="card-body p-4 text-center border-bottom">
                  <img src="./assets/images/profile/user-4.jpg" alt className="rounded-circle mb-3" width={80} height={80} />
                  <h5 className="fw-semibold mb-0">Carolyn Bryant</h5>
                  <span className="text-dark fs-2">Legal Secretary</span>
                </div>
                <ul className="px-2 py-2 bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
                  <li className="position-relative">
                    <a className="text-primary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold" href="javascript:void(0)">
                      <i className="ti ti-brand-facebook" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-danger d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-instagram" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-info d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-github" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-secondary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-twitter" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="card hover-img">
                <div className="card-body p-4 text-center border-bottom">
                  <img src="./assets/images/profile/user-5.jpg" alt className="rounded-circle mb-3" width={80} height={80} />
                  <h5 className="fw-semibold mb-0">Paul Benson</h5>
                  <span className="text-dark fs-2">Safety Engineer</span>
                </div>
                <ul className="px-2 py-2 bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
                  <li className="position-relative">
                    <a className="text-primary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold" href="javascript:void(0)">
                      <i className="ti ti-brand-facebook" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-danger d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-instagram" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-info d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-github" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-secondary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-twitter" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="card hover-img">
                <div className="card-body p-4 text-center border-bottom">
                  <img src="./assets/images/profile/user-6.jpg" alt className="rounded-circle mb-3" width={80} height={80} />
                  <h5 className="fw-semibold mb-0">Robert Francis</h5>
                  <span className="text-dark fs-2">Nursing Administrator</span>
                </div>
                <ul className="px-2 py-2 bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
                  <li className="position-relative">
                    <a className="text-primary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold" href="javascript:void(0)">
                      <i className="ti ti-brand-facebook" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-danger d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-instagram" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-info d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-github" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-secondary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-twitter" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="card hover-img">
                <div className="card-body p-4 text-center border-bottom">
                  <img src="./assets/images/profile/user-7.jpg" alt className="rounded-circle mb-3" width={80} height={80} />
                  <h5 className="fw-semibold mb-0">Billy Rogers</h5>
                  <span className="text-dark fs-2">Legal Secretary</span>
                </div>
                <ul className="px-2 py-2 bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
                  <li className="position-relative">
                    <a className="text-primary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold" href="javascript:void(0)">
                      <i className="ti ti-brand-facebook" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-danger d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-instagram" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-info d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-github" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-secondary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-twitter" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="card hover-img">
                <div className="card-body p-4 text-center border-bottom">
                  <img src="./assets/images/profile/user-8.jpg" alt className="rounded-circle mb-3" width={80} height={80} />
                  <h5 className="fw-semibold mb-0">Rosetta Brewer</h5>
                  <span className="text-dark fs-2">Comptroller</span>
                </div>
                <ul className="px-2 py-2 bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
                  <li className="position-relative">
                    <a className="text-primary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold" href="javascript:void(0)">
                      <i className="ti ti-brand-facebook" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-danger d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-instagram" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-info d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-github" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-secondary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-twitter" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="card hover-img">
                <div className="card-body p-4 text-center border-bottom">
                  <img src="./assets/images/profile/user-9.jpg" alt className="rounded-circle mb-3" width={80} height={80} />
                  <h5 className="fw-semibold mb-0">Patrick Knight</h5>
                  <span className="text-dark fs-2">Retail Store Manager</span>
                </div>
                <ul className="px-2 py-2 bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
                  <li className="position-relative">
                    <a className="text-primary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold" href="javascript:void(0)">
                      <i className="ti ti-brand-facebook" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-danger d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-instagram" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-info d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-github" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-secondary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-twitter" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="card hover-img">
                <div className="card-body p-4 text-center border-bottom">
                  <img src="./assets/images/profile/user-10.jpg" alt className="rounded-circle mb-3" width={80} height={80} />
                  <h5 className="fw-semibold mb-0">Francis Sutton</h5>
                  <span className="text-dark fs-2">Astronomer</span>
                </div>
                <ul className="px-2 py-2 bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
                  <li className="position-relative">
                    <a className="text-primary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold" href="javascript:void(0)">
                      <i className="ti ti-brand-facebook" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-danger d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-instagram" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-info d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-github" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-secondary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-twitter" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="card hover-img">
                <div className="card-body p-4 text-center border-bottom">
                  <img src="./assets/images/profile/user-1.jpg" alt className="rounded-circle mb-3" width={80} height={80} />
                  <h5 className="fw-semibold mb-0">Bernice Henry</h5>
                  <span className="text-dark fs-2">Security Consultant</span>
                </div>
                <ul className="px-2 py-2 bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
                  <li className="position-relative">
                    <a className="text-primary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold" href="javascript:void(0)">
                      <i className="ti ti-brand-facebook" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-danger d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-instagram" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-info d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-github" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-secondary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-twitter" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="card hover-img">
                <div className="card-body p-4 text-center border-bottom">
                  <img src="./assets/images/profile/user-2.jpg" alt className="rounded-circle mb-3" width={80} height={80} />
                  <h5 className="fw-semibold mb-0">Estella Garcia</h5>
                  <span className="text-dark fs-2">Lead Software Test Engineer</span>
                </div>
                <ul className="px-2 py-2 bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
                  <li className="position-relative">
                    <a className="text-primary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold" href="javascript:void(0)">
                      <i className="ti ti-brand-facebook" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-danger d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-instagram" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-info d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-github" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-secondary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-twitter" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="card hover-img">
                <div className="card-body p-4 text-center border-bottom">
                  <img src="./assets/images/profile/user-3.jpg" alt className="rounded-circle mb-3" width={80} height={80} />
                  <h5 className="fw-semibold mb-0">Norman Moran</h5>
                  <span className="text-dark fs-2">Engineer Technician</span>
                </div>
                <ul className="px-2 py-2 bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
                  <li className="position-relative">
                    <a className="text-primary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold" href="javascript:void(0)">
                      <i className="ti ti-brand-facebook" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-danger d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-instagram" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-info d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-github" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-secondary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-twitter" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="card hover-img">
                <div className="card-body p-4 text-center border-bottom">
                  <img src="./assets/images/profile/user-4.jpg" alt className="rounded-circle mb-3" width={80} height={80} />
                  <h5 className="fw-semibold mb-0">Jessie Matthews</h5>
                  <span className="text-dark fs-2">Lead Software Engineer</span>
                </div>
                <ul className="px-2 py-2 bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
                  <li className="position-relative">
                    <a className="text-primary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold" href="javascript:void(0)">
                      <i className="ti ti-brand-facebook" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-danger d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-instagram" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-info d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-github" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-secondary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-twitter" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="card hover-img">
                <div className="card-body p-4 text-center border-bottom">
                  <img src="./assets/images/profile/user-5.jpg" alt className="rounded-circle mb-3" width={80} height={80} />
                  <h5 className="fw-semibold mb-0">Elijah Perez</h5>
                  <span className="text-dark fs-2">Special Education Teacher</span>
                </div>
                <ul className="px-2 py-2 bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
                  <li className="position-relative">
                    <a className="text-primary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold" href="javascript:void(0)">
                      <i className="ti ti-brand-facebook" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-danger d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-instagram" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-info d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-github" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-secondary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-twitter" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="card hover-img">
                <div className="card-body p-4 text-center border-bottom">
                  <img src="./assets/images/profile/user-6.jpg" alt className="rounded-circle mb-3" width={80} height={80} />
                  <h5 className="fw-semibold mb-0">Robert Martin</h5>
                  <span className="text-dark fs-2">Transportation Manager</span>
                </div>
                <ul className="px-2 py-2 bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
                  <li className="position-relative">
                    <a className="text-primary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold" href="javascript:void(0)">
                      <i className="ti ti-brand-facebook" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-danger d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-instagram" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-info d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-github" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-secondary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-twitter" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="card hover-img">
                <div className="card-body p-4 text-center border-bottom">
                  <img src="./assets/images/profile/user-7.jpg" alt className="rounded-circle mb-3" width={80} height={80} />
                  <h5 className="fw-semibold mb-0">Elva Wong</h5>
                  <span className="text-dark fs-2">Logistics Manager</span>
                </div>
                <ul className="px-2 py-2 bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
                  <li className="position-relative">
                    <a className="text-primary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold" href="javascript:void(0)">
                      <i className="ti ti-brand-facebook" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-danger d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-instagram" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-info d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-github" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-secondary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-twitter" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="card hover-img">
                <div className="card-body p-4 text-center border-bottom">
                  <img src="./assets/images/profile/user-8.jpg" alt className="rounded-circle mb-3" width={80} height={80} />
                  <h5 className="fw-semibold mb-0">Edith Taylor</h5>
                  <span className="text-dark fs-2">Union Representative</span>
                </div>
                <ul className="px-2 py-2 bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
                  <li className="position-relative">
                    <a className="text-primary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold" href="javascript:void(0)">
                      <i className="ti ti-brand-facebook" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-danger d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-instagram" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-info d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-github" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-secondary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-twitter" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="card hover-img">
                <div className="card-body p-4 text-center border-bottom">
                  <img src="./assets/images/profile/user-9.jpg" alt className="rounded-circle mb-3" width={80} height={80} />
                  <h5 className="fw-semibold mb-0">Violet Jackson</h5>
                  <span className="text-dark fs-2">Agricultural Inspector</span>
                </div>
                <ul className="px-2 py-2 bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
                  <li className="position-relative">
                    <a className="text-primary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold" href="javascript:void(0)">
                      <i className="ti ti-brand-facebook" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-danger d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-instagram" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-info d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-github" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-secondary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-twitter" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="card hover-img">
                <div className="card-body p-4 text-center border-bottom">
                  <img src="./assets/images/profile/user-10.jpg" alt className="rounded-circle mb-3" width={80} height={80} />
                  <h5 className="fw-semibold mb-0">Phoebe Owens</h5>
                  <span className="text-dark fs-2">Safety Engineer</span>
                </div>
                <ul className="px-2 py-2 bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
                  <li className="position-relative">
                    <a className="text-primary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold" href="javascript:void(0)">
                      <i className="ti ti-brand-facebook" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-danger d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-instagram" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-info d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-github" />
                    </a>
                  </li>
                  <li className="position-relative">
                    <a className="text-secondary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
                      <i className="ti ti-brand-twitter" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="tab-pane fade" id="pills-gallery" role="tabpanel" aria-labelledby="pills-gallery-tab" tabIndex={0}>
          <div className="d-sm-flex align-items-center justify-content-between mt-3 mb-4">
            <h3 className="mb-3 mb-sm-0 fw-semibold d-flex align-items-center">Gallery <span className="badge text-bg-secondary fs-2 rounded-4 py-1 px-2 ms-2">12</span></h3>
            <form className="position-relative">
              <input type="text" className="form-control search-chat py-2 ps-5" id="text-srh" placeholder="Search Friends" />
              <i className="ti ti-search position-absolute top-50 start-0 translate-middle-y text-dark ms-3" />
            </form>
          </div>
          <div className="row">
            <div className="col-md-6 col-lg-4">
              <div className="card hover-img overflow-hidden rounded-2">
                <div className="card-body p-0">
                  <img src="./assets/images/products/s1.jpg" alt className="img-fluid w-100 object-fit-cover" style={{height: 220}} />
                  <div className="p-4 d-flex align-items-center justify-content-between">
                    <div>
                      <h6 className="fw-semibold mb-0 fs-4">Isuava wakceajo fe.jpg</h6>
                      <span className="text-dark fs-2">Wed, Dec 14, 2023</span>
                    </div>
                    <div className="dropdown">
                      <a className="text-muted fw-semibold d-flex align-items-center p-1" href="javascript:void(0)" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="ti ti-dots-vertical" />
                      </a>
                      <ul className="dropdown-menu overflow-hidden">
                        <li><a className="dropdown-item" href="javascript:void(0)">Isuava wakceajo fe.jpg</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="card hover-img overflow-hidden rounded-2">
                <div className="card-body p-0">
                  <img src="./assets/images/products/s2.jpg" alt className="img-fluid w-100 object-fit-cover" style={{height: 220}} />
                  <div className="p-4 d-flex align-items-center justify-content-between">
                    <div>
                      <h6 className="fw-semibold mb-0 fs-4">Ip docmowe vemremrif.jpg</h6>
                      <span className="text-dark fs-2">Wed, Dec 14, 2023</span>
                    </div>
                    <div className="dropdown">
                      <a className="text-muted fw-semibold d-flex align-items-center p-1" href="javascript:void(0)" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="ti ti-dots-vertical" />
                      </a>
                      <ul className="dropdown-menu overflow-hidden">
                        <li><a className="dropdown-item" href="javascript:void(0)">Ip docmowe vemremrif.jpg</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="card hover-img overflow-hidden rounded-2">
                <div className="card-body p-0">
                  <img src="./assets/images/products/s3.jpg" alt className="img-fluid w-100 object-fit-cover" style={{height: 220}} />
                  <div className="p-4 d-flex align-items-center justify-content-between">
                    <div>
                      <h6 className="fw-semibold mb-0 fs-4">Duan cosudos utaku.jpg</h6>
                      <span className="text-dark fs-2">Wed, Dec 14, 2023</span>
                    </div>
                    <div className="dropdown">
                      <a className="text-muted fw-semibold d-flex align-items-center p-1" href="javascript:void(0)" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="ti ti-dots-vertical" />
                      </a>
                      <ul className="dropdown-menu overflow-hidden">
                        <li><a className="dropdown-item" href="javascript:void(0)">Duan cosudos utaku.jpg</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="card hover-img overflow-hidden rounded-2">
                <div className="card-body p-0">
                  <img src="./assets/images/products/s4.jpg" alt className="img-fluid w-100 object-fit-cover" style={{height: 220}} />
                  <div className="p-4 d-flex align-items-center justify-content-between">
                    <div>
                      <h6 className="fw-semibold mb-0 fs-4">Fu netbuv oggu.jpg</h6>
                      <span className="text-dark fs-2">Wed, Dec 14, 2023</span>
                    </div>
                    <div className="dropdown">
                      <a className="text-muted fw-semibold d-flex align-items-center p-1" href="javascript:void(0)" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="ti ti-dots-vertical" />
                      </a>
                      <ul className="dropdown-menu overflow-hidden">
                        <li><a className="dropdown-item" href="javascript:void(0)">Fu netbuv oggu.jpg</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="card hover-img overflow-hidden rounded-2">
                <div className="card-body p-0">
                  <img src="./assets/images/products/s5.jpg" alt className="img-fluid w-100 object-fit-cover" style={{height: 220}} />
                  <div className="p-4 d-flex align-items-center justify-content-between">
                    <div>
                      <h6 className="fw-semibold mb-0 fs-4">Di sekog do.jpg</h6>
                      <span className="text-dark fs-2">Wed, Dec 14, 2023</span>
                    </div>
                    <div className="dropdown">
                      <a className="text-muted fw-semibold d-flex align-items-center p-1" href="javascript:void(0)" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="ti ti-dots-vertical" />
                      </a>
                      <ul className="dropdown-menu overflow-hidden">
                        <li><a className="dropdown-item" href="javascript:void(0)">Di sekog do.jpg</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="card hover-img overflow-hidden rounded-2">
                <div className="card-body p-0">
                  <img src="./assets/images/products/s6.jpg" alt className="img-fluid w-100 object-fit-cover" style={{height: 220}} />
                  <div className="p-4 d-flex align-items-center justify-content-between">
                    <div>
                      <h6 className="fw-semibold mb-0 fs-4">Lo jogu camhiisi.jpg</h6>
                      <span className="text-dark fs-2">Thu, Dec 15, 2023</span>
                    </div>
                    <div className="dropdown">
                      <a className="text-muted fw-semibold d-flex align-items-center p-1" href="javascript:void(0)" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="ti ti-dots-vertical" />
                      </a>
                      <ul className="dropdown-menu overflow-hidden">
                        <li><a className="dropdown-item" href="javascript:void(0)">Lo jogu camhiisi.jpg</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="card hover-img overflow-hidden rounded-2">
                <div className="card-body p-0">
                  <img src="./assets/images/products/s7.jpg" alt className="img-fluid w-100 object-fit-cover" style={{height: 220}} />
                  <div className="p-4 d-flex align-items-center justify-content-between">
                    <div>
                      <h6 className="fw-semibold mb-0 fs-4">Orewac huosazud robuf.jpg</h6>
                      <span className="text-dark fs-2">Fri, Dec 16, 2023</span>
                    </div>
                    <div className="dropdown">
                      <a className="text-muted fw-semibold d-flex align-items-center p-1" href="javascript:void(0)" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="ti ti-dots-vertical" />
                      </a>
                      <ul className="dropdown-menu overflow-hidden">
                        <li><a className="dropdown-item" href="javascript:void(0)">Orewac huosazud robuf.jpg</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="card hover-img overflow-hidden rounded-2">
                <div className="card-body p-0">
                  <img src="./assets/images/products/s8.jpg" alt className="img-fluid w-100 object-fit-cover" style={{height: 220}} />
                  <div className="p-4 d-flex align-items-center justify-content-between">
                    <div>
                      <h6 className="fw-semibold mb-0 fs-4">Nira biolaizo tuzi.jpg</h6>
                      <span className="text-dark fs-2">Sat, Dec 17, 2023</span>
                    </div>
                    <div className="dropdown">
                      <a className="text-muted fw-semibold d-flex align-items-center p-1" href="javascript:void(0)" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="ti ti-dots-vertical" />
                      </a>
                      <ul className="dropdown-menu overflow-hidden">
                        <li><a className="dropdown-item" href="javascript:void(0)">Nira biolaizo tuzi.jpg</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="card hover-img overflow-hidden rounded-2">
                <div className="card-body p-0">
                  <img src="./assets/images/products/s9.jpg" alt className="img-fluid w-100 object-fit-cover" style={{height: 220}} />
                  <div className="p-4 d-flex align-items-center justify-content-between">
                    <div>
                      <h6 className="fw-semibold mb-0 fs-4">Peri metu ejvu.jpg</h6>
                      <span className="text-dark fs-2">Sun, Dec 18, 2023</span>
                    </div>
                    <div className="dropdown">
                      <a className="text-muted fw-semibold d-flex align-items-center p-1" href="javascript:void(0)" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="ti ti-dots-vertical" />
                      </a>
                      <ul className="dropdown-menu overflow-hidden">
                        <li><a className="dropdown-item" href="javascript:void(0)">Peri metu ejvu.jpg</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="card hover-img overflow-hidden rounded-2">
                <div className="card-body p-0">
                  <img src="./assets/images/products/s10.jpg" alt className="img-fluid w-100 object-fit-cover" style={{height: 220}} />
                  <div className="p-4 d-flex align-items-center justify-content-between">
                    <div>
                      <h6 className="fw-semibold mb-0 fs-4">Vurnohot tajraje isusufuj.jpg</h6>
                      <span className="text-dark fs-2">Mon, Dec 19, 2023</span>
                    </div>
                    <div className="dropdown">
                      <a className="text-muted fw-semibold d-flex align-items-center p-1" href="javascript:void(0)" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="ti ti-dots-vertical" />
                      </a>
                      <ul className="dropdown-menu overflow-hidden">
                        <li><a className="dropdown-item" href="javascript:void(0)">Vurnohot tajraje isusufuj.jpg</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="card hover-img overflow-hidden rounded-2">
                <div className="card-body p-0">
                  <img src="./assets/images/products/s11.jpg" alt className="img-fluid w-100 object-fit-cover" style={{height: 220}} />
                  <div className="p-4 d-flex align-items-center justify-content-between">
                    <div>
                      <h6 className="fw-semibold mb-0 fs-4">Juc oz ma.jpg</h6>
                      <span className="text-dark fs-2">Tue, Dec 20, 2023</span>
                    </div>
                    <div className="dropdown">
                      <a className="text-muted fw-semibold d-flex align-items-center p-1" href="javascript:void(0)" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="ti ti-dots-vertical" />
                      </a>
                      <ul className="dropdown-menu overflow-hidden">
                        <li><a className="dropdown-item" href="javascript:void(0)">Juc oz ma.jpg</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="card hover-img overflow-hidden rounded-2">
                <div className="card-body p-0">
                  <img src="./assets/images/products/s12.jpg" alt className="img-fluid w-100 object-fit-cover" style={{height: 220}} />
                  <div className="p-4 d-flex align-items-center justify-content-between">
                    <div>
                      <h6 className="fw-semibold mb-0 fs-4">Povipvez marjelliz zuuva.jpg</h6>
                      <span className="text-dark fs-2">Wed, Dec 21, 2023</span>
                    </div>
                    <div className="dropdown">
                      <a className="text-muted fw-semibold d-flex align-items-center p-1" href="javascript:void(0)" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="ti ti-dots-vertical" />
                      </a>
                      <ul className="dropdown-menu overflow-hidden">
                        <li><a className="dropdown-item" href="javascript:void(0)">Povipvez marjelliz zuuva.jpg</a></li>
                      </ul>
                    </div>
                  </div>
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