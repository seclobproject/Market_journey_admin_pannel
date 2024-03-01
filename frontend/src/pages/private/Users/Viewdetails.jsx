import React from 'react'

function Viewdetails() {
  return (
    <>
    

 <div className="container-fluid">
  <div className='row'>
    <div className='col-lg-6 col-md-12'>
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
     
      </div>    </div>
    <div className='col-lg-6 col-md-12'>
    <div className="card">
  <div className="card-body">
  <h5 className="card-title fw-semibold mb-4" style={{ color: 'rgba(247, 174, 21)' }}>Edit Details</h5>
    <div className="card">
      <div className="card-body">
        <form>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Name </label>
            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">New Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" />
          </div>
       
          <button type="submit" className="btn btn-primary">Update </button>
        </form>
      </div>
    </div>
    
  </div>
</div>    </div>
  </div>
</div>




      
    

      

    </>
  )
}

export default Viewdetails