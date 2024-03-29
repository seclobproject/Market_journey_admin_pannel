import React from 'react'
import { Helmet } from 'react-helmet'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
function Myprofile() {
  return (
    <>
  
  <div className="container-fluid">
      <div className="row">
      <div className="col-lg-6 mt-3 mt-lg-0">
          <Card sx={{ maxWidth: 545 }}>
            <CardContent>
              <div className="card-body p-0">
              <div className="card overflow-hidden">
        <div className="card-body p-0">
        <div className="card bg-info-subtle shadow-none position-relative overflow-hidden mb-4">
        <div className="card-body px-4 py-3">
          <div className="row align-items-center">
            <div className="col-9">
             
            </div>
            {/* <div className="col-3">
              <div className="text-center mb-n5">
                <img src="/public/dist/images/web logo-01.png" alt className="img-fluid mb-n4" />
              </div>
            </div> */}
          </div>
        </div>
      </div>          <div className="row align-items-center">
            
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
      </div>              </div>
      <Typography gutterBottom variant="h5" component="div">
  <h5 className="card-title fw-semibold mb-4">
          Autopool Wallet Amount
          </h5>        </Typography>
  <Typography variant="body2" color="text.secondary">
  <h5 className="card-title fw-semibold mb-4">
          6000
          </h5> 
  </Typography>
            </CardContent>
            <CardActions>
            <button className="btn btn-custom">
    <i className="fas fa-hand-holding-usd"></i> Distribute Amount
</button>
<button className="btn btn-custom">
    <i className="fas fa-history"></i> History
</button>
            </CardActions>
          </Card>
        </div>
        <div className="col-lg-6 mt-3 mt-lg-0">
          <Card sx={{ maxWidth: 545 }}>
            <CardContent>
              <div className="card-body">
                <a className="nav-link nav-icon-hover" href="javascript:void(0)" id="drop2" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="../../dist/images/profile/user-1.jpg" className="rounded-circle" width={100} height={100} alt="" />
                </a>
                <div className="mt-4">
                  <h5 className="fs-5 mb-0 fw-semibold">Admin</h5>
                </div>
                <ul className="list-unstyled mb- mt-3">
                  <li className="d-flex align-items-center gap-3 mb-4">
                    <i className="ti ti-mail text-dark fs-6" />
                    <h6 className="fs-4 fw-semibold mb-0">admin@gmail.com</h6>
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
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